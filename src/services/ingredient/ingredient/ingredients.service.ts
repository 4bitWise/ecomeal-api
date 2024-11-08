import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Ingredient,
  IngredientDocument,
} from 'src/schemas/ingredient/ingredient.schema';
import {
  CreateIngredientDto,
  UpdateIngredientDto,
} from 'src/dtos/ingredient/ingredient.dto';

@Injectable()
export class IngredientsService {

  constructor(
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    const createdIngredient = new this.ingredientModel(createIngredientDto);
    return createdIngredient.save();
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientModel.find().exec();
  }

  async findOne(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientModel.findOne({ id }).exec();
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
    return ingredient;
  }

  async update(
    id: string,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    const updatedIngredient = await this.ingredientModel
      .findOneAndUpdate({ id }, updateIngredientDto, { new: true })
      .exec();
    if (!updatedIngredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
    return updatedIngredient;
  }

  async remove(id: string): Promise<Ingredient> {
    const deletedIngredient = await this.ingredientModel
      .findOneAndDelete({ id })
      .exec();
    if (!deletedIngredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
    return deletedIngredient;
  }
}
