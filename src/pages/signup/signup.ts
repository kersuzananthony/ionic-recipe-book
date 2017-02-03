import { Component } from '@angular/core';

import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { LoadingController, Loading, AlertController } from "ionic-angular";

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

	loading: Loading;

	constructor(
		private authService: AuthService,
	  private loadingCtrl: LoadingController,
	  private alertCtrl: AlertController
	) {}

  onSubmit(form: NgForm) {
		this.displayLoading();

  	const formValue = form.value;
  	this.authService.signup(formValue.email, formValue.password)
		  .then(data => {
			  this.loading.dismiss();
		  	console.log(data)
		  })
		  .catch(error => {
		  	this.loading.dismiss();
		  	this.displayError(error.message || 'Cannot sign up!');
		  	console.log('Signup failed!', error)
		  });
  }

  private displayLoading() {
	  this.loading = this.loadingCtrl.create({
			content: 'Signing you up...'
		});

		this.loading.present();
  }

  private displayError(message: string) {
		const alert = this.alertCtrl.create({
			title: 'Sign up Error',
			message: message,
			buttons: [
				{
					text: 'OK',
					role: 'cancel',
					handler: () => {
						console.log('Alert dismissed!')
					}
				}
			]
		});

		alert.present();
  }
}
