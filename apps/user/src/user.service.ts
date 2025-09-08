import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto, LoginDTO, LoginResponseDTO } from 'libs/common/dto';
import { HashService } from 'libs/common/hash';
import { PrismaService } from './prisma/prisma.service';
import { TokenService } from 'libs/common/token';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(data: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: 'User already exists',
      });
    }

    const hashedPassword = await this.hashService.hashPassword(data.password);
    return await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async login(input: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    const invalidCredentialsError = new RpcException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Invalid email or password',
    });

    if (!user || !user.password) {
      throw invalidCredentialsError;
    }

    const isPasswordValid = await this.hashService.comparePasswords(
      input.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw invalidCredentialsError;
    }

    const { accessToken, refreshToken } =
      await this.tokenService.generateTokenPair({
        userId: user.id,
      });

    const hashedRefreshToken = await this.hashService.hashString(refreshToken);
    await this.updateHashedRefreshToken(user.id, hashedRefreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateHashedRefreshToken(id: number, hashedRefreshToken: string) {
    return await this.prisma.user.update({
      where: { id },
      data: {},
    });
  }
}
