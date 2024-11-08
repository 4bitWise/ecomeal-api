import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientController } from './services/ingredient/ingredient/ingredient.controller';
import { IngredientService } from './services/ingredient/ingredient/ingredient.service';
import { Ingredient, IngredientSchema } from './schemas/ingredient/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ecomeal'),
    MongooseModule.forFeature([{ name: Ingredient.name, schema: IngredientSchema }]),
  ],
  controllers: [AppController, IngredientController],
  providers: [AppService, IngredientService],
})
export class AppModule {}
