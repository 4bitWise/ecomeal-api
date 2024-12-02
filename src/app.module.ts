import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientsController } from './services/ingredient/ingredients.controller';
import { IngredientsService } from './services/ingredient/ingredients.service';
import {
  Ingredient,
  IngredientSchema,
} from './schemas/ingredient/ingredient.schema';
import { Recipe, RecipeSchema } from './schemas/recipe/recipe.schema';
import { RecipesController } from './services/recipe/recipes.controller';
import { RecipesService } from './services/recipe/recipes.service';
import {
  Measureunit,
  MeasureunitSchema,
} from './schemas/measureunit/measureunit.schema';
import { MeasureunitsController } from './services/measureunit/measureunits.controller';
import { MeasureunitsService } from './services/measureunit/measureunits.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MongoURI,
    ),
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    MongooseModule.forFeature([
      { name: Measureunit.name, schema: MeasureunitSchema },
    ]),
  ],
  controllers: [
    AppController,
    IngredientsController,
    RecipesController,
    MeasureunitsController,
  ],
  providers: [
    AppService,
    IngredientsService,
    RecipesService,
    MeasureunitsService,
  ],
})
export class AppModule {}
