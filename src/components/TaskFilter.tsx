import { FilterStatus } from '../types';

interface TaskFilterProps {
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const FILTER_OPTIONS: { key: FilterStatus; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export default function TaskFilter({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: TaskFilterProps) {
  return (
    <div className="flex items-center justify-between py-3 px-1 text-sm">
      <span className="text-gray-500">
        {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
      </span>
      <div className="flex gap-1">
        {FILTER_OPTIONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-3 py-1 rounded transition-colors ${
              filter === key
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-sm text-red-500 hover:text-red-700 hover:underline"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
