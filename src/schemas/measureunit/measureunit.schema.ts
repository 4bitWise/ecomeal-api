import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MeasureunitDocument = HydratedDocument<Measureunit>;

@Schema({ strict: false, timestamps: true })
export class Measureunit {
  @Prop({ required: true, unique: true, type: String })
  id: string;

  @Prop({ required: true, type: String })
  unit_name: string;

  @Prop({ required: true, type: String })
  unit_symbol: string;

  @Prop({ required: true, type: Number })
  measurement_type: number;

  @Prop({ required: true, type: Number })
  conversion_factor: number;

  @Prop({ required: true, type: String, default: null })
  base_unit_id: string | null;
}

export const MeasureunitSchema = SchemaFactory.createForClass(Measureunit);
