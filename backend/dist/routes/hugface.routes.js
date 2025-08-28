"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const router = express_1.default.Router();
const HF_API_KEY = process.env.HF_API_KEY;
router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body;
        console.log(req.body);
        if (!HF_API_KEY) {
            return res.status(500).json({ message: "HF_API_KEY is not configured" });
        }
        const url = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";
        const hfResponse = await axios_1.default.post(url, { inputs: prompt }, {
            headers: {
                Authorization: `Bearer ${HF_API_KEY}`,
                Accept: "image/png",
                "Content-Type": "application/json",
            },
            responseType: "arraybuffer",
            validateStatus: () => true,
        });
        if (hfResponse.status < 200 || hfResponse.status >= 300) {
            const fallbackMessage = "Failed to generate image via Hugging Face";
            try {
                const asText = Buffer.from(hfResponse.data).toString();
                return res.status(hfResponse.status).json({
                    message: asText || fallbackMessage,
                    error: "HUGGINGFACE_API_ERROR",
                });
            }
            catch (_) {
                return res
                    .status(hfResponse.status)
                    .json({ message: fallbackMessage, error: "HUGGINGFACE_API_ERROR" });
            }
        }
        const base64 = Buffer.from(hfResponse.data, "binary").toString("base64");
        console.log(base64);
        res.status(200).json({ photo: base64 });
    }
    catch (error) {
        console.error(error);
        // Handle specific billing errors
        if (error.status === 400 && error.message?.includes("billing")) {
            return res.status(400).json({
                message: "Billing limit reached. Please check your OpenAI account billing settings.",
                error: "BILLING_LIMIT_REACHED",
            });
        }
        // Handle other OpenAI API errors
        if (error.status) {
            return res.status(error.status).json({
                message: error.message || "OpenAI API error",
                error: "OPENAI_API_ERROR",
            });
        }
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = router;
