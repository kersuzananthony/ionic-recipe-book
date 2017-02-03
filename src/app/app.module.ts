import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from "../pages/tabs/tabs";
import { ShoppingListPage } from "../pages/shopping-list/shopping-list";
import { ShoppingListOptionsPage } from "../pages/shopping-list/shopping-list-options";
import { RecipesPage } from "../pages/recipes/recipes";
import { RecipePage } from "../pages/recipe/recipe";
import { EditRecipePage } from "../pages/edit-recipe/edit-recipe";

import { ShoppingListService } from "../services/shopping.service";
import { RecipeService } from "../services/recipe.service";
import { AuthService } from "../services/auth.service";

import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
	  ShoppingListOptionsPage,
    RecipesPage,
    RecipePage,
    EditRecipePage,
	  SigninPage,
	  SignupPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ShoppingListPage,
	  ShoppingListOptionsPage,
    RecipesPage,
    RecipePage,
    EditRecipePage,
	  SigninPage,
	  SignupPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
	  RecipeService,
	  AuthService
  ]
})
export class AppModule {}
