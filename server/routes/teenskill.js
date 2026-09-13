import { Router } from "express";
import bcrypt from "bcryptjs";
import { getDb, saveDb } from "../db.js";
import { requireStudent } from "../middleware/auth.js";

const router = Router();

const MAIN_SKILLS = ["HTML", "CSS", "JavaScript", "React", "Python", "Git & GitHub"];
const AVATAR_URL = (seed) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;

function studentKey(email) {
  return String(email || "").trim().toLowerCase();
}

export function findStudent(email) {
  return getDb().students[studentKey(email)] || null;
}

function levelFromPoints(points) {
  return points >= 5000 ? 10 : points >= 2000 ? 8 : points >= 1000 ? 6 : points >= 500 ? 3 : points >= 200 ? 2 : 1;
}

function publicUser(student) {
  const { _id, email } = student;
  return {
    id: _id,
    email,
    name: student.name || "",
    username: student.username || "",
    age: student.age || 13,
    mainSkill: MAIN_SKILLS.includes(student.mainSkill) ? student.mainSkill : "HTML",
    avatar: student.avatar || AVATAR_URL(student.username || "student"),
    bio: student.bio || "",
    level: typeof student.level === "number" && student.level > 0 ? student.level : levelFromPoints(student.points || 0),
    points: student.points || 0,
    joinedAt: student.joinedAt || new Date().toISOString().split("T")[0],
  };
}

function buildInitialState(user) {
  return {
    projects: [],
    activeChallenges: [],
    skillScores: [
      { skill: "HTML", score: 30, challengesCompleted: 0, projectsCompleted: 0, codeQuality: 0, problemSolving: 0, consistency: 0, level: "Beginner" },
      { skill: "CSS", score: 30, challengesCompleted: 0, projectsCompleted: 0, codeQuality: 0, problemSolving: 0, consistency: 0, level: "Beginner" },
      { skill: "JavaScript", score: 20, challengesCompleted: 0, projectsCompleted: 0, codeQuality: 0, problemSolving: 0, consistency: 0, level: "Beginner" },
      { skill: "React", score: 15, challengesCompleted: 0, projectsCompleted: 0, codeQuality: 0, problemSolving: 0, consistency: 0, level: "Beginner" },
      { skill: "Python", score: 15, challengesCompleted: 0, projectsCompleted: 0, codeQuality: 0, problemSolving: 0, consistency: 0, level: "Beginner" },
      { skill: "Git & GitHub", score: 20, challengesCompleted: 0, projectsCompleted: 0, codeQuality: 0, problemSolving: 0, consistency: 0, level: "Beginner" },
    ],
    achievements: [],
    certificates: [],
    settings: {
      theme: "dark",
      language: "en",
      notifications: {
        challengeReminders: true,
        feedbackNotifications: true,
        achievementNotifications: true,
      },
      profile: {
        name: user.name,
        username: user.username,
        bio: user.bio || "",
      },
    },
  };
}

router.post("/register", (req, res) => {
  const body = req.body || {};
  const name = String(body.name || "").trim().slice(0, 80);
  const username = String(body.username || "").trim().slice(0, 40);
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const age = Number(body.age) || 13;
  const mainSkill = String(body.mainSkill || "HTML");

  if (!name || !username || !email || !password) {
    return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Email formati xato" });
  }
  if (!/^[a-zA-Z0-9_]{3,40}$/.test(username)) {
    return res.status(400).json({ error: "Username 3-40 ta harf/raqam/underscore bo'lishi kerak" });
  }

  const db = getDb();
  const key = studentKey(email);
  if (db.students[key]) {
    return res.status(409).json({ error: "Bu email allaqachon ro'yxatdan o'tgan" });
  }
  const taken = Object.values(db.students).find((s) => s.username === username);
  if (taken) {
    return res.status(409).json({ error: "Bu username band" });
  }

  const student = {
    _id: `ts-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
    email: key,
    username,
    name,
    age,
    mainSkill,
    passwordHash: bcrypt.hashSync(password, 10),
    points: 0,
    level: 1,
    joinedAt: new Date().toISOString(),
    state: null,
  };
  db.students[key] = student;
  saveDb();

  const user = publicUser({ ...student, state: null });
  const token = signStudent(student.email);
  res.status(201).json({ token, user });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  const student = findStudent(email);

  if (!student || !bcrypt.compareSync(String(password || ""), student.passwordHash)) {
    return res.status(401).json({ error: "Login yoki parol xato" });
  }

  const token = signStudent(student.email);
  res.json({ token, user: publicUser(student) });
});

router.get("/state", requireStudent, (req, res) => {
  const student = req.student;
  const state = student.state || buildInitialState(publicUser(student));
  res.json({ user: publicUser(student), ...state });
});

router.put("/state", requireStudent, (req, res) => {
  const student = req.student;
  const body = req.body || {};

  const current = student.state || buildInitialState(publicUser(student));
  const merged = {
    projects: Array.isArray(body.projects) ? body.projects : current.projects,
    activeChallenges: Array.isArray(body.activeChallenges) ? body.activeChallenges : current.activeChallenges,
    skillScores: Array.isArray(body.skillScores) ? body.skillScores : current.skillScores,
    achievements: Array.isArray(body.achievements) ? body.achievements : current.achievements,
    certificates: Array.isArray(body.certificates) ? body.certificates : current.certificates,
    settings: body.settings && typeof body.settings === "object" ? { ...current.settings, ...body.settings } : current.settings,
  };

  student.state = merged;

  if (body.user && typeof body.user === "object") {
    if (typeof body.user.name === "string") student.name = body.user.name.slice(0, 80);
    if (typeof body.user.bio === "string") student.bio = body.user.bio.slice(0, 500);
    if (typeof body.user.avatar === "string") student.avatar = body.user.avatar;
    if (typeof body.user.points === "number") student.points = Math.max(0, Math.round(body.user.points));
    if (typeof body.user.level === "number") student.level = Math.max(1, Math.round(body.user.level));
    student.username = String(body.user.username || student.username).slice(0, 40);
  }

  saveDb();
  res.json({ user: publicUser(student), ...merged });
});

router.delete("/account", requireStudent, (req, res) => {
  const db = getDb();
  const key = studentKey(req.student.email);
  if (!db.students[key]) return res.status(404).json({ error: "Topilmadi" });
  delete db.students[key];
  saveDb();
  res.status(204).end();
});

router.get("/leaderboard", (req, res) => {
  const db = getDb();
  const entries = Object.values(db.students)
    .map((s) => {
      const projects = Array.isArray(s.state?.projects) ? s.state.projects : [];
      return {
        userId: s._id,
        username: s.username,
        avatar: s.avatar || AVATAR_URL(s.username),
        level: publicUser(s).level,
        points: s.points || 0,
        projects: projects.length,
        challengesCompleted: Array.isArray(s.state?.activeChallenges)
          ? s.state.activeChallenges.length
          : 0,
      };
    })
    .sort((a, b) => b.points - a.points || b.projects - a.projects)
    .slice(0, 50);

  res.json(entries);
});

import { signStudent } from "../middleware/auth.js";

export default router;