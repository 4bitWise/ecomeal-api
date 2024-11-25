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
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto } from 'src/dtos/recipe/recipe.dto';
import { Recipe } from 'src/schemas/recipe/recipe.schema';
import { ApiTags } from '@nestjs/swagger';
import { IngredientDetail } from 'src/schemas/recipe/recipe.schema';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly RecipesService: RecipesService) {}

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    try {
      return await this.RecipesService.create(createRecipeDto);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error: Recipe not created!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(): Promise<Recipe[]> {
    return this.RecipesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Recipe> {
    try {
      return await this.RecipesService.findOne(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Recipe with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    try {
      return await this.RecipesService.update(id, updateRecipeDto);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Recipe with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Recipe> {
    try {
      return await this.RecipesService.remove(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Recipe with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get(':id/ingredients')
  async findIngredients(@Param('id') id: string): Promise<IngredientDetail[]> {
    try {
      return await this.RecipesService.findIngredientsByRecipe(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Recipe with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
