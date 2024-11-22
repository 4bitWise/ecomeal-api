import { IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMeasureunitDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  unit_name: string;

  @ApiProperty()
  @IsString()
  unit_symbol: string;

  @ApiProperty()
  @IsPositive()
  @Type(() => Number)
  measurement_type: number;

  @ApiProperty()
  @IsPositive()
  @Type(() => Number)
  conversion_factor: number;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  base_unit_id?: string;
}

export class UpdateMeasureunitDto extends PartialType(CreateMeasureunitDto) {}
