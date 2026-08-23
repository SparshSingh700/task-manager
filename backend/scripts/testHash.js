import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";

dotenv.config();

const password= "password123";
const hashedPassword= await bcrypt.hash(password,10);
await mongoose.connect(process.env.MONGODB_URI);

const user= new User({
    email: "sparshsingh700721@gmail.com",
    password: hashedPassword
});

await user.save();

console.log("User saved successfully");
console.log("Hashed password:", hashedPassword);

await mongoose.disconnect();