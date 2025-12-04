import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
    },
    profileImage: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
}, {
    timestamps: true,
    collection: "User"
});

const User = mongoose.model("User", userSchema);

export default User;
