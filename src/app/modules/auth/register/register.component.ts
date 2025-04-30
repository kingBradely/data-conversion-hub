import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { emailRegex, passwordRegex } from '../../../core/constants/menu';
import { AuthService } from '../../../core/services/auth.service';
import { last } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  paswordStrength: number = 0;
  isTersmOpened: boolean = false;

  constructor(private readonly _router: Router, private authService: AuthService) { }

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(emailRegex)]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      acceptTerms: new FormControl(false, [Validators.requiredTrue]),
    },
      { validators: [this.confirmPasswordValidator,this.checkPasswordStrength] });
  }



  confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value.password !== control.value.confirmPassword ? { passwordNoMatch: true } : null;
  };


  get f() {
    return this.form.controls;
  }

  checkPasswordStrength:ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    this.paswordStrength = 0;
    if (control.value.password.match('.{8,}')) {
      this.paswordStrength += 1;
    }
    if (control.value.password.match('(?=.*[a-z])')) {
      this.paswordStrength += 1;
    }
    if (control.value.password.match('^(?=.*[A-Z])')) {
      this.paswordStrength += 1;
    }
    if (control.value.password.match('(.*[0-9].*)')) {
      this.paswordStrength += 1;
    }
    if (control.value.password.match('(?=.*[!@#$%^&*])')) {
      this.paswordStrength += 1;
    }    
    return this.paswordStrength > 0 ?  null : { passwordStrength: true };
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
    const data = this.form.value;
    delete data.confirmPassword;
    if (this.form.invalid || !this.isTersmOpened) {
      return;
    }
    this.authService.register(data)
  }

  openTerms(route: string): void {
    this.isTersmOpened = true;
    const url = this._router.serializeUrl(this._router.createUrlTree([route]));
    window.open(url, '_blank');
  }
}
