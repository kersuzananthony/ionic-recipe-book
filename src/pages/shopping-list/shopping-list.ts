import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController, LoadingController, Loading } from 'ionic-angular';
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
  private loading: Loading;

  constructor(
    public navCtrl: NavController,
    private shoppingService: ShoppingListService,
    private authService: AuthService,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {}

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
  		if (data != null && data['action'] == 'load') {
				this.loadRemoteIngredients();
		  } else if (data != null && data['action'] == 'store') {
  			this.saveRemoteIngredients();
		  }
	  });

  	popover.present({
  		ev: event
	  });
	}

	private saveRemoteIngredients() {
  	this.displayLoading('Saving data to the server...');

		this.authService.getActiveUser().getToken()
			.then((token:string) => {
				this.shoppingService.storeList(token)
					.subscribe(
						() => {
							this.loading.dismiss();
							console.log('success');
						},
						(error) => {
							this.loading.dismiss();
							this.displayError(error.message || 'Cannot save data to the server');
							console.log('error', error)
						}
					);
			});
	}

	private loadRemoteIngredients() {
  	this.displayLoading('Loading data from server...');

		this.authService.getActiveUser().getToken()
			.then((token: string) => {
				this.shoppingService.fetchList(token)
					.subscribe(
						(list: Ingredient[]) => {
							this.loading.dismiss();
							if (list) {
								this.ingredients = list;
							} else {
								this.ingredients = [];
							}
						},
						(error) => {
							this.loading.dismiss();
							this.displayError(error.message || 'Cannot fetch data from the server');
							console.log(error.message || 'Cannot fetch data from the server');
						}
					);
			});
	}

	private displayLoading(message: string) {
  	this.loading = this.loadingCtrl.create({
  		content: message
	  });

  	this.loading.present();
	}

	private displayError(message: string) {
  	const alert = this.alertCtrl.create({
  		title: 'An Error occured!',
		  message: message,
		  buttons: [
			  {
			  	text: 'OK',
				  role: 'cancel'
			  }
		  ]
	  });

  	alert.present();
	}
}
