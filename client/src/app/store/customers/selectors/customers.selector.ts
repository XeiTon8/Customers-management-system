import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/reducers';
import { Customer } from 'src/app/features/models/ICustomer';
import { CustomerState } from '../reducers/customer.reducer';

export const selectCustomers = createSelector(
  (state: AppState) => state.customers,
  (customersState: CustomerState) => customersState.customersList
);

export const selectCustomerById = (customerId: string) => createSelector(
  selectCustomers,
  (customers) => customers.find(customer => customer._id === customerId)
);

export const selectIsEditOpened = createSelector(
  (state: AppState) => state.customers,
  (customersState: CustomerState) => customersState.isEditOpened
);

export const selectSearchValue = createSelector(
  (state: AppState) => state.customers,
  (customersState: CustomerState) => customersState.searchCustomer
)