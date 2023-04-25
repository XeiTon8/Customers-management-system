import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClosePopupButtonComponent } from '../shared/components/close-popup-button/close-popup-button.component';

@NgModule({
  declarations: [AuthComponent, DashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AppRoutingModule
    
  ],
  exports: [ DashboardComponent]
})
export class CoreModule { }
