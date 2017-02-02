import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

import { 
  NavParams, 
  ActionSheet, 
  ActionSheetController,
  AlertController
 } from 'ionic-angular';


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
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController) {}

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
    console.log(this.recipeForm.value);
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
          text: 'Remove Ingredient',
          role: 'destructive',
          handler: () => {
            console.log('Remove ingredient pressed');
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
              return;
            }

            (<FormArray>this.recipeForm.controls['ingredients']).push(
              new FormControl(data.name, Validators.required)
            );
          }
        }
      ]
    });

    return newIngredientAlert;
  }
}
