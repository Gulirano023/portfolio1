import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDb } from "../db.js";

const SECRET = () => process.env.JWT_SECRET || "dev-secret";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, SECRET());
    if (payload.sub !== "admin") throw new Error("bad subject");
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export function checkAdminCredentials(username, password) {
  const admin = getDb().admin;
  if (!admin || username !== admin.username) return false;
  return bcrypt.compareSync(password, admin.passwordHash);
}

export function signStudent(email) {
  return jwt.sign({ sub: `ts:${email}` }, SECRET(), { expiresIn: "30d" });
}

export function requireStudent(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, SECRET());
    if (typeof payload.sub !== "string" || !payload.sub.startsWith("ts:")) {
      throw new Error("bad subject");
    }
    const email = payload.sub.slice(3).toLowerCase();
    const student = getDb().students[email];
    if (!student) throw new Error("no student");
    req.student = student;
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
