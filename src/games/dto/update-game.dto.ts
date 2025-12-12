import { IsOptional, IsNumber, IsBoolean, Min, Max } from 'class-validator';

export class UpdateGameDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  platform?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  score?: number;

  @IsOptional()
  genre?: string;

  @IsOptional()
  @IsBoolean()
  editors_choice?: boolean;
}