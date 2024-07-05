import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js';


const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log("dB connection success..");
    }
    catch (error) {
        console.log("Err: MongoDb connection error", error.message);
        process.exit(1);

    }
}


export default connectDB;