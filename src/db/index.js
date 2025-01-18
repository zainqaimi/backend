import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MONGODB: Connected !!  to host: ${connectionInstance.Connection.host}`)
    } catch (error) {
        console.error(`Failed connecting to MongoDB: ${error}`);
        process.exit(1);
    }
}

export default connectDB;