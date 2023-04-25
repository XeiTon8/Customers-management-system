import * as express from 'express';
import * as mongodb from 'mongodb';
import { collections } from '../../database';

export const customersRouter = express.Router();
customersRouter.use(express.json());

// GET ALL (READ)
customersRouter.get("/", async (_req, res) => {
    try {
        const customers = await collections.customers.find({}).toArray();
        res.status(200).send(customers)
    } catch(error) {
        res.status(500).send(error.message);
    }
})

// GET CUSTOMER BY ID 
customersRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = {_id: new mongodb.ObjectId(id)};
        const customer = await collections.customers.findOne(query);
        if (customer) {
            res.status(200).send(customer);
        } else {
            res.status(404).send(`Failed to find a customer with ID: ${id}`)
        }
    } catch(error) {
        res.status(404).send(error.message);
    }
})

// POST (CREATE)
customersRouter.post("/", async (req, res) => {
    try {
        const customer = req.body;
       
        const result = await collections.customers.insertOne(customer)
        
        if (result.acknowledged) {
            const createdCustomer = await collections.customers.findOne({_id: result.insertedId})
            res.status(201).json(createdCustomer);
        } else {
            res.status(500).send("Failed to add a customer.")
            console.log(result)
           
        }
    } catch(error) {
        console.error(error);
        res.status(400).send(error.message);
    }
})


//UPDATE 
customersRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const customer = req.body;
         console.log(customer)
        const query = {_id: new mongodb.ObjectId(id)}
        const result = await collections.customers.updateOne(query, {$set: customer});

        if (result && result.acknowledged) {
            res.status(200).json({message: 'Updated a customer'})
        } else if (!result.matchedCount) {
            res.status(404).json({message: 'Failed to find a customer'})
        } else {
            res.status(304).json({message: 'Failed to update a customer'})
        }

    } catch(error) {
        console.error(error)
        res.status(400).send(error.message)
    }

})


// DELETE
customersRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.customers.deleteOne(query);
        if (result && result.acknowledged) {
            res.status(202).json({message: 'Removed a customer'})
        } else if (!result) {
            res.status(400).json({message: 'Failed to remove a customer'})
        } else if (!result.deletedCount) {
            res.status(404).json({message: 'Failed to find a customer'})
        }
    } catch(error) {
        console.error(error.message);
        res.status(400).json(error.message)
    }
})
