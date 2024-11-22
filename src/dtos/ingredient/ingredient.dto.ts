import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

export class CreateIngredientDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @IsPositive()
  @Type(() => Number)
  quantity: number;

  @ApiProperty()
  @IsString()
  unit_id: string;

  @ApiProperty()
  @IsString()
	@IsOptional()
  category?: string;
}

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {}
