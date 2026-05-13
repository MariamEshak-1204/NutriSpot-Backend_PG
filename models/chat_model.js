
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    role: { 
      type: String,
      enum: ["user", "ai"] },

    message: {
        type: String,
        required: true
    },

    response: {
        type: String
    }

}, {
    timestamps: true
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;

