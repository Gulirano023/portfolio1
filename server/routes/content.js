import { Router } from "express";
import { getDb, saveDb, newId } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const COLLECTIONS = {
  projects: {
    fields: ["title_uz", "title_ru", "description_uz", "description_ru", "tech", "demo", "github"],
    prefix: "proj",
  },
  certificates: {
    fields: ["title", "provider", "date", "link"],
    prefix: "cert",
  },
  skills: {
    fields: ["name", "level", "icon"],
    prefix: "skill",
  },
};

function normalize(collection, body, existing) {
  const config = COLLECTIONS[collection];
  const item = existing ? { ...existing } : { id: newId(config.prefix) };

  for (const field of config.fields) {
    if (body[field] === undefined) continue;

    if (field === "tech") {
      item.tech = Array.isArray(body[field])
        ? body[field].map((t) => String(t).trim()).filter(Boolean)
        : String(body[field])
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
      continue;
    }

    if (field === "level") {
      const level = Number(body[field]);
      if (!Number.isFinite(level) || level < 0 || level > 100) {
        throw new Error("Level 0-100 orasida bo'lishi kerak");
      }
      item.level = Math.round(level);
      continue;
    }

    item[field] = String(body[field]).trim();
  }

  return item;
}

router.get("/:collection", (req, res) => {
  const { collection } = req.params;

  if (!COLLECTIONS[collection]) {
    return res.status(404).json({ error: "Topilmadi" });
  }

  res.json(getDb()[collection]);
});

router.post("/:collection", requireAuth, (req, res) => {
  const { collection } = req.params;
  const config = COLLECTIONS[collection];

  if (!config) return res.status(404).json({ error: "Topilmadi" });

  try {
    const db = getDb();
    const item = normalize(collection, req.body || {});
    db[collection].push(item);
    saveDb();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:collection/:id", requireAuth, (req, res) => {
  const { collection, id } = req.params;

  if (!COLLECTIONS[collection]) return res.status(404).json({ error: "Topilmadi" });

  const db = getDb();
  const existing = db[collection].find((item) => item.id === id);

  if (!existing) return res.status(404).json({ error: "Element topilmadi" });

  try {
    const updated = normalize(collection, req.body || {}, existing);
    db[collection] = db[collection].map((item) => (item.id === id ? updated : item));
    saveDb();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:collection/:id", requireAuth, (req, res) => {
  const { collection, id } = req.params;

  if (!COLLECTIONS[collection]) return res.status(404).json({ error: "Topilmadi" });

  const db = getDb();
  const before = db[collection].length;
  db[collection] = db[collection].filter((item) => item.id !== id);

  if (db[collection].length === before) {
    return res.status(404).json({ error: "Element topilmadi" });
  }

  saveDb();
  res.status(204).end();
});

export default router;
