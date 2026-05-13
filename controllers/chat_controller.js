
import Chat from "../models/chat_model.js";
import { sendMessage } from "../services/ai_service.js";

// 💬 Send message to AI + save chat
export const sendMessageToAI = async (req, res) => {
    try {

        const { message, user_profile, recommendations } = req.body;

        if (!message || message.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        if (!req.user?.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user.id;

        // 🤖 call AI with FULL BODY (important)
        const aiResponse = await sendMessage({
            message,
            user_profile,
            recommendations
        });

        if (!aiResponse) {
            return res.status(502).json({
                success: false,
                message: "AI service failed"
            });
        }

        // 📌 correct field from Swagger
        const aiReply = typeof aiResponse?.response === "string"
            ? aiResponse.response
            : JSON.stringify(aiResponse?.response || "No response");

        // 💾 save to DB
        const chat = await Chat.create({
            userId,
            message,
            response: aiReply
        });

        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: {
                userMessage: message,
                aiReply
            }
        });

    } catch (error) {
        console.log("Chat Error:", error);

        res.status(500).json({
            success: false,
            message: "Chat Server Error"
        });
    }
};

// # 📥 Get chat history

export const getChatHistory = async (req, res) => {
    try {

        if (!req.user?.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user.id;

        const chats = await Chat.find({ userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: chats
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch chat history"
        });
    }
};
