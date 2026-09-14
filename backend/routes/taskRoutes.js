import {Router} from "express";
import Task from "../models/Task.js"
const router= Router();

router.get("/", async (req, res)=>{
    try{
        const page= Math.max(parseInt(req.query.page) || 1, 1);
        const limit= Math.min(Math.max(parseInt(req.query.limit)|| 5 , 1),50);
        const status= req.query.status || "all";

        const filter= {
            user: req.user.userId
        };
        if(status=== "completed"){
            filter.completed=true;
        }
        if(status=== "active"){
            filter.completed=false;
        }
        const total= await Task.countDocuments(filter);
        const tasks=await Task.find(filter)
                    .skip((page-1)*limit)
                    .limit(limit)

        res.json({
            tasks,
            pagination:{
                page, 
                limit,
                total,
                totalPages: Math.max(Math.ceil(total / limit), 1)
            }
        })
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