import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'bibliotheque';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const config = {
      apiKey: 'AIzaSyDHMQbKeWf860F6jmyzGpM41zIKMV8gyNc',
      authDomain: 'testbdd-658f3.firebaseapp.com',
      databaseURL: 'https://testbdd-658f3.firebaseio.com',
      projectId: 'testbdd-658f3',
      storageBucket: 'testbdd-658f3.appspot.com',
      messagingSenderId: '582003278916'
    };
    firebase.initializeApp(config);
    this.authService.publishIsAuth()
  }
}
