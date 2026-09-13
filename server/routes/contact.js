import { Router } from "express";
import nodemailer from "nodemailer";
import { getDb, saveDb, newId } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const hits = new Map();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function makeTransport() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

router.post("/contact", async (req, res) => {
  if (isRateLimited(req.ip)) {
    return res.status(429).json({ error: "Juda ko'p urinish. Keyinroq qayta urinib ko'ring." });
  }

  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" });
  }
  if (name.length > 100 || email.length > 255 || message.length > 1000) {
    return res.status(400).json({ error: "Xabar hajmi juda katta" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Email formati xato" });
  }

  const db = getDb();
  db.messages.unshift({
    id: newId("msg"),
    name,
    email,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  });
  saveDb();

  const transport = makeTransport();
  if (transport && process.env.MAIL_TO) {
    try {
      await transport.sendMail({
        from: `"Portfolio" <${process.env.SMTP_USER}>`,
        to: process.env.MAIL_TO,
        replyTo: email,
        subject: `Yangi xabar: ${name}`,
        text: `${message}\n\n— ${name} (${email})`,
      });
    } catch (err) {
      console.error("Email yuborishda xato:", err.message);
    }
  }

  res.status(201).json({ ok: true });
});

router.get("/messages", requireAuth, (req, res) => {
  res.json(getDb().messages);
});

router.patch("/messages/:id", requireAuth, (req, res) => {
  const db = getDb();
  const msg = db.messages.find((m) => m.id === req.params.id);

  if (!msg) return res.status(404).json({ error: "Xabar topilmadi" });

  msg.read = typeof req.body?.read === "boolean" ? req.body.read : true;
  saveDb();
  res.json(msg);
});

router.delete("/messages/:id", requireAuth, (req, res) => {
  const db = getDb();
  const before = db.messages.length;
  db.messages = db.messages.filter((m) => m.id !== req.params.id);

  if (db.messages.length === before) {
    return res.status(404).json({ error: "Xabar topilmadi" });
  }

  saveDb();
  res.status(204).end();
});

export default router;
