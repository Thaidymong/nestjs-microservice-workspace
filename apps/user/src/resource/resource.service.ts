import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateResourceDto,
  ResourceListDto,
  ResourcesListDto,
} from 'libs/common/dto';
import { PrismaService } from '../prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { PaginationInput } from 'libs/common/shared/dto';

@Injectable()
export class ResourceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateResourceDto) {
    const existingResource = await this.prisma.resource.findUnique({
      where: { name: data.name },
    });

    if (existingResource) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Resource name already exists',
      });
    }

    return await this.prisma.resource.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async findAll(pagination: PaginationInput): Promise<ResourcesListDto> {
    const { page = 1, size = 10 } = pagination;
    const skip = (page - 1) * size;

    const [resources, total] = await this.prisma.$transaction([
      this.prisma.resource.findMany({
        skip,
        take: size,
        orderBy: {
          id: 'desc',
        },
      }),
      this.prisma.resource.count(),
    ]);

    return {
      data: resources.map((resource) => ({
        name: resource.name,
        description: resource.description ?? '',
        create_at: resource.createdAt.toISOString(),
        update_at: resource.updatedAt.toISOString(),
      })),
      pagination: {
        total,
        size: resources.length,
        current: page,
      },
    };
  }

  async findOne(id: number) {
    const resource = await this.prisma.resource.findUnique({
      where: { id: +id },
    });

    if (!resource) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Resource not found',
      });
    }

    return {
      name: resource.name,
      description: resource.description ?? '',
      create_at: resource.createdAt.toISOString(),
      update_at: resource.updatedAt.toISOString(),
    };
  }
}
