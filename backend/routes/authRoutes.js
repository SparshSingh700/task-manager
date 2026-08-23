import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import User from "../models/User.js";

const router= Router();

router.post("/register", async(req, res)=>{
    try{
        const {name, email, password}= req.body;

        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            });
        }

        const hashedPassword= await bcrypt.hash(password, 10);
        const user= new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        res.status(201).json({
            message:"User resgistered successfully",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }    
});

router.post("/login", async(req, res)=>{
    try{
        const {email, password}= req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid email or password"
            });
        }

        const passwordMatch= await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const token= jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful",
            token
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})

export default router;