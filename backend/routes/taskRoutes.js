import {Router} from "express";
import Task from "../models/Task.js"
const router= Router();

router.get("/", async (req, res)=>{
    try{
        const tasks= await Task.find();
        res.json(tasks);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

router.post("/", async (req, res)=>{
    try{
        const task= new Task({
            title: req.body.title
        })

        await task.save();
        console.log("Task created successfully");
        res.status(201).json(task)
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
    
});

export default router;