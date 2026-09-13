const API_BASE = (
  import.meta.env.VITE_API_URL as string | undefined
)?.replace(/\/+$/, '') ?? (import.meta.env.PROD ? 'https://teenskill-api.onrender.com' : 'http://localhost:3001');
const TOKEN_KEY = 'teenskill-token';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 0) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string | null;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('Server not reachable', 0);
  }

  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message =
      data && typeof data === 'object' && 'error' in data
        ? String((data as { error: unknown }).error)
        : `Server error (${res.status})`;
    throw new ApiError(message, res.status);
  }

  return data as T;
}

export interface ServerUser {
  id: string;
  email: string;
  name: string;
  username: string;
  age: number;
  mainSkill: string;
  avatar: string;
  bio: string;
  points: number;
  level: number;
  joinedAt: string;
}

export interface ServerState {
  user: ServerUser;
  projects: unknown[];
  activeChallenges: string[];
  skillScores: unknown[];
  achievements: unknown[];
  certificates: unknown[];
  settings: Record<string, unknown>;
}

export interface ServerLeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  level: number;
  points: number;
  projects: number;
  challengesCompleted: number;
}

const AUTH_HEADERS = (token: string) => ({ token });

export async function loginStudent(email: string, password: string): Promise<{ token: string; user: ServerUser }> {
  return request('/api/ts/login', { method: 'POST', body: { email, password } });
}

export async function registerStudent(payload: {
  name: string;
  username: string;
  email: string;
  password: string;
  age: number;
  mainSkill: string;
}): Promise<{ token: string; user: ServerUser }> {
  return request('/api/ts/register', { method: 'POST', body: payload });
}

export async function fetchStudentState(token: string): Promise<ServerState> {
  return request('/api/ts/state', AUTH_HEADERS(token));
}

export async function saveStudentState(
  token: string,
  payload: Record<string, unknown>
): Promise<ServerState> {
  return request('/api/ts/state', { method: 'PUT', body: payload, token });
}

export async function deleteStudentAccount(token: string): Promise<void> {
  return request('/api/ts/account', { method: 'DELETE', token });
}

export async function fetchLeaderboard(): Promise<ServerLeaderboardEntry[]> {
  return request('/api/ts/leaderboard');
}