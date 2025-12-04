import User from "../models/user_model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()



//  Register
export const register = asyncHandler(async (req, res) => {
    
    const { userName, email, password, profileImage, role } = req.body;

    // 1. Check if email exists
    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
        profileImage,
        role
    });

    // 4. Return success
    res.status(201).json({
        message: "User registered successfully",
        user: newUser
    });
});

// login

export const login = asyncHandler( async (req , res) =>{

    const {email , password} = req.body

     // 1. Check if match email
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    // 2. Match hash password
    const isMatch = await bcrypt.compare(password , user.password)
    if(!isMatch){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    // 3. Create user token
    const token = jwt.sign({ id : user._id , role : user.role } , process.env.JWT_SECRET , {expiresIn : "7d"})

    // 4. Return success
    res.status(200).json({
        message : "Login successful" ,
        token , 
        user
    })

})  

// getAllUsers

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});