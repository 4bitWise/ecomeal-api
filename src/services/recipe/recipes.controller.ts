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
import {
  CreateRecipeDto,
  IngredientDetailDto,
  UpdateRecipeDto,
} from 'src/dtos/recipe/recipe.dto';
import { Recipe } from 'src/schemas/recipe/recipe.schema';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @ApiOperation({ summary: 'Create a new recipe' })
  @ApiBody({ type: CreateRecipeDto })
  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    try {
      return await this.recipesService.create(createRecipeDto);
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

  @ApiOperation({ summary: 'Find all recipes' })
  @Get()
  async findAll(): Promise<Recipe[]> {
    return this.recipesService.findAll();
  }

  @ApiOperation({ summary: 'Find a recipe by id' })
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Recipe ID' })
  async findOne(@Param('id') id: string): Promise<Recipe> {
    try {
      return await this.recipesService.findOne(id);
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

  @ApiOperation({ summary: 'Update a recipe' })
  @ApiBody({ type: UpdateRecipeDto })
  @ApiParam({ name: 'id', description: 'Recipe ID' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    try {
      return await this.recipesService.update(id, updateRecipeDto);
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

  @ApiParam({ name: 'id', description: 'Recipe ID' })
  @ApiOperation({ summary: 'Delete a recipe' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Recipe> {
    try {
      return await this.recipesService.remove(id);
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

  @ApiBody({ type: IngredientDetailDto })
  @ApiOperation({ summary: 'Find all ingredients based on many recipes' })
  @Post('generate-ingredients-list')
  async generateIngredientsList(
    @Body() recipeIds: string[],
  ): Promise<IngredientDetailDto[]> {
    try {
      return await this.recipesService.generateIngredientsList(recipeIds);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error generating ingredients list!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
