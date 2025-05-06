import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailRegex } from '../../../core/constants/menu';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup
  constructor(private authService : AuthService, private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(emailRegex)]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    
    this.authService.forgotPassword(this.form.value).subscribe({
      next: (res) => {
        this.notificationService.success('Check your email for the reset password link');
      },
      error: (error) => {
        this.notificationService.error('Error while sending reset password link');
        console.error(error);
      }
    })
  }

}
