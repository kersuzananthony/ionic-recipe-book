import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Recipe } from "../../models/recipe";
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { ShoppingListService } from "../../services/shopping.service";
import { RecipeService } from "../../services/recipe.service";

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})
export class RecipePage implements OnInit {

	private recipeIndex: number;
	private recipe: Recipe;

  constructor(
  	private navCtrl: NavController,
	  private navParams: NavParams,
    private shoppingService: ShoppingListService,
    private recipeService: RecipeService) {}

  ngOnInit() {
  	this.recipe = this.navParams.get('recipe');
  	this.recipeIndex = this.navParams.get('index');
  }

  onEditRecipe() {
  	this.navCtrl.push(EditRecipePage, { mode: 'Edit', recipe: this.recipe, index: this.recipeIndex });
  }

  onDeleteRecipe() {
		this.recipeService.removeRecipe(this.recipeIndex);
		this.navCtrl.popToRoot();
  }

	onAddIngredient() {
		this.shoppingService.addIngredients(this.recipe.ingredients);
	}
}
