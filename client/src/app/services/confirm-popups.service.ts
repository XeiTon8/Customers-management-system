import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPopupsService {

  constructor() { }

  isCustomerCreated = new BehaviorSubject<boolean>(false)
  isCustomerEdited = new BehaviorSubject<boolean>(false);
  isCustomerDeleted =new BehaviorSubject<boolean>(false);

  customerCreatingFailed = false;
  customerEditingFailed = false;
  customerDeletingFailed = false;

  setCustomerCreated(value: boolean) {
   this.isCustomerCreated.next(value)
  }

  setCustomerEdited(value: boolean) {
    this.isCustomerEdited.next(value)
  }

  setCustomerDeleted(value: boolean) {
    this.isCustomerDeleted.next(value)
  }

}
