import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { NotificationService } from '../../../shared/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  form!: FormGroup;
  isValidToken: boolean = false;
  showTimeoutMessage: boolean = false; // New property to track timeout message visibility
  paswordStrength: number = 0;
  passwordTextType: boolean = false;
  submitted = false;

  $subscription!: Subscription

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token') || '';
    this.verifyToken(); // Call the method to verify the token    
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
      { validators: [this.confirmPasswordValidator, this.checkPasswordStrength] });
  }



  confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value.password !== control.value.confirmPassword ? { passwordNoMatch: true } : null;
  };


  get f() {
    return this.form.controls;
  }

  checkPasswordStrength: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
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
    return this.paswordStrength > 0 ? null : { passwordStrength: true };
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  verifyToken() {
    const verifyResetPasswordTokenSub = this.authService.verifyResetPasswordToken({ token: this.token }).subscribe({
      next: () => {
        this.isValidToken = true;
      },
      error: () => {
        this.isValidToken = false;
      }
    })

    this.$subscription.add(verifyResetPasswordTokenSub)
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = {
      password: this.form.value.password,
      token: this.token
    };
    const resetPasswordSub = this.authService.resetPassword(data).subscribe({
      next: (res) => {
        this.notificationService.success('Password reset successful! You can now log in with your new password.');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.notificationService.error('Error resetting password. Please try again.');
      }
    });
    this.$subscription.add(resetPasswordSub)
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }
}
