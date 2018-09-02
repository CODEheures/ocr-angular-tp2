import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth = false
  public isAuthSubject: Subject<boolean>

  constructor() {
    this.isAuthSubject = new Subject
  }

  publishIsAuth() {
    this.isAuthSubject.next(this.isAuth)
  }

  setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth
    this.publishIsAuth()
  }

  getIsAuthFromFirebase(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setIsAuth(true)
          resolve(true)
        } else {
          this.setIsAuth(false)
          resolve(false)
        }
      })
    })
  }

  async signIn(email: string, password: string) {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
      this.isAuth = true
      this.publishIsAuth()
    } catch (error) {
      const authError = error as firebase.auth.Error
      throw authError.message
    }
  }

  async signUp(email: string, password: string) {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password)
      this.isAuth = true
      this.publishIsAuth()
    } catch (error) {
      const authError = error as firebase.auth.Error
      throw authError.message
    }
  }

  async signOut() {
    try {
      await firebase.auth().signOut()
      this.isAuth = false
      this.publishIsAuth()
    } catch (error) {
      const authError = error as firebase.auth.Error
      throw authError.message
    }
  }
}
