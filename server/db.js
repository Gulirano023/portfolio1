import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const DB_PATH = path.join(DATA_DIR, "db.json");

const seedProjects = [
  {
    id: "proj-1",
    title_uz: "dehqon.ai",
    title_ru: "dehqon.ai",
    description_uz:
      "Sun'iy intellekt texnologiyalariga asoslangan zamonaviy qishloq xo'jaligi platformasi.",
    description_ru:
      "Современная сельскохозяйственная платформа на основе технологий искусственного интеллекта.",
    tech: [],
    demo: "https://dehqon-loyiha1-w6u4.vercel.app/",
    github: "#",
  },
  {
    id: "proj-2",
    title_uz: "Parol Generator",
    title_ru: "Генератор паролей",
    description_uz: "Xavfsiz va maxsus parollarni yaratib beruvchi mini-ilovam.",
    description_ru: "Мини-приложение для создания надёжных и уникальных паролей.",
    tech: [],
    demo: "#",
    github: "#",
  },
];

const seedSkills = [
  { id: "skill-1", name: "HTML", level: 92, icon: "FileCode" },
  { id: "skill-2", name: "CSS", level: 90, icon: "Palette" },
  { id: "skill-3", name: "JavaScript", level: 85, icon: "Code2" },
  { id: "skill-4", name: "React", level: 80, icon: "Globe" },
  { id: "skill-5", name: "Tailwind CSS", level: 88, icon: "Layout" },
  { id: "skill-6", name: "Git & GitHub", level: 82, icon: "GitBranch" },
  { id: "skill-7", name: "Figma", level: 75, icon: "Figma" },
  { id: "skill-8", name: "Terminal / CLI", level: 70, icon: "Terminal" },
];

const seedCertificates = [
  {
    id: "cert-1",
    title: "Introduction to Generative AI",
    provider: "Google Cloud (Coursera)",
    date: "19.01.2026",
    link: "https://coursera.org/share/5aebfc0425f5363b16ea9ebe2100d8bc",
  },
];

const DEMO_EMAIL = "rano@teenskill.dev";

