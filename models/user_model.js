import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    // Login & Register Data
    
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
        required: false,
    },
    profileImage: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    googleId: {
        type: String,
    },
    facebookId: {
        type: String,
    },
    provider: {
        type: String,
        enum: ["local", "google", "facebook"],
        default: "local",
    },

    // Profile Setup Data

    gender: {
        type: String,
        enum: ["male", "female"],
    },

    age: {
        type: Number,
    },

    height: {
        type: Number, // cm
    },

    weight: {
        type: Number, // kg
    },

    mealsPerDay: {
        type: Number,
        enum: [2, 3],
    },

    allergies: [{
        type: String,
        enum: ["Diabetes", "Lactose", "Gluten", "Nuts", "None"],
    }],

    goal: {
        type: String,
        enum: [
            "Lose weight",
            "Gain weight",
            "Improve health",
            "Maintain weight",
            "Build muscle"
        ],
    },

    // sleepingQuality: {
    //     type: String,
    //     enum: ["Excellent", "Good", "Fair", "Poor"],
    // },

    healthNotes: {
        type: String,
        trim: true,
    },

    activityLevel: {
        type: String,
        enum: ["Sedentary", "Light", "Moderate", "High"],
    },

    dietType: {
        type: String,
        enum: ["High protein", "Vegan", "Low carb", "Keto"],
    },

    calories: {
        type: Number,
    },

    proteins: {
        type: Number,
    },

    carbs: {
        type: Number,
    },

    fats: {
        type: Number,
    },

     profileCompleted: {
        type: Boolean,
        enum: [true, false],
        default: false,
    },

    // Favorites Section
    
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
        }
    ],

}, {
    timestamps: true,
    collection: "User"
});

const User = mongoose.model("User", userSchema);

export default User;
