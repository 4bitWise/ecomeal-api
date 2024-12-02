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
import {
  CreateIngredientDto,
  UpdateIngredientDto,
} from 'src/dtos/ingredient/ingredient.dto';
import { Ingredient } from 'src/schemas/ingredient/ingredient.schema';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @ApiOperation({ summary: 'Create an ingredient' })
  @ApiBody({ type: CreateIngredientDto })
  @Post()
  async create(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    try {
      const newIngredient =
        await this.ingredientsService.create(createIngredientDto);
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

  @ApiOperation({ summary: 'Find all ingredients' })
  @Get()
  async findAll(): Promise<Ingredient[]> {
    return this.ingredientsService.findAll();
  }

  @ApiOperation({ summary: 'Find one ingredient' })
  @ApiParam({ name: 'id', description: 'Ingredient ID' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ingredient> {
    try {
      return this.ingredientsService.findOne(id);
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

  @ApiOperation({ summary: 'Update a ingredient' })
  @ApiBody({ type: UpdateIngredientDto })
  @ApiParam({ name: 'id', description: 'Ingredient ID' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    try {
      return this.ingredientsService.update(id, updateIngredientDto);
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

  @ApiOperation({ summary: 'Delete an ingredient' })
  @ApiParam({ name: 'id', description: 'Ingredient ID' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Ingredient> {
    try {
      return this.ingredientsService.remove(id);
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
