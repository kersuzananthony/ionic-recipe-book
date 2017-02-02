import { Ingredient } from "../models/ingredient";

export class ShoppingListService {
	private ingredients: Ingredient[] = [];

	getIngredients(): Ingredient[] {
		return this.ingredients.slice();
	}

	addIngredient(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
	}

	addIngredients(ingredients: Ingredient[]) {
		this.ingredients.push(...ingredients);
	}

	removeIngredient(index: number) {
		this.ingredients.splice(index, 1);
	}
}