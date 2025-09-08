import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashService } from 'libs/common/hash';
import { PrismaModule } from './prisma/prisma.module';
import { TokenService } from 'libs/common/token';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [PrismaModule, ResourceModule],
  controllers: [UserController],
  providers: [
    UserService,
    HashService,
    TokenService,
    JwtService,
    ConfigService,
  ],
})
export class UserModule {}
