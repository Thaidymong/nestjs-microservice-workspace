import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Pagination } from '../shared/dto';

export class CreateResourceDto {
  @ApiProperty({
    type: 'string',
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class ResourceListDto {
  name: string;
  description: string;
  create_at: string;
  update_at: string;
}

export class ResourcesListDto {
  @ApiProperty({
    type: [ResourceListDto],
    description: 'List of resources',
  })
  data: ResourceListDto[];

  @ApiProperty({ type: Pagination, description: 'Pagination information' })
  pagination: Pagination;
}
