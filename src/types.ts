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
