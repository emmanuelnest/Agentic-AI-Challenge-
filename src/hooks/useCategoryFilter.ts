import { useState, useEffect } from 'react';
import { TaskCategory } from '../types';

const CATEGORY_FILTER_STORAGE_KEY = 'task-manager-category-filter';

export type CategoryFilterValue = 'all' | TaskCategory;

const VALID_VALUES: CategoryFilterValue[] = [
  'all',
  'work',
  'personal',
  'shopping',
  'health',
  'other',
];

function loadCategoryFilter(): CategoryFilterValue {
  try {
    const stored = localStorage.getItem(CATEGORY_FILTER_STORAGE_KEY);
    if (stored && VALID_VALUES.includes(stored as CategoryFilterValue)) {
      return stored as CategoryFilterValue;
    }
    return 'all';
  } catch {
    return 'all';
  }
}

export default function useCategoryFilter() {
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilterValue>(loadCategoryFilter);

  useEffect(() => {
    localStorage.setItem(CATEGORY_FILTER_STORAGE_KEY, categoryFilter);
  }, [categoryFilter]);

  return { categoryFilter, setCategoryFilter };
}
