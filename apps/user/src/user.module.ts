import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashService } from 'libs/common/hash';
import { PrismaModule } from './prisma/prisma.module';
import { TokenService } from 'libs/common/token';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResourceModule } from './resource/resource.module';
import { CryptoJSService } from 'libs/common/encryption/cryptojs.service';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards';

@Module({
  imports: [PrismaModule, ResourceModule],
  controllers: [UserController],
  providers: [
    UserService,
    HashService,
    TokenService,
    JwtService,
    ConfigService,

    // AccessStrategy,
    // RefreshStrategy,
    CryptoJSService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class UserModule {}
