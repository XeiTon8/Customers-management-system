import * as mongodb from 'mongodb';
import { Customer } from './customer';
export interface Deal {
  title: string;
  progress?: "In Progress" | "Done" | "Canceled";
  address: {
    streetAddress: string,
    city: string,
    state: string,
    zipCode: number
  }
  appointmentDate: Date;
  roomArea: string;
  numberOfPeople: number;
  price: number;
  roomAccess?: string;
  notes?: string;
  roomImg?: string;
  _id?: mongodb.ObjectId;
  customer: Customer;
}
