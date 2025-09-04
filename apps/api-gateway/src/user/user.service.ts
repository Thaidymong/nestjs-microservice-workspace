import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@prisma/client';
import { CreateUserDto } from 'libs/common/dto';
import { USER_PATTERN } from 'libs/common/patterns';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
    constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) { }

    async register(data: CreateUserDto) {
        return firstValueFrom(this.client.send<User>(USER_PATTERN.CREATE, data));
    }
}
