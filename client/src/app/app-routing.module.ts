import { NgModule } from '@angular/core';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { AuthComponent } from './core/components/auth/auth.component';
import { EditCustomerComponent } from './shared/components/edit-customer/edit-customer.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { CustomerCardComponent } from './features/components/customer-card/customer-card.component';

const routes: Routes = [
  {path: '', redirectTo: "/sign-in", pathMatch: 'full'},
  {path: 'sign-in', component: AuthComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'dashboard/edit/:id', component: EditCustomerComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'dashboard/customers/:id', component: CustomerCardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
