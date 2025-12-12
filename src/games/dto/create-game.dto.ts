import { IsNotEmpty, IsNumber, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  platform: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  score: number;

  @IsNotEmpty()
  genre: string;

  @IsOptional()
  @IsBoolean()
  editors_choice?: boolean;
}