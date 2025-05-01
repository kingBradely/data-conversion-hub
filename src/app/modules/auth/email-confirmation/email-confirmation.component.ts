import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  standalone: false,
  templateUrl: './email-confirmation.component.html',
  styleUrl: './email-confirmation.component.css'
})
export class EmailConfirmationComponent implements OnInit {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  public inputs = Array(6);
  user!: User;
  startCountdown: boolean = true;
  form: FormGroup;

  constructor(
    private authService: AuthService, 
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      otp: this.fb.array(
        Array(6).fill('').map(() => ['', [Validators.required, Validators.maxLength(1)]])
      )
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser() as User;
  }

  onOtpInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;
    
    if (value.length > 0 && index < this.inputs.length - 1) {
      const nextInput = this.otpInputs.get(index + 1);
      if (nextInput) {
        nextInput.nativeElement.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && index > 0 && !(event.target as HTMLInputElement).value) {
      const prevInput = this.otpInputs.get(index - 1);
      if (prevInput) {
        prevInput.nativeElement.focus();
      }
    }
  }

  resendVerificationCode() {
    this.authService.resendVerificationCode(this.user.id).subscribe({
      next: (res) => {
        this.notificationService.success(res.message);
        this.startCountdown = true;
      },
      error: (error) => {
        console.error('Error resending verification code', error);
        this.notificationService.error(error.error.message || 'Error resending verification code');
      }
    });
  }

  sendVerificationCode() {
    if (this.form.invalid) {
      return;
    }
    
    const code = this.form.get('otp')?.value.join('');
    console.log(code);
    
    
    if (!code || code.length !== 6) {
      this.notificationService.error('Please enter all 6 digits of the verification code');
      return;
    }

    this.authService.verifyVerificationCode({ userId: this.user.id, code }).subscribe({
      next: (res) => {
        this.notificationService.success('Verification successful!');
        this.router.navigate(['/dashboard'], { replaceUrl: true });
        this.startCountdown = false;
      },
      error: (error) => {
        console.error('Error verifying email', error);
        this.notificationService.error(error.error.message || 'Error verifying email');
      }
    });
  }
}
