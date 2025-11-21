// server.js
const express = require("express");
const morgan = require("morgan");

const app = express();

// use JSON body parsing
app.use(express.json());
// simple request logging
app.use(morgan("dev"));

// health check
app.get("/healthz", (req, res) => res.status(200).json({ ok: true }));

// example GET
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello — your Render API is working!" });
});

// example POST
app.post("/api/users", (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "Please provide name" });
  // In-memory mock response (no DB)
  res.status(201).json({ id: Date.now(), name });
});

// fallback
app.use((req, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
