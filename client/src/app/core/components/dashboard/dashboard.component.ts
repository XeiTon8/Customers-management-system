import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';

// ngRx
import {Store, select} from '@ngrx/store';
import { AppState } from 'src/app/shared/store/reducers';
import { deleteCustomer, toggleIsEditCustomerOpened } from 'src/app/store/customers/actions/customers.actions';
import { selectCustomers, selectIsEditOpened, selectSearchValue } from 'src/app/store/customers/selectors/customers.selector';
import { selectIsAddNewOpened, selectIsOverlay } from 'src/app/shared/store/selectors/selectHeaderFormsState.selector';
import { addCustomer } from 'src/app/store/customers/actions/customers.actions';

// Types
import { CustomersService } from 'src/app/services/customers-service.service';
import { Customer } from 'src/app/features/models/ICustomer';

import { ConfirmPopupsService } from 'src/app/services/confirm-popups.service';
import { Observable, take, filter, combineLatest, distinctUntilChanged, map} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate('0.3s ease-out')]),
      transition(':leave', [animate('0.3s ease-out', style({ opacity: 0 }))])
    ])
  ]
})
export class DashboardComponent implements OnInit {

 
  constructor(private store: Store<AppState>, private customersService: CustomersService, private popupsService: ConfirmPopupsService)  {}

  customers$: Observable<Customer[]> = new Observable<Customer[]>();
  filteredCustomers$:Observable<Customer[]> = new Observable<Customer[]>();

  isDataFetched = false;

  // Form
  isAddPopupVisible = false;
  isOverlayVisible = false;

  // Customers
  isCustomerCreated = false;
  isCustomerDeleted = false;
 


  isAddPopupVisible$ = this.store.pipe(select(selectIsAddNewOpened));;
  isOverlayVisible$ = this.store.pipe(select(selectIsOverlay));
  isEditOpened$ = this.store.pipe(select(selectIsEditOpened));
  searchValue$ = this.store.pipe(select(selectSearchValue));




  trackByCustomerId(index: number, customer: Customer) {
  return customer._id;
}

  ngOnInit(): void {
    // Fetch customers
    this.customers$ = this.store.pipe(select(selectCustomers));
    this.customers$.pipe(
      filter((customers: Customer[]) => !!customers.length),
      distinctUntilChanged(),
      take(1)
    ).subscribe(() => {
      // Customers are already in the store, no need to fetch them
      this.isDataFetched = true;
    });

    this.customers$.subscribe(() => {
      if (!this.isDataFetched) {
        this.fetchCustomers();
      }
    });

    this.filteredCustomers$ = combineLatest([this.customers$, this.searchValue$]).pipe(map(
    ([customers, searchValue]) => {
      if (searchValue && searchValue.length > 0) {
        return customers.filter((customer) => customer.firstName?.toLowerCase().includes(searchValue.toLowerCase()))
      }
       else {
        return customers;
       }
    }
    ))

    // Form
    this.store.pipe(select(selectIsAddNewOpened)).subscribe(isAddPopupVisible => {
      this.isAddPopupVisible = isAddPopupVisible;
    });
    this.store.pipe(select(selectIsOverlay)).subscribe(isOverlayVisible => {
      this.isOverlayVisible = isOverlayVisible;
    });

    // Popups
    this.popupsService.isCustomerCreated.subscribe(created => {
        this.isCustomerCreated = created;
          if (created) {
            setTimeout(() => {
            this.isCustomerCreated = false;
          }, 3500)
        }
    })

    this.popupsService.isCustomerDeleted.subscribe(deleted => {
      this.isCustomerDeleted = deleted;
      if (deleted) {
        setTimeout(() => {
          this.isCustomerDeleted = false;
        }, 3500)
      }
    })
   
  }
  

  addCustomer(customer: Customer) {
    this.customersService.createCustomer(customer).subscribe({
      next: (createdCustomer: Customer) => {
        this.store.dispatch(addCustomer({customer: createdCustomer}));
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.popupsService.setCustomerCreated(true);
    console.log(this.isCustomerCreated)
  }

deleteCustomer(id: string) {
  this.customersService.deleteCustomer(id).subscribe({
    next: () => {
      this.store.dispatch(deleteCustomer({id}))
    },
    error: (error) => {
      console.error(error)
    }
  })

  this.popupsService.setCustomerDeleted(true);

}

 editCustomer() {
  this.store.dispatch(toggleIsEditCustomerOpened());
  

 }

 private fetchCustomers() {
   this.customersService.getCustomers();
   
 }


 

}
