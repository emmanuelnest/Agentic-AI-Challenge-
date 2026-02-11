import { TaskCategory } from '../types';

export const CATEGORIES: {
  key: TaskCategory;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}[] = [
  {
    key: 'work',
    label: 'Work',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  {
    key: 'personal',
    label: 'Personal',
    color: 'bg-purple-500',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
  },
  {
    key: 'shopping',
    label: 'Shopping',
    color: 'bg-green-500',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    key: 'health',
    label: 'Health',
    color: 'bg-rose-500',
    bgColor: 'bg-rose-100',
    textColor: 'text-rose-700',
  },
  {
    key: 'other',
    label: 'Other',
    color: 'bg-gray-500',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
  },
];

export function getCategoryConfig(category: TaskCategory) {
  return CATEGORIES.find((c) => c.key === category) ?? CATEGORIES[4];
}
