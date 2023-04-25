import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectToDB} from './database';
import {customersRouter} from './API/customers/customers.routes'


dotenv.config();

const {ATLAS_URI} = process.env;

if (!ATLAS_URI) {
    console.error("ATLAS_URI environment wasn't found in config.env");
    console.log('ATLAS_URI:', ATLAS_URI);
    process.exit();
}

connectToDB(ATLAS_URI).then(() => {
    const app = express();
    app.use(cors());
    app.use("/customers", customersRouter)

    app.listen(5200, () => {
        console.log("Server running at http://localhost:5200...");
    })
}).catch(error => {
    console.error(error)
    console.log('ATLAS_URI:', ATLAS_URI);
});
