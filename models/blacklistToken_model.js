// ملف: models/blacklistToken_model.js
import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }, // اختياري: وقت انتهاء صلاحية التوكن
}, { timestamps: true });

const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);

export default BlacklistToken;