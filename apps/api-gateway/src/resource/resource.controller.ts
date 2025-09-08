import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'libs/common/decorators';
import { CreateResourceDto } from 'libs/common/dto';
import { PaginationInput } from 'libs/common/shared/dto';

@ApiTags('Resource')
@Controller({
  path: 'resource',
  version: '1',
})
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post('create')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create resource successfully' })
  @ApiBody({ type: CreateResourceDto })
  async create(@Body() input: CreateResourceDto) {
    return this.resourceService.create(input);
  }

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all resources' })
  async findAll(@Body() pagination: PaginationInput) {
    return this.resourceService.getAll(pagination);
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get resource by ID' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id') id: number) {
    return this.resourceService.getOne(id);
  }
}
