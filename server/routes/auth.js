import { Router } from "express";
import jwt from "jsonwebtoken";
import { checkAdminCredentials } from "../middleware/auth.js";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Username va parol kerak" });
  }

  if (!checkAdminCredentials(username, password)) {
    return res.status(401).json({ error: "Login yoki parol xato" });
  }

  const token = jwt.sign({ sub: "admin" }, process.env.JWT_SECRET || "dev-secret", {
    expiresIn: "7d",
  });

  res.json({ token });
});

export default router;
