import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/api/chat", async (req, res) => {
  console.log("POST /api/chat called");
  if (!process.env.OLLAMA_API_KEY) {
    console.error("Missing OLLAMA_API_KEY");
  }
  try {
    const response = await fetch("https://ollama.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    res.setHeader("Content-Type", "application/x-ndjson");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    if (!response.body) {
      return res.status(500).json({ error: "No response body from Ollama" });
    }

    const reader = response.body.getReader();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }

    res.end();
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
