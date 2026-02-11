import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 group">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
      />
      <span
        className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
      >
        {task.title}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="px-3 py-1 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
      >
        Delete
      </button>
    </li>
  );
}
