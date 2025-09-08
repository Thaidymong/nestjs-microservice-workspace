import { Controller } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RESOURCE } from 'libs/common/patterns';
import {
  CreateResourceDto,
  ResourceListDto,
  ResourcesListDto,
} from 'libs/common/dto';
import { PaginationInput } from 'libs/common/shared/dto';

@Controller()
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @MessagePattern(RESOURCE.CREATE)
  async create(@Payload() input: CreateResourceDto) {
    return this.resourceService.create(input);
  }

  @MessagePattern(RESOURCE.FIND_ALL)
  async getAll(
    @Payload() pagination: PaginationInput,
  ): Promise<ResourcesListDto> {
    return this.resourceService.findAll(pagination);
  }

  @MessagePattern(RESOURCE.FIND_ONE)
  async getOne(@Payload() id: number): Promise<ResourceListDto> {
    return this.resourceService.findOne(id);
  }
}
