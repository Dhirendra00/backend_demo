import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async() => {

    try {

       const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`Database connected to server !! DBHost : ${connectioninstance.connection.host}`)
        // console.log(connectioninstance)
        
    } catch (error) {
        console.log("Database Connection Failed !!", error);
        process.exit(1)
    }
}

export default connectDB;

