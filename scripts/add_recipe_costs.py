""" [TODO] implement a script to calculate recipes costs and add theme to each recipes
    Returns the list of all recipes with all costs added
"""
import json
import sys
from typing import Any, Dict


measureUnits = dict()
ingredients = dict()
recipes = dict()

def readJsonFile(filepath: str) -> Dict:
    # Open and read the file
    with open(filepath, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data;

def writeJsonFile(filepath: str, data: dict) -> None:
    # write data to file
    with open(filepath, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

def find_element_by_field_value(data: list[dict], field: str, value: Any) -> dict | None:
    for item in data:
        if item.get(field) == value:
            return item
    return None

def convertToBaseUnit(qty: int, unit_id: str) -> int:
    unit = find_element_by_field_value(measureUnits, "id", unit_id)
    if (not unit['base_unit_id']):
        return qty
    else:
        return convertToBaseUnit(qty * unit['conversion_factor'], unit['base_unit_id'])

def calculateRecipeCost(recipe: dict) -> int:
    totalCost = 0
    for ingredientInfo in recipe['ingredients']:
        qty = ingredientInfo["quantity"]
        ingredientId = ingredientInfo['ingredient_id']
        unitId = ingredientInfo["unit_id"]
        try:
            totalCost += find_element_by_field_value(ingredients, "id", ingredientId)['price'] * convertToBaseUnit(qty, unitId)
        except TypeError as e:
            # Handling the TypeError if the object is NoneType
            if str(e) == "'NoneType' object is not subscriptable":
                print("Error:")
                print(recipe["id"] + f" at Ingredient: {ingredientId}")
                raise
            else:
                print(e)
                sys.exit(1)
    return totalCost


def addCostToRecipes() -> Dict:
    newRecipes = []
    for recipe in recipes:
        try:
            cost = calculateRecipeCost(recipe)
            newRecipes.append({**recipe, "cost": cost})
        except:
            None
    return (newRecipes)



def main(av):
    global measureUnits, ingredients, recipes
    
    if (len(av) != 2):
        print(f"Usage {av[0]} path_to_new_file")
        sys.exit(0)
    measureUnits = readJsonFile("./data/measure-units.json")
    ingredients = readJsonFile("./data/ingredients.json")
    recipes = readJsonFile("./data/recipes.json")
    newRecipes = addCostToRecipes()
    writeJsonFile(sys.argv[1], newRecipes)
    return 0;


if __name__ == "__main__":
    av = sys.argv
    sys.exit(main(av))
