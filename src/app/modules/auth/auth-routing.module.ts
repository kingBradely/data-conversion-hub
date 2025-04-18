import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: LoginComponent, data: { returnUrl: window.location.pathname } },
      { path: 'sign-up', component: RegisterComponent },
      // { path: 'forgot-password', component: ForgotPasswordComponent },
      // { path: 'new-password', component: NewPasswordComponent },
      // { path: 'two-steps', component: TwoStepsComponent },
      { path: '**', redirectTo: 'sign-in', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
