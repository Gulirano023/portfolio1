export type SkillName = 'HTML' | 'CSS' | 'JavaScript' | 'React' | 'Python' | 'Git & GitHub';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ChallengeStatus = 'available' | 'in_progress' | 'completed';

export type ProjectStatus = 'draft' | 'in_progress' | 'submitted' | 'reviewed' | 'completed';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  age: number;
  mainSkill: SkillName;
  avatar: string;
  bio: string;
  level: number;
  points: number;
  joinedAt: string;
}

export interface SkillScore {
  skill: SkillName;
  score: number;
  challengesCompleted: number;
  projectsCompleted: number;
  codeQuality: number;
  problemSolving: number;
  consistency: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  technology: string[];
  difficulty: Difficulty;
  estimatedTime: string;
  points: number;
  participants: number;
  requirements: string[];
  skillsToPractice: string[];
  deliverables: string[];
  deadline: string | null;
  image: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  challengeId: string | null;
  githubUrl: string;
  liveDemoUrl: string;
  technologies: string[];
  screenshot: string;
  status: ProjectStatus;
  score: number | null;
  skillsDemonstrated: Record<string, number>;
  submittedAt: string | null;
  completedAt: string | null;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  requirement: string;
}

export interface Certificate {
  id: string;
  userId: string;
  title: string;
  skill: SkillName;
  skillScore: number;
  completedAt: string;
}

export interface AIFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  skillEvaluation: Record<string, number>;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  level: number;
  points: number;
  projects: number;
  challengesCompleted: number;
}

export interface Settings {
  theme: 'dark' | 'light';
  language: 'en' | 'uz' | 'ru';
  notifications: {
    challengeReminders: boolean;
    feedbackNotifications: boolean;
    achievementNotifications: boolean;
  };
  profile: {
    name: string;
    username: string;
    bio: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface AppState {
  auth: AuthState;
  users: User[];
  challenges: Challenge[];
  projects: Project[];
  activeChallenges: string[];
  skillScores: SkillScore[];
  achievements: Achievement[];
  certificates: Certificate[];
  settings: Settings;
}
