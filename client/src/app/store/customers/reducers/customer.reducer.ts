import { createReducer, on } from "@ngrx/store";
import { Customer } from "src/app/features/models/ICustomer";
import { getCustomersSuccess, addCustomer, deleteCustomer, updateCustomer, updateCustomers, updateSearchCustomer, toggleIsEditCustomerOpened } from "../actions/customers.actions";

export interface CustomerState {
  customersList: Customer[];
  isEditOpened: boolean;
  searchCustomer: string;
  
}


export const initialState: CustomerState = {
  customersList: [],
  isEditOpened: false,
  searchCustomer: '',

};

export const _customersReducer = createReducer(
    initialState, 
    on(addCustomer, (state, {customer}) => {
return {
  ...state,
  customersList: [...state.customersList, customer]
}
    }),

    on(getCustomersSuccess, (state, { customers }) => {
        if (Array.isArray(customers)) {
          return {
            ...state,
            customersList: [...state.customersList, ...customers]
          } ;
        } else {
          console.error('Invalid customers data:', customers);
          return state;
        }
      }),

      on(deleteCustomer, (state: CustomerState, { id }) => ({
        ...state,
        customersList: state.customersList.filter(customer => customer._id !== id)
      })),

      on(updateCustomer, (state, { id, updatedCustomer }) => {
        const fetchedCustomer = state.customersList.map(c => c._id === id ? updatedCustomer : c);
        return { ...state, customersList: fetchedCustomer };
      }),

      on(updateCustomers, (state, {customers}) => {
        return {...state, customersList: customers}
      }),

      on(updateSearchCustomer, (state, { searchedCustomer }) => {

        return { ...state, searchCustomer: searchedCustomer};
      }),

      on(toggleIsEditCustomerOpened, (state: CustomerState) => ({
        ...state, isEditOpened: !state.isEditOpened
      }))
      
  )

export function customerReducer(state = initialState, action: any) {
    return _customersReducer(state, action)
}