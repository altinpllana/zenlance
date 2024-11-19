import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const API_KEY = "glhf_e1673ab072840b074981068d0ea9706a"; // Store securely in production

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, model } = req.body;

    const response = await fetch(
      "https://glhf.chat/api/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: model || "hf:meta-llama/Llama-2-7b-chat",
          messages,
        }),
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error proxying request:", error);
    res.status(500).json({ error: "Failed to process the request" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
