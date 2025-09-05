import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USER_PATTERN } from 'libs/common/patterns';
import { CreateUserDto, LoginDTO, LoginResponseDTO } from 'libs/common/dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @MessagePattern(USER_PATTERN.CREATE)
  async register(@Payload() input: CreateUserDto) {
    return this.userService.create(input);
  }

  @MessagePattern(USER_PATTERN.LOGIN)
  handleLogin(@Payload() input: LoginDTO): Promise<LoginResponseDTO> {
    return this.userService.login(input);
  }
}
