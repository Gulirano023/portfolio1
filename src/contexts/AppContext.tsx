import React, { createContext, useContext, useReducer, useEffect, useRef, type ReactNode } from 'react';
import type { User, Project, SkillScore, Achievement, Certificate, Settings, AuthState } from '@/data/types';
import { mockUsers, mockProjects, mockSkillScores, mockAchievements, mockCertificates } from '@/data/mockData';
import {
  ApiError,
  getToken,
  setToken,
  clearToken,
  loginStudent,
  registerStudent,
  fetchStudentState,
  saveStudentState,
  type ServerUser,
  type ServerState,
} from '@/lib/api';

const STORAGE_KEY = 'teenskill-state-v2';

interface AppState {
  auth: AuthState;
  users: User[];
  projects: Project[];
  activeChallenges: string[];
  skillScores: SkillScore[];
  achievements: Achievement[];
  certificates: Certificate[];
  settings: Settings;
}

type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER'; payload: User }
  | { type: 'HYDRATE'; payload: UserData }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'START_CHALLENGE'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'UPDATE_SKILL_SCORES'; payload: SkillScore[] }
  | { type: 'ADD_CERTIFICATE'; payload: Certificate };

interface UserData {
  user: User;
  projects: Project[];
  activeChallenges: string[];
  skillScores: SkillScore[];
  achievements: Achievement[];
  certificates: Certificate[];
  settings: Settings;
}

const defaultSettings: Settings = {
  theme: 'dark',
  language: 'en',
  notifications: {
    challengeReminders: true,
    feedbackNotifications: true,
    achievementNotifications: true,
  },
  profile: {
    name: '',
    username: '',
    bio: '',
  },
};

const initialState: AppState = {
  auth: { isAuthenticated: false, user: null },
  users: mockUsers,
  projects: mockProjects,
  activeChallenges: [],
  skillScores: mockSkillScores,
  achievements: mockAchievements,
  certificates: mockCertificates,
  settings: defaultSettings,
};

function loadState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return initialState;
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        auth: { isAuthenticated: true, user: action.payload },
        settings: {
          ...state.settings,
          profile: {
            name: action.payload.name,
            username: action.payload.username,
            bio: action.payload.bio,
          },
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        auth: { isAuthenticated: false, user: null },
      };
    case 'REGISTER': {
      const newUser = { ...action.payload, id: `u${Date.now()}`, points: 0, level: 1, joinedAt: action.payload.joinedAt || new Date().toISOString().split('T')[0] };
      return {
        ...state,
        auth: { isAuthenticated: true, user: newUser },
        users: [...state.users, newUser],
        projects: [],
        activeChallenges: [],
        skillScores: [],
        achievements: [],
        certificates: [],
        settings: {
          ...defaultSettings,
          profile: {
            name: newUser.name,
            username: newUser.username,
            bio: newUser.bio,
          },
        },
      };
    }
    case 'HYDRATE':
      return {
        ...state,
        auth: { isAuthenticated: true, user: action.payload.user },
        projects: action.payload.projects,
        activeChallenges: action.payload.activeChallenges,
        skillScores: action.payload.skillScores,
        achievements: action.payload.achievements,
        certificates: action.payload.certificates,
        settings: action.payload.settings,
      };
    case 'UPDATE_PROFILE': {
      if (!state.auth.user) return state;
      const updatedUser = { ...state.auth.user, ...action.payload };
      return {
        ...state,
        auth: { ...state.auth, user: updatedUser },
        users: state.users.map(u => (u.id === updatedUser.id ? updatedUser : u)),
      };
    }
    case 'START_CHALLENGE':
      if (state.activeChallenges.includes(action.payload)) return state;
      return {
        ...state,
        activeChallenges: [...state.activeChallenges, action.payload],
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    case 'UPDATE_SKILL_SCORES':
      return {
        ...state,
        skillScores: action.payload,
      };
    case 'ADD_CERTIFICATE':
      return {
        ...state,
        certificates: [...state.certificates, action.payload],
      };
    default:
      return state;
  }
}

function toUser(server: ServerUser): User {
  return {
    id: server.id,
    name: server.name,
    username: server.username,
    email: server.email,
    password: '',
    age: server.age,
    mainSkill: server.mainSkill as User['mainSkill'],
    avatar: server.avatar,
    bio: server.bio,
    level: server.level,
    points: server.points,
    joinedAt: server.joinedAt,
  };
}

function toUserData(server: ServerState): UserData {
  return {
    user: toUser(server.user),
    projects: (server.projects ?? []) as Project[],
    activeChallenges: (server.activeChallenges ?? []) as string[],
    skillScores: (server.skillScores ?? []) as SkillScore[],
    achievements: (server.achievements ?? []) as Achievement[],
    certificates: (server.certificates ?? []) as Certificate[],
    settings: server.settings as unknown as Settings,
  };
}

