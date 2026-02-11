// Types will be added here as features are implemented
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export type FilterStatus = 'all' | 'active' | 'completed';
