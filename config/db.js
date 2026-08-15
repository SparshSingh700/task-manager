import mongoose from "mongoose";

const connectDB= async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to the database");
    }
    catch(error){
        console.error("Connection to the database failed");
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;