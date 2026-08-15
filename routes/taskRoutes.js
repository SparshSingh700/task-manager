import {Router} from "express";
const router= Router();

router.get("/", (req, res)=>{
    res.json([
        {
            title: "Task 1",
            description: "This is task 1"
        }
    ]);
});

router.post("/", (req, res)=>{
    res.json({
        message: "Task created"
    });
});

export default router;