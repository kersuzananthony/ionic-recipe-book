import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe";

@Injectable()
export class RecipeService {
	private recipes: Recipe[] = [];

	getRecipes(): Recipe[] {
		return this.recipes.slice();
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe;
	}

	removeRecipe(index: number) {
		this.recipes.splice(index, 1);
	}
}