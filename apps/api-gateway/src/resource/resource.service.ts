import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateResourceDto } from 'libs/common/dto';
import { RESOURCE } from 'libs/common/patterns';
import { PaginationInput } from 'libs/common/shared/dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ResourceService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async create(input: CreateResourceDto) {
    return firstValueFrom(this.client.send(RESOURCE.CREATE, input));
  }

  async getAll(pagination: PaginationInput) {
    return firstValueFrom(this.client.send(RESOURCE.FIND_ALL, pagination));
  }

  async getOne(id: number) {
    return firstValueFrom(this.client.send(RESOURCE.FIND_ONE, id));
  }
}
