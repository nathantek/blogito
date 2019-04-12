import { Component } from '@angular/core';
import * as firebase from 'firebase';
// tslint:disable: indent
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Bienvenue sur BlogBlog';
	constructor() {
  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyBP-iANXodnZbZQpDFLstWDZkBy-VM-0Yc',
    authDomain: 'blogblog-9cf0a.firebaseapp.com',
    databaseURL: 'https://blogblog-9cf0a.firebaseio.com',
    projectId: 'blogblog-9cf0a',
    storageBucket: '',
    messagingSenderId: '871753596625'
	};

	 firebase.initializeApp(config);
	}
}
