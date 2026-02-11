import { useState, useEffect } from 'react';
import { FilterStatus } from '../types';

const FILTER_STORAGE_KEY = 'task-manager-filter';

const VALID_FILTERS: FilterStatus[] = ['all', 'active', 'completed'];

function loadFilter(): FilterStatus {
  try {
    const stored = localStorage.getItem(FILTER_STORAGE_KEY);
    if (stored && VALID_FILTERS.includes(stored as FilterStatus)) {
      return stored as FilterStatus;
    }
    return 'all';
  } catch {
    return 'all';
  }
}

export default function useFilter() {
  const [filter, setFilter] = useState<FilterStatus>(loadFilter);

  useEffect(() => {
    localStorage.setItem(FILTER_STORAGE_KEY, filter);
  }, [filter]);

  return { filter, setFilter };
}
