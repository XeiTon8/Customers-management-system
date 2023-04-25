import {createReducer, on} from '@ngrx/store'
import { toggleAddNewForm } from '../actions/forms/forms.actions';

export interface HeaderFormsState {
    isAddNewOpened: boolean;
    isOverlay: boolean;
}

export const initialState: HeaderFormsState = {
    isAddNewOpened: false,
    isOverlay: false,
   
    
}

export const headerFormsReducer = createReducer(
    initialState,
    on(toggleAddNewForm, (state, { elClass }) => {
      switch (elClass) {
        case 'header__add-new':
          return { ...state, isAddNewOpened: true, isOverlay: true };

        case 'popup-choose__close-button':
          return {...state, isAddNewOpened: false, isOverlay: false}
  
        default:
          return state;
      }
    })
  );