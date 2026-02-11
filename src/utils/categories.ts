import { TaskCategory } from '../types';

export const CATEGORIES: {
  key: TaskCategory;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  darkBgColor: string;
  darkTextColor: string;
}[] = [
  {
    key: 'work',
    label: 'Work',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    darkBgColor: 'dark:bg-blue-900/40',
    darkTextColor: 'dark:text-blue-300',
  },
  {
    key: 'personal',
    label: 'Personal',
    color: 'bg-purple-500',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    darkBgColor: 'dark:bg-purple-900/40',
    darkTextColor: 'dark:text-purple-300',
  },
  {
    key: 'shopping',
    label: 'Shopping',
    color: 'bg-green-500',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    darkBgColor: 'dark:bg-green-900/40',
    darkTextColor: 'dark:text-green-300',
  },
  {
    key: 'health',
    label: 'Health',
    color: 'bg-rose-500',
    bgColor: 'bg-rose-100',
    textColor: 'text-rose-700',
    darkBgColor: 'dark:bg-rose-900/40',
    darkTextColor: 'dark:text-rose-300',
  },
  {
    key: 'other',
    label: 'Other',
    color: 'bg-gray-500',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    darkBgColor: 'dark:bg-gray-700/40',
    darkTextColor: 'dark:text-gray-300',
  },
];

export function getCategoryConfig(category: TaskCategory) {
  return CATEGORIES.find((c) => c.key === category) ?? CATEGORIES[4];
}
