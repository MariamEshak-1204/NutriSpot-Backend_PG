import mongoose from "mongoose";

export const connectToDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("Connected to DB");
  } catch (err) {
    console.error("DB Error:", err);
    throw err;
  }
};