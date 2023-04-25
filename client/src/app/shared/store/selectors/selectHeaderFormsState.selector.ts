import {createSelector} from '@ngrx/store';
import { AppState } from '../reducers';
import { HeaderFormsState } from '../reducers/forms.reducer';

export const selectHeaderForms = (state: AppState) => state.headerForms;

export const selectIsAddNewOpened = createSelector(
    (state: AppState) => state.headerForms,
    (headerFormsState) => {
        return headerFormsState.isAddNewOpened;
    }
  );

  export const selectIsOverlay = createSelector(
    (state: AppState) => state.headerForms,
    (headerFormsState) => {
        return headerFormsState.isOverlay
    }
  )
