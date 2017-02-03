import { Component } from '@angular/core';
import { NavController, PopoverController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { Recipe } from "../../models/recipe";
import { RecipeService } from "../../services/recipe.service";
import { RecipePage } from "../recipe/recipe";
import { DatabaseOptionsPage } from "../database-options/database-options";
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

	recipes: Recipe[] = [];
	loading: Loading;

  constructor(
  	private navCtrl: NavController,
    private recipeService: RecipeService,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {}

  ionViewWillEnter() {
	  this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'New' });
  }

  onLoadRecipe(recipe: Recipe, index: number) {
		this.navCtrl.push(RecipePage, { recipe: recipe, index: index });
  }

	onShowOptions(event: MouseEvent) {
		const popover = this.popoverCtrl.create(DatabaseOptionsPage);

		popover.onDidDismiss(data => {
			if (data != null && data['action'] == 'load') {
				this.loadRemoteRecipes();
			} else if (data != null && data['action'] == 'store') {
				this.saveRemoteRecipes();
			}
		});

		popover.present({
			ev: event
		});
	}

	private saveRemoteRecipes() {
		this.displayLoading('Saving data to the server...');

		this.authService.getActiveUser().getToken()
			.then((token:string) => {
				this.recipeService.storeList(token)
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

	private loadRemoteRecipes() {
		this.displayLoading('Loading data from server...');

		this.authService.getActiveUser().getToken()
			.then((token: string) => {
				this.recipeService.fetchList(token)
					.subscribe(
						(list: Recipe[]) => {
							console.log('list', list);
							this.loading.dismiss();
							if (list) {
								this.recipes = list;
							} else {
								this.recipes = [];
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
