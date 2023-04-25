import * as mongodb from 'mongodb';

export interface Customer {
    avatarUrl?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: number;
    address?: {
        streetAddress?: string,
        city?: string,
        state?: string,
        zipCode?: number
    };
    _id?: mongodb.ObjectId;
}