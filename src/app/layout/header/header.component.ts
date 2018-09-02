import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isAuth: boolean
  public isAuthSubscription: Subscription

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe((isAuth) => {
      this.isAuth = isAuth
    })
  }

  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe()
  }

  async onSignOut() {
    try {
      await this.authService.signOut()
      this.router.navigate(['/books'])
    } catch {
      console.log('Erreur de déconnexion')
    }
  }

}
