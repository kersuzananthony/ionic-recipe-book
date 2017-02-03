import { Injectable } from "@angular/core";

import firebase from 'firebase';

@Injectable()
export class AuthService {

	signup(email: string, password: string): firebase.Promise<any> {
		return firebase.auth().createUserWithEmailAndPassword(email, password);
	}

}