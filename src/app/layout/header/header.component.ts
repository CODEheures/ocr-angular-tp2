import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isAuth: boolean
  public isAuthSubscription: Subscription

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe((isAuth) => {
      this.isAuth = isAuth
    })
    this.authService.publishIsAuth()
  }

  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe()
  }

  async signOut() {
    try {
      await this.authService.signOut()
    } catch {
      console.log('Erreur de déconnexion')
    }
  }

}
