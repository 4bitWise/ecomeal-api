import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe, RecipeDocument } from 'src/schemas/recipe/recipe.schema';
import {
  Ingredient,
  IngredientDocument,
} from '../../schemas/ingredient/ingredient.schema';
import {
  CreateRecipeDto,
  IngredientDetailDtoWithPrice,
  UpdateRecipeDto,
} from 'src/dtos/recipe/recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
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
  ): Promise<IngredientDetailDtoWithPrice[]> {
    const ingredientsMap: { [key: string]: IngredientDetailDtoWithPrice } = {};

    for (const recipeId of recipeIds) {
      const recipe = await this.recipeModel.findOne({ id: recipeId }).exec();
      if (!recipe) {
        throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
      }
      for (const ingredient of recipe.ingredients) {
        const key = `${ingredient.ingredient_id}-${ingredient.unit_id}`;
        const ingredientInfo = await this.ingredientModel
          .findOne({ id: ingredient.ingredient_id })
          .exec();
        if (ingredientsMap[key]) {
          ingredientsMap[key].quantity += ingredient.quantity;
          ingredientsMap[key].price += ingredientInfo.price;
        } else {
          ingredientsMap[key] = {
            ingredient_id: ingredient.ingredient_id,
            quantity: ingredient.quantity,
            unit_id: ingredient.unit_id,
            price: ingredientInfo.price,
          };
        }
      }
    }
    return Object.values(ingredientsMap);
  }

  async generateRecipesFromBudget(budget: number): Promise<Recipe[]> {
    if (budget === 0 || isNaN(budget)) {
      throw new Error('Invalid per-meal budget calculated.');
    }

    const lowerBound = budget * 0.9;
    const upperBound = budget * 1.1;

    // Récupérer les recettes qui coûtent moins que le budget max
    const allRecipes = await this.recipeModel
      .find({ cost: { $lte: upperBound } })
      .exec();

    if (!allRecipes.length) {
      throw new Error('Aucune recette ne correspond à ce budget.');
    }

    // Générer une combinaison de recettes
    const result: Recipe[] = [];
    let totalCost = 0;

    while (
      totalCost < lowerBound ||
      (totalCost <= upperBound && Math.random() < 0.5)
    ) {
      const randomRecipe =
        allRecipes[Math.floor(Math.random() * allRecipes.length)];
      result.push(randomRecipe);
      totalCost += randomRecipe.cost;

      // Si on dépasse le budget, on retire la dernière recette ajoutée
      if (totalCost > upperBound) {
        totalCost -= randomRecipe.cost;
        result.pop();
        break;
      }
    }

    return allRecipes;
  }
}
