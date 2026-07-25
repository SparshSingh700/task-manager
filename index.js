import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
const app= express();
const port=3000;

app.use(taskRoutes);

app.get("/", (req,res)=>{
    res.send("Hello, World!")}
);

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})