// Modules
import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Custom modules
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';

// Components
import { AppComponent } from './app.component';
import { ClosePopupButtonComponent } from './shared/components/close-popup-button/close-popup-button.component';


// Services 
import { AuthUserService } from './core/components/auth/auth-user.service';
import { IsComponentLoadedService } from './services/is-component-loaded.service';
import { CustomersService } from './services/customers-service.service';
import { ConfirmPopupsService } from './services/confirm-popups.service';
import { AuthGuard } from './services/auth/auth.guard';

// ngRx
import { customerReducer } from './store/customers/reducers/customer.reducer';

import { environment } from './enviorment';


@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({customers: customerReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    CommonModule,
    FeaturesModule,
    FormsModule,
  ],
  providers: [AuthGuard, AuthUserService, IsComponentLoadedService, CustomersService, ConfirmPopupsService, ClosePopupButtonComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
