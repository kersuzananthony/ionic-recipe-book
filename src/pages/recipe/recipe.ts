import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Recipe } from "../../models/recipe";
import { EditRecipePage } from "../edit-recipe/edit-recipe";

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})
export class RecipePage implements OnInit {

	private recipeIndex: number;
	private recipe: Recipe;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
  	this.recipe = this.navParams.get('recipe');
  	this.recipeIndex = this.navParams.get('index');
  }

  onEditRecipe() {
  	this.navCtrl.push(EditRecipePage, { mode: 'Edit', recipe: this.recipe, index: this.recipeIndex });
  }

  onDeleteRecipe() {

  }
}
