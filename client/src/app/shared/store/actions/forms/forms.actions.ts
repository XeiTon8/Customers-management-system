import {createAction, props} from '@ngrx/store';

export const toggleAddNewForm = createAction("[HeaderForms] ToggleForm", props<{elClass: string}>())