import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { CustomersService } from "src/app/services/customers-service.service";
import { addCustomer, addCustomerFail, addCustomerSuccess } from "../actions/customers.actions";
import { Customer } from "src/app/features/models/ICustomer";
import { getCustomers, getCustomersSuccess } from "../actions/customers.actions";

@Injectable()
export class CustomerEffects {
  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCustomer),
      switchMap(({ customer }) =>
        this.customersService.createCustomer(customer).pipe(
          map((customer: Customer) => addCustomerSuccess(customer)),
          catchError((error) => of(addCustomerFail({ error: error.message })))
        )
      )
    )
  );

  getCustomers$ = createEffect(() => 
  this.actions$.pipe(
    ofType(getCustomers),
    exhaustMap(() => 
    this.customersService.getCustomers().pipe(
      map((customers) => {
        console.log(customers)
        return getCustomersSuccess({customers: []})
      })
    ))
  ))
  constructor(
    private actions$: Actions,
    private customersService: CustomersService
  ) {}
}