const seedStudentState = {
  projects: [
    {
      id: "proj-1",
      userId: "user-1",
      name: "Portfolio Website",
      description:
        "A sleek personal portfolio built with React and Tailwind CSS, featuring smooth animations and a responsive design.",
      challengeId: "ch-3",
      githubUrl: "https://github.com/rano/portfolio",
      liveDemoUrl: "https://rano.dev",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      screenshot:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      status: "completed",
      score: 88,
      skillsDemonstrated: { React: 90, "Responsive Design": 86, "Component Architecture": 88 },
      submittedAt: "2026-08-15",
      completedAt: "2026-08-20",
    },
    {
      id: "proj-2",
      userId: "user-1",
      name: "Weather App",
      description:
        "Real-time weather dashboard using OpenWeather API with city search, 5-day forecast, and beautiful UI.",
      challengeId: "ch-2",
      githubUrl: "https://github.com/rano/weather-app",
      liveDemoUrl: "https://weather.rano.dev",
      technologies: ["JavaScript", "HTML", "CSS", "REST API"],
      screenshot:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      status: "completed",
      score: 87,
      skillsDemonstrated: { JavaScript: 87, "API Integration": 82, "Responsive Design": 91 },
      submittedAt: "2026-09-01",
      completedAt: "2026-09-05",
    },
    {
      id: "proj-3",
      userId: "user-1",
      name: "To-Do App",
      description:
        "A productivity app with task categories, priorities, due dates, and local storage persistence.",
      challengeId: null,
      githubUrl: "https://github.com/rano/todo-app",
      liveDemoUrl: "https://todo.rano.dev",
      technologies: ["React", "TypeScript", "LocalStorage"],
      screenshot:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
      status: "completed",
      score: 82,
      skillsDemonstrated: { React: 84, "State Management": 80, TypeScript: 78 },
      submittedAt: "2026-07-10",
      completedAt: "2026-07-15",
    },
    {
      id: "proj-4",
      userId: "user-1",
      name: "Quiz Application",
      description:
        "Interactive quiz app with multiple categories, scoring system, and animated transitions.",
      challengeId: "ch-10",
      githubUrl: "https://github.com/rano/quiz-app",
      liveDemoUrl: "",
      technologies: ["React", "JavaScript", "CSS"],
      screenshot:
        "https://images.unsplash.com/photo-1606168094336-48f2f0929849?w=600&h=400&fit=crop",
      status: "in_progress",
      score: null,
      skillsDemonstrated: {},
      submittedAt: null,
      completedAt: null,
    },
  ],
  activeChallenges: ["ch-10"],
  skillScores: [
    { skill: "HTML", score: 88, challengesCompleted: 6, projectsCompleted: 4, codeQuality: 90, problemSolving: 85, consistency: 88, level: "Advanced" },
    { skill: "CSS", score: 85, challengesCompleted: 5, projectsCompleted: 3, codeQuality: 84, problemSolving: 82, consistency: 90, level: "Advanced" },
    { skill: "JavaScript", score: 82, challengesCompleted: 8, projectsCompleted: 5, codeQuality: 84, problemSolving: 79, consistency: 91, level: "Intermediate" },
    { skill: "React", score: 78, challengesCompleted: 4, projectsCompleted: 3, codeQuality: 80, problemSolving: 76, consistency: 82, level: "Intermediate" },
    { skill: "Python", score: 65, challengesCompleted: 3, projectsCompleted: 2, codeQuality: 68, problemSolving: 62, consistency: 70, level: "Intermediate" },
    { skill: "Git & GitHub", score: 72, challengesCompleted: 2, projectsCompleted: 2, codeQuality: 74, problemSolving: 70, consistency: 75, level: "Intermediate" },
  ],
  achievements: [
    { id: "ach-1", title: "First Project", description: "Submit your first project", icon: "🏆", unlockedAt: "2026-06-25", requirement: "Complete 1 project" },
    { id: "ach-2", title: "7 Day Streak", description: "Complete activities for 7 consecutive days", icon: "🔥", unlockedAt: "2026-07-10", requirement: "7 day streak" },
    { id: "ach-3", title: "5 Projects", description: "Complete 5 projects", icon: "💻", unlockedAt: null, requirement: "Complete 5 projects" },
    { id: "ach-4", title: "JavaScript Beginner", description: "Score 50+ in JavaScript skill", icon: "⚡", unlockedAt: "2026-07-05", requirement: "JS score > 50" },
    { id: "ach-5", title: "First Challenge", description: "Complete your first challenge", icon: "🚀", unlockedAt: "2026-06-20", requirement: "Complete 1 challenge" },
    { id: "ach-6", title: "Code Reviewer", description: "Receive feedback on 3 projects", icon: "📝", unlockedAt: null, requirement: "3 projects reviewed" },
    { id: "ach-7", title: "CSS Master", description: "Score 90+ in CSS skill", icon: "🎨", unlockedAt: null, requirement: "CSS score > 90" },
    { id: "ach-8", title: "Full Stack Explorer", description: "Complete projects in 3+ technologies", icon: "🌐", unlockedAt: null, requirement: "3+ tech projects" },
    { id: "ach-9", title: "Speed Learner", description: "Complete 3 challenges in one week", icon: "⚡", unlockedAt: null, requirement: "3 challenges/week" },
    { id: "ach-10", title: "Portfolio Pro", description: "Build a portfolio with 5+ projects", icon: "⭐", unlockedAt: null, requirement: "5+ portfolio projects" },
  ],
  certificates: [
    { id: "cert-1", userId: "user-1", title: "HTML Basics", skill: "HTML", skillScore: 88, completedAt: "2026-07-01" },
    { id: "cert-2", userId: "user-1", title: "CSS Fundamentals", skill: "CSS", skillScore: 85, completedAt: "2026-07-15" },
    { id: "cert-3", userId: "user-1", title: "JavaScript Beginner", skill: "JavaScript", skillScore: 82, completedAt: "2026-08-01" },
    { id: "cert-4", userId: "user-1", title: "React Foundations", skill: "React", skillScore: 78, completedAt: "2026-08-20" },
  ],
  settings: {
    theme: "dark",
    language: "en",
    notifications: {
      challengeReminders: true,
      feedbackNotifications: true,
      achievementNotifications: true,
    },
    profile: {
      name: "Rano",
      username: "rano",
      bio: "Frontend enthusiast building cool web projects.",
    },
  },
};

let db;

function defaultDb() {
  return {
    admin: null,
    messages: [],
    projects: seedProjects,
    skills: seedSkills,
    certificates: seedCertificates,
    students: {},
  };
}

function seedDemoStudent() {
  db.students[DEMO_EMAIL] = {
    _id: "user-1",
    email: DEMO_EMAIL,
    username: "rano",
    name: "Rano",
    age: 16,
    mainSkill: "JavaScript",
    passwordHash: bcrypt.hashSync("demo123", 10),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rano&backgroundColor=1a1a2e",
    bio: "Frontend enthusiast building cool web projects.",
    points: 2450,
    level: 12,
    joinedAt: "2026-01-15",
    state: seedStudentState,
  };
}

export function initDb() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  if (fs.existsSync(DB_PATH)) {
    try {
      db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
    } catch {
      db = defaultDb();
    }
  } else {
    db = defaultDb();
  }

  if (!db.students) db.students = {};
  syncAdminFromEnv();
  if (!db.students[DEMO_EMAIL]) seedDemoStudent();
  saveDb();
}

function syncAdminFromEnv() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  if (
    !db.admin ||
    db.admin.username !== username ||
    !bcrypt.compareSync(password, db.admin.passwordHash)
  ) {
    db.admin = {
      username,
      passwordHash: bcrypt.hashSync(password, 10),
    };
  }
}

export function getDb() {
  if (!db) initDb();
  return db;
}

export function saveDb() {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

export function newId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}