function currentSlice(state: AppState): Record<string, unknown> {
  const user = state.auth.user;
  return {
    projects: state.projects,
    activeChallenges: state.activeChallenges,
    skillScores: state.skillScores,
    achievements: state.achievements,
    certificates: state.certificates,
    settings: state.settings,
    user: user
      ? {
          name: user.name,
          username: user.username,
          bio: user.bio,
          avatar: user.avatar,
          points: user.points,
          level: user.level,
        }
      : null,
  };
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, username: string, email: string, password: string, age: number, mainSkill: string) => Promise<boolean>;
  logout: () => void;
  startChallenge: (challengeId: string) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  submitProject: (projectId: string, score: number, skills: Record<string, number>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState, loadState);
  const serverTokenRef = useRef<string | null>(getToken());
  const serverAuthedRef = useRef(false);
  const lastSentRef = useRef('');

  const adoptServerState = (data: UserData) => {
    dispatch({ type: 'HYDRATE', payload: data });
  };

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    const light = state.settings.theme === 'light';
    root.dataset.theme = light ? 'light' : 'dark';
    root.classList.toggle('dark', !light);
  }, [state.settings.theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.settings.theme === 'dark');
    document.documentElement.classList.toggle('light', state.settings.theme === 'light');
  }, [state.settings.theme]);

  useEffect(() => {
    const token = serverTokenRef.current;
    if (!token) return;

    let cancelled = false;
    (async () => {
      try {
        const server = await fetchStudentState(token);
        if (cancelled) return;
        serverAuthedRef.current = true;
        adoptServerState(toUserData(server));
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          serverTokenRef.current = null;
          clearToken();
        }
        serverAuthedRef.current = false;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

const payloadSignature = JSON.stringify(currentSlice(state));
  useEffect(() => {
    if (!serverAuthedRef.current) return;
    const token = serverTokenRef.current;
    if (!token || !state.auth.user) return;

    if (payloadSignature === lastSentRef.current) return;

    const timer = setTimeout(() => {
      const payload = currentSlice(state);
      saveStudentState(token, payload)
        .then(() => {
          lastSentRef.current = JSON.stringify(payload);
        })
        .catch(() => {
          // keep local state; will retry on next change
        });
    }, 700);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payloadSignature, state.auth.user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { token, user: serverUser } = await loginStudent(email, password);
      serverTokenRef.current = token;
      setToken(token);
      serverAuthedRef.current = true;
      try {
        const server = await fetchStudentState(token);
        adoptServerState(toUserData(server));
      } catch {
        adoptServerState(toServerUserData(serverUser));
      }
      return true;
    } catch {
      // server unreachable or rejected — fall through to offline mode
    }

    const user = state.users.find(u => u.email === email && u.password === password);
    if (user) {
      serverAuthedRef.current = false;
      dispatch({ type: 'LOGIN', payload: user });
      return true;
    }
    return false;
  };

  const register = async (name: string, username: string, email: string, password: string, age: number, mainSkill: string): Promise<boolean> => {
    try {
      const { token, user: serverUser } = await registerStudent({ name, username, email, password, age, mainSkill });
      serverTokenRef.current = token;
      setToken(token);
      serverAuthedRef.current = true;
      try {
        const server = await fetchStudentState(token);
        adoptServerState(toUserData(server));
      } catch {
        adoptServerState(toServerUserData(serverUser));
      }
      return true;
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        return false;
      }
      if (err instanceof ApiError && err.status !== 0) {
        return false;
      }
    }

    const exists = state.users.find(u => u.email === email || u.username === username);
    if (exists) return false;
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      username,
      email,
      password,
      age,
      mainSkill: mainSkill as User['mainSkill'],
      avatar: '',
      bio: '',
      level: 1,
      points: 0,
      joinedAt: new Date().toISOString().split('T')[0],
    };
    dispatch({ type: 'REGISTER', payload: newUser });
    return true;
  };

  const logout = () => {
    serverAuthedRef.current = false;
    serverTokenRef.current = null;
    clearToken();
    lastSentRef.current = '';
    dispatch({ type: 'LOGOUT' });
  };

  const startChallenge = (challengeId: string) => {
    dispatch({ type: 'START_CHALLENGE', payload: challengeId });
  };

  const addProject = (project: Project) => {
    dispatch({ type: 'ADD_PROJECT', payload: project });
  };

  const updateProject = (project: Project) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: project });
  };

  const submitProject = (projectId: string, score: number, skills: Record<string, number>) => {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    const updatedProject: Project = {
      ...project,
      status: 'completed',
      score,
      skillsDemonstrated: skills,
      submittedAt: new Date().toISOString().split('T')[0],
      completedAt: new Date().toISOString().split('T')[0],
    };
    dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, login, register, logout, startChallenge, addProject, updateProject, submitProject }}>
      {children}
    </AppContext.Provider>
  );
}

function toServerUserData(user: ServerUser): UserData {
  return {
    user: toUser(user),
    projects: [],
    activeChallenges: [],
    skillScores: [],
    achievements: [],
    certificates: [],
    settings: defaultSettings,
  };
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}