import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import BlacklistToken from "../models/blacklistToken_model.js";
import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary.js";


// -------------------- PROFILE SETUP / UPDATE / ProfileImage --------------------
export const profileSetup = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    
    const allowedFields = [
        "userName", "email", "gender", "age", "height", "weight",
        "mealsPerDay", "allergies", "goal", "healthCondition",
        "healthNotes", "activityLevel", "dietType", "calories",
        "proteins", "carbs", "fats"
    ];

    allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            user[field] = req.body[field];
        }
    });

    
    const requiredFields = ["userName", "email", "gender", "age"];
    user.profileCompleted = requiredFields.every(f => !!user[f]);

    
    const updatedUser = await user.save();

    res.status(200).json({
        status: "success",
        message: user.profileCompleted
            ? "Profile setup / update completed successfully"
            : "Profile updated successfully (incomplete)",
        user: updatedUser
    });
});
// -------------------------updateProfileWithImage-------------------------
export const updateProfileWithImage = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

   
    if (req.body.userName) {
        user.userName = req.body.userName;
    }

    
    if (req.file) {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "profile" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            stream.end(req.file.buffer);
        });

        user.profileImage = result.secure_url;
    }

    await user.save();

    res.status(200).json({
        status: "success",
        userName: user.userName,
        profileImage: user.profileImage
    });
});

// -------------------- GET PROFILE --------------------
export const getProfile = async (req, res) => {
    try {
        const userId = req.user._id; 
        const user = await User.findById(userId).select("-password"); 
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// -------------------- CHANGE PASSWORD --------------------
export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { lastPassword, newPassword, confirmPassword } = req.body;

        // 1️⃣ Check required fields
        if (!lastPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2️⃣ Password strength check
        if (newPassword.length < 9) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        // 3️⃣ Confirm password
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // 4️⃣ Get user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // 5️⃣ Check old password
        const isMatch = await bcrypt.compare(lastPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Last password is incorrect" });
        }

        // 6️⃣ Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ message: "Password changed successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// -------------------- DELETE ACCOUNT --------------------
export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// -------------------- SIGN OUT --------------------



export const signOut = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            
            const decoded = jwt.decode(token);
            await BlacklistToken.create({
                token,
                expiresAt: new Date(decoded.exp * 1000) 
            });
        }

        return res.status(200).json({
            success: true,
            message: "Signed out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error during sign out",
            error: error.message
        });
    }
};

