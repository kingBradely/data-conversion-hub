import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { GoogleSignInButtonComponent } from '../../shared/components/google-sign-in-button/google-sign-in-button.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { TimerComponent } from '../../shared/components/timer/timer.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    EmailConfirmationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ButtonComponent,
    AngularSvgIconModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    GoogleSignInButtonComponent,
    TimerComponent
  ]
})
export class AuthModule { }
