import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema({ strict: false, timestamps: true })
export class Ingredient {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unit_id: string;

  @Prop({ required: false })
  category: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
