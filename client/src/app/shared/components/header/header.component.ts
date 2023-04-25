import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

// ngRx
import {Store, select} from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { toggleAddNewForm } from 'src/app/shared/store/actions/forms/forms.actions';
import { selectCustomers } from 'src/app/store/customers/selectors/customers.selector';
import { searchUpdateCustomers } from 'src/app/store/customers/actions/customers.actions';
import { updateSearchCustomer } from 'src/app/store/customers/actions/customers.actions';

import {Observable, map} from 'rxjs'
import { Customer } from 'src/app/features/models/ICustomer';
import { AuthUserService } from 'src/app/core/components/auth/auth-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('searchAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(0%) scale(0)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0%) scale(1)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(0%) scale(0)' })),
      ]),
    ]),
  ],
})
export class HeaderComponent {

  isProfileOpened:boolean = false;
  isSearchOpened:boolean = false;
  headerTitle:string = "Customers";
  searchValue: string = ''


customers: Observable<Customer[]> = this.store.pipe(select(selectCustomers))

searchCustomers(searchValue: string) {
 this.store.dispatch(updateSearchCustomer({searchedCustomer: searchValue}))
 console.log(searchValue)
}

  constructor(private router: Router, private store: Store<AppState>, private auth: AuthUserService) {
   this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      switch(event.url) {
        case '/dashboard':
          this.headerTitle = 'Customers';
          break;
      }
    }
   })
  }

  // onAddNewClicked() {this.addNewOpened.emit(true);}

  openSearch() {
    this.isSearchOpened = !this.isSearchOpened;
   
  }

  openForm() {
    this.store.dispatch(toggleAddNewForm({elClass: "header__add-new"}))

      }

    signOut() {
this.auth.signOut();
this.router.navigate(['/sign-in'])
      }

}
