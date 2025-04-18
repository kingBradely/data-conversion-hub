import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
