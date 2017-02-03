import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe";
import { AuthService } from "./auth.service";
import { Response, Http } from "@angular/http";

import apiKeys from '../api.keys.json';

@Injectable()
export class RecipeService {
	private recipes: Recipe[] = [];

	constructor(private authService: AuthService, private http: Http) {}

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

	storeList(token: string) {
		const userId = this.authService.getActiveUser().uid;
		const databaseUrl: string = <string>apiKeys['firebaseDatabaseUrl'];

		return this.http
			.put(databaseUrl + userId + '/recipes.json?auth=' + token, this.recipes)
			.map((response: Response) => response.json());
	}

	fetchList(token: string) {
		const userId = this.authService.getActiveUser().uid;
		const databaseUrl: string = <string>apiKeys['firebaseDatabaseUrl'];

		return this.http
			.get(databaseUrl + userId + '/recipes.json?auth=' + token)
			.map((response: Response) => {
				const recipes = response.json() ? response.json() : [];
				recipes.forEach(recipe => {
					if (!recipe.hasOwnProperty('ingredients')) {
						recipe.ingredients = [];
					}
				});

				return recipes;
			})
			.do(data => {
				if (data != null) this.recipes = data;
			});
	}
}