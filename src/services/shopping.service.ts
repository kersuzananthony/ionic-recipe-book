import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

import apiKeys from '../api.keys.json';
import { AuthService } from "./auth.service";

@Injectable()
export class ShoppingListService {

	constructor(private http: Http, private authService: AuthService) {}

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

	storeList(token: string) {
		const userId = this.authService.getActiveUser().uid;
		const databaseUrl: string = <string>apiKeys['firebaseDatabaseUrl'];

		return this.http
			.put(databaseUrl + userId + '/shopping-list.json?auth=' + token, this.ingredients)
			.map((response: Response) => response.json());
	}
}