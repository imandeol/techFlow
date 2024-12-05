export interface ProjectInput {
  idea: string;
  features: string;
  techStack: string;
  deadline: string;
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  daysRequired: number;
}

export interface AuthState {
  isLoggedIn: boolean;
  access_token: string | null;
}

export interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  teamId: string | null;
}
