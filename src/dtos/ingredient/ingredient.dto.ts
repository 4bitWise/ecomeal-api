import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

export class CreateIngredientDto {
  @ApiProperty({ example: 'ingredient_flour', description: 'Ingredient ID' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Flour', description: 'Ingredient name' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 'weight_g' })
  @IsString()
  unit_id: string;

  @ApiProperty({ example: 'baking', description: 'Ingredient category' })
  @IsString()
  @IsOptional()
  category?: string;
}

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {}
