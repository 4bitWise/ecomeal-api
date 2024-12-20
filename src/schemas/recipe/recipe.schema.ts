import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema({ timestamps: true })
export class IngredientDetail {
  @Prop({ required: true })
  ingredient_id: string;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: true })
  unit_id: string;
}

@Schema({ timestamps: true })
export class Recipe {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Number })
  preparation_time: number;

  @Prop({ required: true, type: Number })
  servings: number;

  @Prop({ required: true, type: Number })
  cost: number;

  @Prop({ required: true, type: [IngredientDetail] })
  ingredients: IngredientDetail[];

  @Prop({ required: true, type: [String] })
  instructions: string[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
