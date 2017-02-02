import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditRecipePage } from "../edit-recipe/edit-recipe";

/*
  Generated class for the Recipes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

  constructor(public navCtrl: NavController) {}

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'New' });
  }
}
