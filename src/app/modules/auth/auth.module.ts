import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    ButtonComponent,
    AngularSvgIconModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
