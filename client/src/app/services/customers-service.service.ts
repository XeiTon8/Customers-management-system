import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject, tap, map} from 'rxjs';
import { Customer } from '../features/models/ICustomer';
import { Store, select } from '@ngrx/store';
import { addCustomer, getCustomers, getCustomersSuccess } from '../store/customers/actions/customers.actions';
import { selectCustomers } from '../store/customers/selectors/customers.selector';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private url  = "http://localhost:5200";

 
  customers$: Observable<Customer[]> = new Observable();
  customer: Observable<Customer> = new Observable();

  constructor(private httpClient: HttpClient, private store: Store) { }

  private refreshCustomers() {
    const observer = {
      next: (customers: Customer[]) => {
        this.store.dispatch(getCustomersSuccess({customers}));
      },
      error: (error: any) => {
        console.error('Error fetching customers:', error);
      },
      complete: () => {
        console.log('Completed fetching customers');
      }
    };
  
    this.httpClient.get<Customer[]>(`${this.url}/customers`).subscribe(observer);
  }

  getCustomers(): Observable<Customer[]> {
    this.refreshCustomers();
    return this.customers$;
  }

  getCustomer(id: string): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.url}/customers/${id}`)
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.url}/customers`, customer, {responseType: "json"});
  }

  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    const { _id, ...update } = customer;
    return this.httpClient.put<Customer>(`${this.url}/customers/${id}`, update, {responseType: "json"})
  }

  deleteCustomer(id: string): Observable<Customer> {
    return this.httpClient.delete<Customer>(`${this.url}/customers/${id}`, {responseType: "json"})
  }


}
