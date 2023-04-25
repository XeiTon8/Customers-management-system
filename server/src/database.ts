import * as mongodb from 'mongodb';
import { Customer } from './types/customer';
import { customersSchemaValidation } from './schemas/customersSchema';

export const collections: {
    customers?: mongodb.Collection<Customer>
} = {};

export async function connectToDB(uri: string) {
const client = new mongodb.MongoClient(uri)
await client.connect();

const db = client.db("CRM");


const customersCollection = db.collection<Customer>("customers");
collections.customers = customersCollection;

await customersSchemaValidation(db);

}