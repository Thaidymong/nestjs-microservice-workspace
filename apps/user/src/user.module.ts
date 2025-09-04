import { Module } from '@nestjs/common';
import { UserController} from './user.controller';
import { UserService } from './user.service';
import { HashService } from 'libs/common/hash';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, HashService],
})
export class UserModule {}
