import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { initDb } from "./db.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import contentRoutes from "./routes/content.js";
import teenskillRoutes from "./routes/teenskill.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

initDb();

app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.use("/api/ts", teenskillRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes);
app.use("/api", contentRoutes);

const distDir = path.join(__dirname, "..", "dist");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(distDir, "index.html"));
    }
    next();
  });
}

app.use("/api", (req, res) => res.status(404).json({ error: "Topilmadi" }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server xatosi" });
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`API server http://localhost:${PORT} da ishlayapti`);
});
