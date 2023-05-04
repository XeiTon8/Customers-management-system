import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Customer } from 'src/app/features/models/ICustomer';
import { Store } from '@ngrx/store';
import { toggleAddNewForm } from '../../store/actions/forms/forms.actions';
import { ClosePopupButtonComponent } from '../close-popup-button/close-popup-button.component';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.scss']
})
export class AddNewCustomerComponent implements OnInit {

@Input() initialState: BehaviorSubject<Customer> = new BehaviorSubject<Customer>(
{ _id: '', firstName: '', lastName: '', email: '', phone: null, address: { streetAddress: '', city: '', state: '', zipCode: null }, dateCreated: null, dateUpdated: null})

@Output() formsValueChanged = new EventEmitter<Customer>()

@Output() formSubmitted = new EventEmitter<Customer>()

customersForm: FormGroup = new FormGroup({})

constructor(private fb: FormBuilder, private store: Store, private closePopup: ClosePopupButtonComponent) {}

  ngOnInit() {
    this.customersForm = this.fb.group({
      avatar: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: this.fb.group({
        streetAddress: ['' || null, [Validators.required]],
        city: ['' || null, [Validators.required]],
        state: ['' || null, [Validators.required]],
        zipCode: ['' || null, [Validators.required]]
      }),
      dateCreated: [null],
      dateUpdated: [null]
    })

  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.customersForm.patchValue({
          avatarUrl: reader.result
         
        });
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
   
   
    if (this.customersForm.valid) {
      const currentDate = new Date();
      this.customersForm.get('dateCreated')?.setValue(currentDate);
      const customer: Customer = this.customersForm.value;
      this.formSubmitted.emit(customer);
      this.customersForm.reset();
    }
    this.store.dispatch(toggleAddNewForm({elClass: "popup-choose__close-button"}))
 
  }

  cancelForm() {
    this.closePopup.closeForm()
  }
}
