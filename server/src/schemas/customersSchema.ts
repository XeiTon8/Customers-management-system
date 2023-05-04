import * as mongodb from 'mongodb';

export async function customersSchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ['firstName'],
            additionalProperties: true,
            properties: {
                _id: {},
                firstName: { bsonType: ["string", "null"] },
                avatarUrl: { bsonType: ["string", "null"] },
                lastName: { bsonType: ["string", "null"] },
                email: { bsonType: ["string", "null"] },
                phone: { bsonType: ["string", "null"] },
                address: {
                    bsonType: "object",
                    additionalProperties: true,
                    properties: {
                        streetAddress: { bsonType: ["string", "null"] },
                        city: { bsonType: ["string", "null"] },
                        state: { bsonType: ["string", "null"] },
                        zipCode: { bsonType: ["string", "null"] }
                    }
                },
                dateCreated: {bsonType: ["string", "null"]},
                dateUpdated: {bsonType: ["string", "null"]},
            }
        }
    }

    await db.command({
        collMod: "customers",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("customers", {validator: jsonSchema});
        }
    });
 }