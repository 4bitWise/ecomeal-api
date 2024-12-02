import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe, RecipeDocument } from 'src/schemas/recipe/recipe.schema';
import {
  CreateRecipeDto,
  IngredientDetailDto,
  UpdateRecipeDto,
} from 'src/dtos/recipe/recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const createdRecipe = new this.recipeModel(createRecipeDto);
    return createdRecipe.save();
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeModel.find().exec();
  }

  async findOne(id: string): Promise<Recipe> {
    const recipe = await this.recipeModel.findOne({ id }).exec();
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return recipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const updatedRecipe = await this.recipeModel
      .findOneAndUpdate({ id }, updateRecipeDto, { new: true })
      .exec();
    if (!updatedRecipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return updatedRecipe;
  }

  async remove(id: string): Promise<Recipe> {
    const deletedRecipe = await this.recipeModel
      .findOneAndDelete({ id })
      .exec();
    if (!deletedRecipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return deletedRecipe;
  }

  async generateIngredientsList(
    recipeIds: string[],
  ): Promise<IngredientDetailDto[]> {
    const ingredientsMap: { [key: string]: IngredientDetailDto } = {};
    for (const recipeId of recipeIds) {
      const recipe = await this.recipeModel.findOne({ id: recipeId }).exec();
      if (!recipe) {
        throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
      }
      for (const ingredient of recipe.ingredients) {
        const key = `${ingredient.ingredient_id}-${ingredient.unit_id}`;
        if (ingredientsMap[key]) {
          ingredientsMap[key].quantity += ingredient.quantity;
        } else {
          ingredientsMap[key] = {
            ingredient_id: ingredient.ingredient_id,
            quantity: ingredient.quantity,
            unit_id: ingredient.unit_id,
          };
        }
      }
    }
    return Object.values(ingredientsMap);
  }
}
