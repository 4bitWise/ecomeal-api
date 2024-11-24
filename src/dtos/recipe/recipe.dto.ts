import { IsString, IsNumber, IsArray, ValidateNested, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class IngredientDetailDto {
  @ApiProperty()
  @IsString()
  ingredient_id: string;

  @ApiProperty()
  @IsPositive()
  @Type(() => Number)
  quantity: number;

  @ApiProperty()
  @IsString()
  unit_id: string;
}

export class CreateRecipeDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsPositive()
  @Type(() => Number)
  preparation_time: number;

  @ApiProperty()
  @IsPositive()
  @Type(() => Number)
  servings: number;

  @ApiProperty()
  @IsPositive()
  @Type(() => Number)
  cost: number;

  @ApiProperty({ type: [IngredientDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDetailDto)
  ingredients: IngredientDetailDto[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  instructions: string[];
}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}