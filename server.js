import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { loadModel, completion } from "@qvac/sdk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

// QVAC SDK API Call (Required ng reviewer)
app.get("/api/research", async (req, res) => {
  try {
    // 1. Requirement: loadModel
    await loadModel("default");

    // 2. Requirement: completion
    const result = await completion({
      prompt: "Summarize research data",
    });

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`QVAC Mini Research Desk running on port ${PORT}`);
});
