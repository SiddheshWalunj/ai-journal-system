import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import db from "./db.js";
import cache from "./cache.js";
import { analyzeEmotionAndAmbience } from "./llm.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 5000;

app.post("/api/journal", async (req, res) => {
  try {
    const { userId, text, analysis } = req.body;

    if (!userId) {
      return res.status(400).json({
        error: "userId is required"
      });
    }

    if (!analysis) {
      return res.status(400).json({
        error: "Analysis must be performed before saving"
      });
    }

    if (!text || text.trim().length < 3) {
      return res.status(400).json({
        error: "Journal text must be at least 3 characters"
      });
    }

    // const analysis = await analyzeEmotionAndAmbience(text);

    db.run(
      `INSERT INTO journal 
      (userId,text,ambience,emotion,keywords,summary)
      VALUES (?,?,?,?,?,?)`,
      [
        userId,
        text,
        analysis.ambience,
        analysis.emotion,
        JSON.stringify(analysis.keywords),
        analysis.summary
      ],
      function (err) {
        if (err) return res.status(500).json(err);

        res.json({
          id: this.lastID,
          analysis
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analysis failed" });
  }
});

app.get("/api/journal/all", (req, res) => {
  db.all(
    "SELECT * FROM journal ORDER BY createdAt DESC",
    [],
    (err, rows) => {
      if (err) return res.status(500).json(err);

      res.json(rows);
    }
  );
});

app.post("/api/journal/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    if (cache.has(text)) {
      return res.json(cache.get(text));
    }

    const result = await analyzeEmotionAndAmbience(text);

    cache.set(text, result);

    res.json(result);
  } catch {
    res.status(500).json({ error: "Analysis failed" });
  }
});

app.get("/api/journal/insights", (req, res) => {

  db.all("SELECT * FROM journal", [], (err, rows) => {
    if (err) return res.status(500).json(err);

    if (rows.length === 0) {
      return res.json({
        totalEntries: 0,
        topEmotion: null,
        mostUsedAmbience: null,
        recentKeywords: []
      });
    }

    const totalEntries = rows.length;

    const emotionCount = {};
    const ambienceCount = {};
    const keywordCount = {};

    rows.forEach(r => {
      // emotion count
      emotionCount[r.emotion] = (emotionCount[r.emotion] || 0) + 1;

      // ambience count
      ambienceCount[r.ambience] = (ambienceCount[r.ambience] || 0) + 1;

      // keywords
      const keywords = JSON.parse(r.keywords || "[]");

      keywords.forEach(k => {
        keywordCount[k] = (keywordCount[k] || 0) + 1;
      });
    });

    const topEmotion =
      Object.keys(emotionCount).sort(
        (a, b) => emotionCount[b] - emotionCount[a]
      )[0];

    const mostUsedAmbience =
      Object.keys(ambienceCount).sort(
        (a, b) => ambienceCount[b] - ambienceCount[a]
      )[0];

    const recentKeywords = Object.keys(keywordCount)
      .sort((a, b) => keywordCount[b] - keywordCount[a])
      .slice(0, 5);

    res.json({
      totalEntries,
      topEmotion,
      mostUsedAmbience,
      recentKeywords
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});