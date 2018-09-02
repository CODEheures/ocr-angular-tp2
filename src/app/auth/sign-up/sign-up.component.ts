import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: []
})
export class SignUpComponent implements OnInit {

  public signUpFromGroup: FormGroup
  public msgError: string

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.signUpFromGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')]],
    })
  }

  async onSubmit() {
    const password = this.signUpFromGroup.value['password']
    const email = this.signUpFromGroup.value['email']

    try {
      await this.authService.signUp(email, password)
      this.router.navigate(['/books'])
    } catch (error) {
      this.msgError = error
    }
  }
}
