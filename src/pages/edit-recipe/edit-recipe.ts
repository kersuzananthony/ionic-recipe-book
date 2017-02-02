import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

import {
	NavController,
  NavParams,
  ActionSheet,
  ActionSheetController,
  AlertController,
	ToastController
} from 'ionic-angular';
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../models/recipe";
import { Ingredient } from "../../models/ingredient";


@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {

  private mode: string = 'New';
  private selectDifficultyOptions = ['Easy', 'Medium', 'Hard'];
  private recipeForm: FormGroup;
  private actionSheet: ActionSheet;

  constructor(
  	private navController: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipeService: RecipeService) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  private initializeForm() {
    this.recipeForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      difficulty: ['Medium', Validators.required],
      ingredients: new FormArray([])
    });
  }

  onSubmit() {
  	const value = this.recipeForm.value;

  	let ingredients: Ingredient[] = [];
  	if (value.ingredients.length > 0) {
  		ingredients = value.ingredients.map(name => {
  			return new Ingredient(name, 1);
		  });
	  }

  	this.recipeService.addRecipe(new Recipe(value.title, value.description, value.difficulty, ingredients));
  	this.recipeForm.reset();
  	this.navController.popToRoot();
  }

  onManageIngredients() {
    this.actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            console.log('Add pressed');
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            console.log('Remove ingredient pressed');
            const fArray: FormArray = <FormArray>this.recipeForm.controls['ingredients'];
            const fArraylength = fArray.length;

            if (fArraylength > 0) {
              for (let i = fArraylength - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }

	            const toast = this.toastCtrl.create({
		            message: 'All ingredients were deleted!',
		            duration: 1000,
		            position: 'bottom'
	            });

	            toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel pressed');
          }
        }
      ]
    });

    this.actionSheet.present();
  }

  private createNewIngredientAlert() {
    const newIngredientAlert = this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel', 
          handler: () => {

          }
        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.name.trim() == '' || data.name == null) {
	            const toast = this.toastCtrl.create({
								message: 'Please enter a valid value!',
		            duration: 1000,
		            position: 'bottom'
	            });

	            toast.present();

              return;
            }

            (<FormArray>this.recipeForm.controls['ingredients']).push(
              new FormControl(data.name, Validators.required)
            );

	          const toast = this.toastCtrl.create({
		          message: 'New ingredient added!',
		          duration: 1000,
		          position: 'bottom'
	          });

	          toast.present();
          }
        }
      ]
    });

    return newIngredientAlert;
  }
}
