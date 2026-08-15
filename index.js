import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
await connectDB();

const app= express();
const port=process.env.PORT || 3000;

app.use("/tasks", taskRoutes);

app.get("/", (req,res)=>{
    res.send("Hello, World!")}
);

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})