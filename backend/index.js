import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
await connectDB();

const app= express();
const port=process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req,res)=>{
    res.send("Hello, World!")}
);


app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})