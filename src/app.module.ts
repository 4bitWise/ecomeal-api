import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientsController } from './services/ingredient/ingredient/ingredients.controller';
import { IngredientsService } from './services/ingredient/ingredient/ingredients.service';
import {
  Ingredient,
  IngredientSchema,
} from './schemas/ingredient/ingredient.schema';
import { Recipe, RecipeSchema } from './schemas/recipe/recipe.schema';
import { RecipesController } from './services/recipe/recipes.controller';
import { RecipesService } from './services/recipe/recipes.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ecomeal'),
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  controllers: [AppController, IngredientsController, RecipesController],
  providers: [AppService, IngredientsService, RecipesService],
})
export class AppModule {}
