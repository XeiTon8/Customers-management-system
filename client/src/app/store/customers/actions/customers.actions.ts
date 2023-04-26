import { createAction, props } from "@ngrx/store";
import { Customer } from "src/app/features/models/ICustomer";

export const getCustomers = createAction("[Customers], Get customers");
export const getCustomersSuccess = createAction("[Customers] Get customers Success", props<{customers: any[]}>())

export const addCustomer = createAction('[Customers] Add Customer', props<{ customer: Customer }>());
export const addCustomerSuccess = createAction('[Customers API] Add Customer Success', (customer: Customer) => (customer));
export const addCustomerFail = createAction('[Customers] Add Customer Fail', props<{ error: string }>());


export const deleteCustomer = createAction('[Customers] Delete customer', props<{id: string}>());

export const searchUpdateCustomers = createAction('[Customers] Update customers on search', props<{customers: Customer[]}>())
export const updateCustomer = createAction('[Customers] Update customer', props<{id: string, updatedCustomer: Customer}>())

export const updateSearchCustomer = createAction('[Customers] Find a customer', props<{searchedCustomer: string }>())

export const toggleIsEditCustomerOpened = createAction('[Customers] Edit customer');

