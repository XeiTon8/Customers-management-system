import { Component, EventEmitter, Output} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { toggleAddNewForm } from '../../store/actions/forms/forms.actions';
import { toggleIsEditCustomerOpened } from 'src/app/store/customers/actions/customers.actions';
import { selectIsEditOpened } from 'src/app/store/customers/selectors/customers.selector';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-close-popup-button',
  templateUrl: './close-popup-button.component.html',
  styleUrls: ['./close-popup-button.component.scss']
})
export class ClosePopupButtonComponent {

constructor(private store: Store<AppState>, private router: Router) {}

isEditOpened$: Observable<boolean> = this.store.pipe(select(selectIsEditOpened));

public closeForm() {
  this.store.dispatch(toggleAddNewForm({elClass: "popup-choose__close-button"}));
  this.isEditOpened$.subscribe(isEditOpened => {
    if (isEditOpened) {
      this.store.dispatch(toggleIsEditCustomerOpened());
    }
  });
  this.router.navigate(['/dashboard']);
}

}

