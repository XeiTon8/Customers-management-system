import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//ngRx 
import { reducers } from './store/reducers';
import { headerFormsReducer } from './store/reducers/forms.reducer';
import { initialHeaderFormsState } from './store/reducers';
import {StoreModule} from '@ngrx/store';

// Components
import { HeaderComponent } from './components/header/header.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { AddNewCustomerComponent } from './components/add-new-customer/add-new-customer.component';
import { ClosePopupButtonComponent } from './components/close-popup-button/close-popup-button.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    OverlayComponent,
    AddNewCustomerComponent,
    ClosePopupButtonComponent,
    EditCustomerComponent,
    NotFoundComponent,
    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forFeature('headerForms', headerFormsReducer)
  ],

  exports: [HeaderComponent, ClosePopupButtonComponent, OverlayComponent, AddNewCustomerComponent, EditCustomerComponent, NotFoundComponent]
})
export class SharedModule { }
