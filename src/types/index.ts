// Types will be added here as features are implemented
export type TaskCategory =
  | 'work'
  | 'personal'
  | 'shopping'
  | 'health'
  | 'other';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: TaskCategory;
  createdAt: Date;
}

export type FilterStatus = 'all' | 'active' | 'completed';

export type Theme = 'light' | 'dark';
