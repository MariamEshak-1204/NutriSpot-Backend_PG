import axios from "axios";

// 🍽️ Meal Recommendations

export const recommendMeals = async (userData) => {
    try {

        const response = await axios.put(
            process.env.AI_URL,
            userData
        );
        console.log("AI_URL =", process.env.AI_URL);

        return response.data;

    } catch (error) {
        console.log("========== AI ERROR ==========");
        console.log(error.response?.status);
        console.log(error.response?.data);

        // رجعي الـ Error الأصلي كما هو
        throw error;
    }
};

// # 💬 Chat with AI (NEW)

export const sendMessage = async (payload) => {
    try {
        const response = await axios.put(
            process.env.AI_CHAT_URL,
            payload
        );

        return response.data;

    } catch (error) {
        console.log(error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};