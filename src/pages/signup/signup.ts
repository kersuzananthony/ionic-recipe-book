import { Component } from '@angular/core';

import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

	constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
  	const formValue = form.value;

  	this.authService.signup(formValue.email, formValue.password)
		  .then(data => console.log(data))
		  .catch(error => console.log('Signup failed!', error));
  }

}
