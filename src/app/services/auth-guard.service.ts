import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private isAuth: boolean

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.authService.setIsAuth(true)
          resolve(true)
        } else {
          console.log('can activate false')
          this.authService.setIsAuth(false)
          this.router.navigate(['/auth', 'signup'])
          resolve(false)
        }
      })
    })
  }
}
