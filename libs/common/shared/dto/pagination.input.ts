import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationInput {
  @ApiPropertyOptional({ type: Number, default: 1, description: 'Page number' })
  @Type(() => Number)
  @IsInt({ message: 'Skip argument must be integer!' })
  @Min(1, { message: 'Skip must not be less than 1!' })
  page: number = 1;

  @ApiPropertyOptional({
    type: Number,
    default: 10,
    description: 'Items per page',
  })
  @Type(() => Number)
  @IsInt({ message: 'Take argument must be integer!' })
  @Min(1, { message: 'Take must not be less than 1!' })
  size: number = 10;
}
