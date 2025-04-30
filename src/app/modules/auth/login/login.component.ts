import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { emailRegex } from '../../../core/constants/menu';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(private readonly _router: Router, private authService : AuthService) {}

 

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(emailRegex)]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false, []),
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  googleSignin(googleSignInButton: any) {
    googleSignInButton.click();
  }

  signInWithFB() {    
    this.authService.signInWithFB()
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.form.value)
  }



 
  
}
