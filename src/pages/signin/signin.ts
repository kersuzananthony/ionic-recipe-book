import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { LoadingController, Loading, AlertController } from "ionic-angular";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

	loading: Loading;

  constructor(
  	private authService: AuthService,
	  private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  onSubmit(form: NgForm) {
  	this.displayLoading();

		const formValue = form.value;

		this.authService.signin(formValue.email, formValue.password)
			.then(data => {
				console.log(data);
				this.loading.dismiss();
			})
			.catch(error => {
				console.log(error);
				this.loading.dismiss();

				this.displayError(error.message);
			});
  }

  private displayLoading() {
  	this.loading = this.loadingCtrl.create({
  		content: 'Signin you in!'
	  });

  	this.loading.present();
  }

  private displayError(message: string) {
  	const alert = this.alertCtrl.create({
  		title: 'Sign In Error',
		  message: message,
		  buttons: [
			  {
			  	text: 'OK',
				  role: 'cancel',
				  handler: () => {
			  		console.log('Error alert controller has been dismissed!');
				  }
			  }
		  ]
	  });

  	alert.present();
  }

}
