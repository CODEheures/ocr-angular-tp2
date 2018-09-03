import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { HeaderComponent } from './layout/header/header.component';
import { P404Component } from './p404/p404.component';
import { BookEditComponent } from './books/book-edit/book-edit.component'
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'books/new', canActivate: [AuthGuardService], component: BookEditComponent },
  { path: 'books/view/:id', canActivate: [AuthGuardService], component: BookDetailComponent },
  { path: 'auth/signup', component: SignUpComponent},
  { path: 'auth/signin', component: SignInComponent},
  { path: '', redirectTo: '/books', pathMatch: 'full'},
  { path: '**', component: P404Component }
]

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    BookListComponent,
    BookDetailComponent,
    HeaderComponent,
    BookDetailComponent,
    BookListComponent,
    P404Component,
    BookEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
