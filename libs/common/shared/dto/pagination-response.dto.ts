import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponse {
  @ApiProperty({ type: Number, description: 'Total number of items' })
  totalItems: number;

  @ApiProperty({ type: Number, description: 'Current page number' })
  currentPage: number;

  @ApiProperty({ type: Number, description: 'Total number of pages' })
  totalPage: number;

  @ApiProperty({ type: Number, description: 'Number of items per page' })
  pageSize: number;

  @ApiProperty({
    type: Boolean,
    description: 'Whether there is a previous page',
  })
  hasPreviousPage: boolean;

  @ApiProperty({ type: Boolean, description: 'Whether there is a next page' })
  hasNextPage: boolean;
}

export class Pagination {
  @ApiProperty({ type: Number, description: 'Current page number' })
  current: number;

  @ApiProperty({ type: Number, description: 'Page size' })
  size: number;

  @ApiProperty({ type: Number, description: 'Total number of items' })
  total: number;
}
