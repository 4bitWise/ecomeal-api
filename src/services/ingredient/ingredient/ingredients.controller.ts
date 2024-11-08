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
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto, UpdateIngredientDto } from 'src/dtos/ingredient/ingredient.dto';
import { Ingredient } from 'src/schemas/ingredient/ingredient.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly IngredientsService: IngredientsService) {}

  @Post()
  async create(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    try {
      const newIngredient =
        await this.IngredientsService.create(createIngredientDto);
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
    return this.IngredientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ingredient> {
    try {
      return this.IngredientsService.findOne(id);
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
      return this.IngredientsService.update(id, updateIngredientDto);
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
      return this.IngredientsService.remove(id);
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
