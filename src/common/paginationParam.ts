import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationParam {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  limit?: number;
}
