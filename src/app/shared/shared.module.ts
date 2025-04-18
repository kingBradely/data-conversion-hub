import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './components/notification/notification.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule,
  ]
})
export class SharedModule { }