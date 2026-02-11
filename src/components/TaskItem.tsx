import { Task } from '../types';
import { getCategoryConfig } from '../utils/categories';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const categoryConfig = getCategoryConfig(task.category);

  return (
    <li className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 group">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500 cursor-pointer"
      />
      <span
        className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryConfig.bgColor} ${categoryConfig.textColor} ${categoryConfig.darkBgColor} ${categoryConfig.darkTextColor}`}
      >
        {categoryConfig.label}
      </span>
      <span
        className={`flex-1 ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-100'}`}
      >
        {task.title}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="px-3 py-1 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded transition-colors opacity-0 group-hover:opacity-100"
      >
        Delete
      </button>
    </li>
  );
}
