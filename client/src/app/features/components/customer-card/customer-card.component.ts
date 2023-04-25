import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectCustomerById } from 'src/app/store/customers/selectors/customers.selector';
import { Customer } from '../../models/ICustomer';
import { AppState } from 'src/app/shared/store/reducers';
import { Observable, switchMap, of, map, lastValueFrom } from 'rxjs';
import { CustomersService } from 'src/app/services/customers-service.service';
import { filter } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { updateCustomer } from 'src/app/store/customers/actions/customers.actions';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent implements OnInit {

  constructor(
    private store: Store<AppState>, 
    private route: ActivatedRoute, 
    private customersService: CustomersService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  public customer$ = new Observable<Customer>();
  public isEditable = false;

  editCustomerCard = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    phone: [''],
    address: this.fb.group({
      streetAddress: [''],
      city: [''],
      state: [''],
      zipCode: ['']
    })
  })

  ngOnInit(): void {
    this.customer$ = this.route.params.pipe(switchMap((params: Params) => {
    const id = params['id'];

return this.store.pipe(
  select(selectCustomerById(id)), 
  map(customer => {
    if (customer) {
      this.editCustomerCard.patchValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
  address: {
    streetAddress: customer.address?.streetAddress,
    city: customer.address?.city,
    state: customer.address?.state,
    zipCode: customer.address?.zipCode
  }
})
    }
      if (!customer) {
      throw new Error(`Customer with id ${id} was not found`)
      }
      return customer;
                  }))
  }))
}

editCustomer() {
  this.isEditable = true;
}

async submitNewValue() {
  const customerId = this.route.snapshot.paramMap.get('id') ?? '';
  const updatedCustomer = this.getUpdatedValue();
  await lastValueFrom(this.customersService.updateCustomer(customerId, updatedCustomer));
  const customer = await lastValueFrom(this.customersService.getCustomer(customerId))
  this.store.dispatch(updateCustomer({customerId, customer}));
  this.isEditable = false;
}

getUpdatedValue() {
  return {
    _id: "",
    firstName: this.editCustomerCard.get('firstName')?.value || '',
    lastName: this.editCustomerCard.get('lastName')?.value || '',
    email: this.editCustomerCard.get('email')?.value || '',
    phone: this.editCustomerCard.get('phone')?.value || '',
    streetAddress: this.editCustomerCard.get('streetAddress') || '',
    city: this.editCustomerCard.get('city') || '',
    state: this.editCustomerCard.get('state') || '',
    zipCode: this.editCustomerCard.get('zipCode') || '',
  }
}

goBack() {
  this.router.navigate(['/dashboard'])
}
}