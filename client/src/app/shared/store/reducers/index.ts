import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import { headerFormsReducer, HeaderFormsState } from './forms.reducer';
import { Customer } from 'src/app/features/models/ICustomer';
import { customerReducer } from 'src/app/store/customers/reducers/customer.reducer';
import { CustomerState } from 'src/app/store/customers/reducers/customer.reducer';

export interface AppState {
    headerForms: HeaderFormsState;
    customers: CustomerState
}

export const initialHeaderFormsState: HeaderFormsState = {
    isAddNewOpened: false,
    isOverlay: false,
  };


export const reducers: ActionReducerMap<AppState> = {
headerForms: headerFormsReducer,
customers: customerReducer
}

