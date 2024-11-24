import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient,IngredientDocument } from 'src/schemas/ingredient/ingredient.schema';
import { Model } from 'mongoose';
import { Recipe, RecipeDocument } from 'src/schemas/recipe/recipe.schema';
import { CreateRecipeDto, UpdateRecipeDto,IngredientDetailDto } from 'src/dtos/recipe/recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>
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

  



  async findIngredientsByRecipe(id: string): Promise<IngredientDetailDto[]> {
    // Chercher un recipe avec le champ 'id' (et non _id)
    const recipe = await this.recipeModel.findOne({ id }).exec();
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
  
    // Retourner uniquement les détails des ingrédients
    return recipe.ingredients;
  }

}
