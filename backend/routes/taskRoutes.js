import {Router} from "express";
import Task from "../models/Task.js"
const router= Router();

router.get("/", async (req, res)=>{
    try{
        const tasks= await Task.find({
            user: req.user.userId
        });
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
            title: req.body.title,
            user: req.user.userId
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

router.put("/:id", async(req, res)=>{
    try{
        const {title, completed}= req.body;
        const task= await Task.findOne({
            _id: req.params.id,
            user: req.user.userId
        })
        if(!task){
            return res.status(404).json({
                message:"Task not found"
            });
        }
        if(completed !== undefined){
            task.completed= completed;
        }
        if(title !== undefined){
            task.title= title;
        }
        await task.save();
        res.json(task);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
})

router.delete("/:id", async(req, res)=>{
    try{
        const task= await Task.findOne({
            _id: req.params.id,
            user:req.user.userId
        })
        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }
        await task.deleteOne();
        res.json({
            message:"Task deleted successfully"
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
})

export default router;