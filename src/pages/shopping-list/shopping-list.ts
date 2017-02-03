import { Component } from '@angular/core';
import { NavController, PopoverCmp, PopoverController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { ShoppingListOptionsPage } from "./shopping-list-options";

import { ShoppingListService } from "../../services/shopping.service";
import { AuthService } from "../../services/auth.service";

import { Ingredient } from "../../models/ingredient";

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
    private authService: AuthService,
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
  	const popover = this.popoverCtrl.create(ShoppingListOptionsPage);

  	popover.onDidDismiss(data => {
  		if (data['action'] == 'load') {

		  } else if (data['action'] == 'store') {
  			this.authService.getActiveUser().getToken()
				  .then((token:string) => {
						this.shoppingService.storeList(token)
							.subscribe(
								() => console.log('success'),
								(error) => console.log('error', error)
							);
				  });
		  }
	  });

  	popover.present({
  		ev: event
	  });
	}
}
