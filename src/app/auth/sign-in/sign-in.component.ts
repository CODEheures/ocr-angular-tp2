import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordMatchValidator } from './passwords-match.validator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase'


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: []
})
export class SignInComponent implements OnInit {

  public signInFromGroup: FormGroup
  public passwordFormGroup: FormGroup
  public msgError: string

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')]],
      repeatPassword: ['', [Validators.required]]
    }, {validator: PasswordMatchValidator.validate.bind(this)})

    this.signInFromGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwordFormGroup: this.passwordFormGroup
    })
  }

  async onSubmit() {
    const password = this.signInFromGroup.controls.passwordFormGroup.value['password']
    const email = this.signInFromGroup.value['email']

    try {
      await this.authService.signIn(email, password)
      this.router.navigate(['/books'])
    } catch (error) {
      this.msgError = error
    }
  }

}
