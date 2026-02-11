import { CATEGORIES } from '../utils/categories';
import { CategoryFilterValue } from '../hooks/useCategoryFilter';

interface CategoryFilterProps {
  categoryFilter: CategoryFilterValue;
  onCategoryFilterChange: (filter: CategoryFilterValue) => void;
}

export default function CategoryFilter({
  categoryFilter,
  onCategoryFilterChange,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 py-2 px-1 text-sm flex-wrap">
      <span className="text-sm text-gray-500 font-medium">Category:</span>
      <button
        onClick={() => onCategoryFilterChange('all')}
        className={`px-3 py-1 rounded transition-colors ${
          categoryFilter === 'all'
            ? 'bg-gray-200 text-gray-800 font-medium'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        All
      </button>
      {CATEGORIES.map(({ key, label, color, bgColor, textColor }) => (
        <button
          key={key}
          onClick={() => onCategoryFilterChange(key)}
          className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
            categoryFilter === key
              ? `${bgColor} ${textColor} font-medium`
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className={`inline-block w-2 h-2 rounded-full ${color}`} />
          {label}
        </button>
      ))}
    </div>
  );
}
