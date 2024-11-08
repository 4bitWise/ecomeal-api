import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto, UpdateIngredientDto } from 'src/dtos/ingredient/ingredient.dto';
import { Ingredient } from 'src/schemas/ingredient/ingredient.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ingredient')
@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  async create(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    try {
      const newIngredient =
        await this.ingredientService.create(createIngredientDto);
      return newIngredient;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error: Ingredient not created!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(): Promise<Ingredient[]> {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ingredient> {
    try {
      return this.ingredientService.findOne(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Ingredient with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    try {
      return this.ingredientService.update(id, updateIngredientDto);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Ingredient with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Ingredient> {
    try {
      return this.ingredientService.remove(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Ingredient with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
