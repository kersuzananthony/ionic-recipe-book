import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {

  private mode: string = 'New';
  private selectDifficultyOptions = ['Easy', 'Medium', 'Hard'];
  private recipeForm: FormGroup;

  constructor(
    private navParams: NavParams,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  private initializeForm() {
    this.recipeForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      difficulty: ['Medium', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.recipeForm.value);
  }
}
