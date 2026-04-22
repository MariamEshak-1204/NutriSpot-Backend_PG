
import User from "../models/user_model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { connectToDB } from "../DB/mongoose.js";
dotenv.config();

// ---------------- Register ----------------
export const register = asyncHandler(async (req, res) => {
    await connectToDB()
    const { userName, email, password, profileImage, role } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
        profileImage,
        role,
        provider: "local"
    });

    res.status(201).json({
        message: "User registered successfully",
        user: newUser
    });
});

// ---------------- Login ----------------
export const login = asyncHandler(async (req, res) => {
    await connectToDB()
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // لو مستخدم Google → ما ينفعش يدخل بالباسورد
    if (user.provider === "google") {
        return res.status(400).json({ message: "Please login with Google" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
        message: "Login successful",
        token,
        user
    });
});

// ---------------- Get All Users ----------------
export const getAllUsers = asyncHandler(async (req, res) => {
    await connectToDB()
    const users = await User.find({});
    res.status(200).json(users);
});


// --------------- Google Login -------------------

import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;  // جاى من Postman

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        // تحقق من الـ token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, picture, sub } = payload; // sub = Google unique ID

        let user = await User.findOne({ email });

               if (user) {
            // المستخدم موجود → ممكن كان مسجل عادي
            if (user.provider !== "google") {
                user.provider = "google";
                user.googleId = sub;
                if (!user.profileImage) user.profileImage = picture;
                await user.save();
            }
        } else {
            // المستخدم جديد → إنشاء
            user = await User.create({
                userName: name,
                email,
                // password: undefined,
                profileImage: picture,
                provider: "google",
                googleId: sub
            });
            console.log("New Google user created:", user);
        }

        // إنشاء JWT
        const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.json({
            message: "Login with Google successful",
            token: userToken,
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Google login failed" });
    }
};

// --------------------- Facebook login -----------------------

import axios from "axios";

export const facebookLogin = async (req, res) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ message: "Access token is required" });
    }

    const fbResponse = await axios.get(
      "https://graph.facebook.com/me",
      {
        params: {
          fields: "id,name,email",
          access_token: accessToken,
        },
      }
    );

    const { id, name, email } = fbResponse.data;

    let user = await User.findOne({ facebookId: id });

    if (!user) {
      user = await User.create({
        name,
        email,
        facebookId: id,
        provider: "facebook",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Facebook login success",
      token,
      user,
    });

  } catch (error) {
    res.status(401).json({ message: "Invalid Facebook token" });
  }
};

