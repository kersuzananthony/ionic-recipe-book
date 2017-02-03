import { Component } from '@angular/core';
import { NavController, PopoverCmp, PopoverController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { ShoppingListService } from "../../services/shopping.service";
import { Ingredient } from "../../models/ingredient";
import { ShoppingListOptionsPage } from "./shopping-list-options";

/*
  Generated class for the ShoppingList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

  private ingredients: Ingredient[];

  constructor(
    public navCtrl: NavController,
    private shoppingService: ShoppingListService,
    private popoverCtrl: PopoverController) {}

  ionViewWillEnter() {
    this.loadIngredients();
  }

  private loadIngredients() {
    this.ingredients = this.shoppingService.getIngredients();
  }

  onFormSubmit(form: NgForm) {
    this.shoppingService.addIngredient(new Ingredient(form.value.ingredientName, form.value.ingredientAmount));
    form.reset();
    this.loadIngredients();
    console.log('Ingredients', this.shoppingService.getIngredients());
  }

  onDeleteIngredient(index: number) {
    this.shoppingService.removeIngredient(index);
    this.loadIngredients();
  }

	onShowOptions(event: MouseEvent) {
  	this.popoverCtrl.create(ShoppingListOptionsPage).present({
  		ev: event
	  });
	}
}
