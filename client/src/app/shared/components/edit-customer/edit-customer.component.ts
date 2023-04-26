import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPopupsService } from 'src/app/services/confirm-popups.service';

// Types
import { Customer } from 'src/app/features/models/ICustomer';

// ngRx
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { selectCustomerById } from 'src/app/store/customers/selectors/customers.selector';
import { updateCustomer, deleteCustomer, toggleIsEditCustomerOpened } from 'src/app/store/customers/actions/customers.actions';

// rxJs
import { Observable, lastValueFrom, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customer$: Observable<Customer> = new Observable<Customer>()
  customersForm: FormGroup = new FormGroup({})

  constructor(
    private store: Store<AppState>, 
    private route: ActivatedRoute, 
    private customersService: CustomersService,
    private fb: FormBuilder,
    private router: Router,
    private popupsService: ConfirmPopupsService
    ) {}

    editCustomerForm = this.fb.group({ firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    address: this.fb.group({
      streetAddress: [''],
      city: [''],
      state: [''],
      zipCode: ['']
    })
  })

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        const id = params['id'];
        if (id) {
          return this.customersService.getCustomer(id);
        } else {
          return of(null)
        }
      })
    ).subscribe((customer) => {
      if (!customer) {
        this.router.navigate(['/not-found'])
        return;
        }

      const initialCustomer = this.store.pipe(select(selectCustomerById(customer._id)));
    
      this.editCustomerForm.patchValue({...initialCustomer, ...customer});
    });
  }

  async updateCustomer() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    const customer = this.getFormValue();
    await lastValueFrom(this.customersService.updateCustomer(id, customer));
    
      this.customersService.getCustomer(id).subscribe((updatedCustomer => {
      this.store.dispatch(updateCustomer({id, updatedCustomer}))
    }))
   
    this.store.dispatch(toggleIsEditCustomerOpened())
    this.popupsService.setCustomerCreated(true);
    this.router.navigate(['/dashboard']);
  }
  
  getFormValue(): Customer {
    return {
      _id: "",
      firstName: this.editCustomerForm.get('firstName')?.value || '',
      lastName: this.editCustomerForm.get('lastName')?.value || '',
      email: this.editCustomerForm.get('email')?.value || '',
      phone: this.editCustomerForm.get('phone')?.value || '',
      address: {
        streetAddress: this.editCustomerForm.get('address.streetAddress')?.value || '',
        city: this.editCustomerForm.get('address.city')?.value || '',
        state: this.editCustomerForm.get('address.state')?.value || '',
        zipCode: this.editCustomerForm.get('address.zipCode')?.value || ''
      }
    };
  }



}
