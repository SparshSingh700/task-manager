import {Router} from "express";
const router= Router();

router.get("/tasks", (req, res)=>{
    res.json([
        {
            title: "Task 1",
            description: "This is task 1"
        }
    ]);
});

router.post("/tasks", (req, res)=>{
    res.json({
        message: "Task created"
    });
});

export default router;