# Feature: Add Categories/Tags to Tasks

## Metadata
issue_number: `9`
adw_id: `0dd8a1ae`
issue_json: `{"number":9,"title":"Add categories/tags to tasks","body":"Enable users to categorize their tasks for better organization.\n\n**User Story**:\nAs a user\nI want to assign categories to my tasks\nSo that I can organize them by project or context\n\n**Requirements**:\n- [ ] Add category field to Task type\n- [ ] Create category selector in task creation form\n- [ ] Display category badges on tasks\n- [ ] Add category filter alongside status filters\n- [ ] Use color coding for different categories\n- [ ] Predefined categories: Work, Personal, Shopping, Health, Other\n\n**Acceptance Criteria**:\n- Users can select a category when creating a task\n- Tasks display their category with a colored badge\n- Users can filter tasks by category\n- Categories are persisted with tasks\n- Each category has a distinct color\n\n**Design Notes**:\n- Use Tailwind color utilities for category badges\n- Make category selection optional (default to \"Other\")\n- Categories should be easily scannable"}`

## Feature Description
Add a category/tag system to the Task Manager application. Users will be able to assign one of five predefined categories (Work, Personal, Shopping, Health, Other) to each task when creating it. Each category has a distinct color-coded badge displayed on the task item for easy scanning. A new category filter bar allows users to filter tasks by category alongside the existing status filters. Categories default to "Other" when not explicitly selected, and are persisted with tasks in localStorage. This feature enhances task organization by allowing users to group and filter tasks by project or context.

## User Story
As a user
I want to assign categories to my tasks
So that I can organize them by project or context

## Problem Statement
Currently, all tasks are displayed as a flat list differentiated only by completion status. Users with diverse tasks (work deadlines, personal errands, shopping items, health goals) have no way to visually distinguish between task types or filter by context. This makes it difficult to focus on a specific area of responsibility.

## Solution Statement
Introduce a `category` field on the `Task` type with five predefined categories, each mapped to a distinct Tailwind color. Add a category selector dropdown to the task creation form (defaulting to "Other"). Display a colored category badge on each task item. Add a category filter bar that lets users filter tasks by category, working alongside the existing status filter. Persist category selections with tasks in localStorage using the existing persistence pattern.

## Relevant Files
Use these files to implement the feature:

- **`src/types/index.ts`** — Contains the `Task` interface and `FilterStatus` type. Will be extended with `TaskCategory` type and the `category` field on `Task`.
- **`src/hooks/useTasks.ts`** — Custom hook for task state management. The `addTask` function signature will be updated to accept a category parameter.
- **`src/hooks/useFilter.ts`** — Custom hook for filter persistence. Pattern reference for the new `useCategoryFilter` hook.
- **`src/components/TaskForm.tsx`** — Task creation form. Will be updated to include a category selector dropdown.
- **`src/components/TaskItem.tsx`** — Individual task display. Will be updated to show a colored category badge.
- **`src/components/TaskFilter.tsx`** — Status filter bar. Will be kept as-is; a new `CategoryFilter` component will be added alongside it.
- **`src/components/TaskList.tsx`** — Task list container. No changes needed.
- **`src/App.tsx`** — Main application component. Will integrate the category filter and apply category filtering logic to the task list.
- **`package.json`** — Project dependencies. No new dependencies needed.

### New Files
- **`src/utils/categories.ts`** — Central definition of category constants: the `CATEGORIES` array with label and color mappings, and a helper function `getCategoryColor`.
- **`src/hooks/useCategoryFilter.ts`** — Custom hook to manage the active category filter state and persist it to localStorage.
- **`src/components/CategoryFilter.tsx`** — Component rendering the category filter buttons with color-coded indicators.
- **`.claude/commands/e2e/test_task_categories.md`** — E2E test script to validate the categories feature.

## Implementation Plan
### Phase 1: Foundation
Define the `TaskCategory` type and update the `Task` interface with an optional `category` field (defaulting to `'other'`). Create the `src/utils/categories.ts` module containing the predefined category list with their color mappings. These foundational types and constants will be consumed by all subsequent components and hooks.

### Phase 2: Core Implementation
1. Update the `useTasks` hook so `addTask` accepts a category parameter and includes it in new tasks.
2. Create the `useCategoryFilter` hook for managing category filter state with localStorage persistence.
3. Update the `TaskForm` component to include a category selector dropdown.
4. Update the `TaskItem` component to display a colored category badge.
5. Create the `CategoryFilter` component with category filter buttons.

### Phase 3: Integration
Update `App.tsx` to:
1. Use the `useCategoryFilter` hook to manage category filter state.
2. Apply category filtering in combination with the existing status filter.
3. Render the `CategoryFilter` component alongside the existing `TaskFilter`.
4. Update empty state messages to account for category filters.
5. Handle backward compatibility with existing tasks that have no category (default them to `'other'`).

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Create E2E Test Script
- Create `.claude/commands/e2e/test_task_categories.md` with the following validation steps:
  - Start the dev server with `npm run dev`
  - Open `http://localhost:5173` in the browser
  - **Test category selector in form:**
    - Verify the category selector dropdown is visible in the task creation form
    - Verify the default selected category is "Other"
    - Verify all 5 categories are available in the dropdown: Work, Personal, Shopping, Health, Other
    - Take a screenshot of the form with category selector
  - **Test task creation with categories:**
    - Add a task "Finish report" with category "Work"
    - Add a task "Buy milk" with category "Shopping"
    - Add a task "Go for a run" with category "Health"
    - Add a task "Call mom" with category "Personal"
    - Add a task "Misc errand" with default category "Other"
    - Verify all 5 tasks appear in the list
    - Take a screenshot showing all tasks with category badges
  - **Test category badges:**
    - Verify each task displays a colored badge matching its category
    - Verify "Finish report" has a "Work" badge (blue color)
    - Verify "Buy milk" has a "Shopping" badge (green color)
    - Verify "Go for a run" has a "Health" badge (rose/red color)
    - Verify "Call mom" has a "Personal" badge (purple color)
    - Verify "Misc errand" has an "Other" badge (gray color)
    - Take a screenshot highlighting category badges
  - **Test category filter:**
    - Verify the category filter bar is visible with "All" and all 5 category buttons
    - Click "Work" category filter — verify only "Finish report" is visible
    - Click "Shopping" category filter — verify only "Buy milk" is visible
    - Click "All" category filter — verify all 5 tasks are visible again
    - Take a screenshot of filtered view
  - **Test category filter combined with status filter:**
    - Mark "Finish report" and "Buy milk" as completed
    - Set category filter to "Work" and status filter to "Completed"
    - Verify only "Finish report" is visible
    - Reset both filters to "All"
    - Verify all 5 tasks are visible
    - Take a screenshot
  - **Test persistence:**
    - Refresh the page
    - Verify all tasks retain their categories
    - Verify category badges are still displayed correctly
    - Take a screenshot after refresh
  - **Test edge case — no tasks in category:**
    - Click "Health" category filter
    - Delete "Go for a run"
    - Verify empty state message is shown for the filtered category
    - Take a screenshot

### 2. Add `TaskCategory` Type and Update `Task` Interface
- Open `src/types/index.ts`
- Add `export type TaskCategory = 'work' | 'personal' | 'shopping' | 'health' | 'other';` before the `Task` interface
- Add `category: TaskCategory;` field to the `Task` interface (after the `completed` field)

### 3. Create Category Constants and Utilities
- Create file `src/utils/categories.ts`
- Define and export the `CATEGORIES` constant array:
  ```typescript
  export const CATEGORIES: { key: TaskCategory; label: string; color: string; bgColor: string; textColor: string }[] = [
    { key: 'work', label: 'Work', color: 'bg-blue-500', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
    { key: 'personal', label: 'Personal', color: 'bg-purple-500', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
    { key: 'shopping', label: 'Shopping', color: 'bg-green-500', bgColor: 'bg-green-100', textColor: 'text-green-700' },
    { key: 'health', label: 'Health', color: 'bg-rose-500', bgColor: 'bg-rose-100', textColor: 'text-rose-700' },
    { key: 'other', label: 'Other', color: 'bg-gray-500', bgColor: 'bg-gray-100', textColor: 'text-gray-700' },
  ];
  ```
- Export a helper function `getCategoryConfig(category: TaskCategory)` that returns the matching entry from `CATEGORIES`
- Import `TaskCategory` from `../types`

### 4. Update `useTasks` Hook
- Open `src/hooks/useTasks.ts`
- Update the `addTask` function signature to `addTask(title: string, category: TaskCategory)`
- Update the `newTask` creation to include `category`
- Update the `loadTasks` function to handle backward compatibility: if a loaded task has no `category` field, default it to `'other'`
- Import `TaskCategory` from `../types`

### 5. Create the `useCategoryFilter` Custom Hook
- Create file `src/hooks/useCategoryFilter.ts`
- Define `CATEGORY_FILTER_STORAGE_KEY` constant as `"task-manager-category-filter"`
- Define `CategoryFilterValue` type as `'all' | TaskCategory` (i.e., `'all' | 'work' | 'personal' | 'shopping' | 'health' | 'other'`)
- Implement a helper function `loadCategoryFilter()` to load the filter from localStorage:
  - Read the value from localStorage using `CATEGORY_FILTER_STORAGE_KEY`
  - Validate it is either `'all'` or one of the valid `TaskCategory` values
  - Return `'all'` as default if nothing is stored or value is invalid
- Implement the `useCategoryFilter` hook that returns:
  - `categoryFilter`: the current category filter value
  - `setCategoryFilter(filter: CategoryFilterValue)`: updates the filter state
- Use `useState` with lazy initializer calling `loadCategoryFilter()`
- Use `useEffect` to persist the filter to localStorage whenever it changes
- Export the `CategoryFilterValue` type and the hook as default

### 6. Update `TaskForm` Component
- Open `src/components/TaskForm.tsx`
- Update the `TaskFormProps` interface: change `onAddTask` to `onAddTask: (title: string, category: TaskCategory) => void`
- Add `category` state with `useState<TaskCategory>('other')`
- Import `TaskCategory` from `../types` and `CATEGORIES` from `../utils/categories`
- Add a `<select>` dropdown after the text input and before the "Add" button:
  - Style with Tailwind: `px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white`
  - Map over `CATEGORIES` to create `<option>` elements with `key` as value and `label` as display text
  - Bind `value` to `category` state and `onChange` to update it
- Update `handleSubmit` to call `onAddTask(trimmed, category)` and reset `category` to `'other'` after submission

### 7. Update `TaskItem` Component
- Open `src/components/TaskItem.tsx`
- Import `getCategoryConfig` from `../utils/categories`
- After the checkbox and before the task title `<span>`, add a category badge:
  - Use `getCategoryConfig(task.category)` to get the color configuration
  - Render a `<span>` badge with classes: `px-2 py-0.5 text-xs font-medium rounded-full ${bgColor} ${textColor}`
  - Display the category label text inside the badge
- The badge should be between the checkbox and the title, as a compact pill-shaped element

### 8. Create the `CategoryFilter` Component
- Create file `src/components/CategoryFilter.tsx`
- Import `CATEGORIES` from `../utils/categories`
- Import `CategoryFilterValue` from `../hooks/useCategoryFilter`
- Accept props:
  - `categoryFilter: CategoryFilterValue` — the currently active category filter
  - `onCategoryFilterChange: (filter: CategoryFilterValue) => void` — callback when category filter changes
- Render a container `<div>` with the following layout:
  - A label "Category:" as a `<span>` with `text-sm text-gray-500 font-medium`
  - A row of filter buttons: "All" plus one for each category
  - The "All" button: when active, highlighted with `bg-gray-200 text-gray-800 font-medium`; when inactive, `text-gray-500 hover:text-gray-700`
  - Each category button: when active, use the category's `bgColor` and `textColor` for highlight; when inactive, `text-gray-500 hover:text-gray-700`
  - Each category button should show a small color dot (a `<span>` with `inline-block w-2 h-2 rounded-full ${color}`) before the label for quick visual identification
- Style the container with Tailwind: `flex items-center gap-2 py-2 px-1 text-sm flex-wrap`

### 9. Update `App.tsx` to Integrate Category Filtering
- Open `src/App.tsx`
- Import `useCategoryFilter` from `./hooks/useCategoryFilter`
- Import `CategoryFilter` from `./components/CategoryFilter`
- Call `useCategoryFilter()` to get `categoryFilter` and `setCategoryFilter`
- Update the `addTask` call: the `TaskForm` already passes `(title, category)` so update `onAddTask` prop on `TaskForm` to `addTask` (no wrapper needed since the signatures now match)
- Update the filtering logic to apply both status filter AND category filter:
  - First apply status filter (existing logic)
  - Then apply category filter: if `categoryFilter !== 'all'`, further filter by `task.category === categoryFilter`
- Update the `emptyMessage` computation to account for category filter:
  - If `tasks.length === 0`: `"No tasks yet. Add one above!"`
  - If both filters are active and yield no results, show a combined message
  - Otherwise show context-appropriate message (e.g., "No tasks in this category.")
- Render `CategoryFilter` between `TaskFilter` and `TaskList` (only when `tasks.length > 0`):
  - Pass `categoryFilter` and `onCategoryFilterChange={setCategoryFilter}`

### 10. Run Validation Commands
- Execute all validation commands listed below to ensure zero regressions
- Fix any TypeScript, ESLint, formatting, or build errors that arise
- Verify the app works correctly in the browser at `http://localhost:5173`
- Run the E2E test to validate the categories feature end-to-end

## Testing Strategy
### Unit Tests
- **TaskCategory type**: Verify the type accepts all 5 predefined values and the `Task` interface includes the `category` field.
- **categories.ts utilities**: Test that `getCategoryConfig` returns the correct config for each category. Test that `CATEGORIES` array has 5 entries with all required fields.
- **useCategoryFilter hook**: Test that the initial state defaults to `'all'`. Test that `setCategoryFilter` updates the state. Test that localStorage is written on each change. Test that loading from localStorage with a valid category works. Test that loading with an invalid value falls back to `'all'`.
- **useTasks hook (updated)**: Test that `addTask` includes the category in the new task. Test backward compatibility: tasks loaded from localStorage without a `category` field default to `'other'`.
- **TaskForm component**: Test that the category selector is rendered with all 5 options. Test that the default selection is "Other". Test that submitting passes both title and category. Test that category resets to "Other" after submission.
- **TaskItem component**: Test that the category badge is rendered with the correct label and colors for each category.
- **CategoryFilter component**: Test that all 6 buttons are rendered (All + 5 categories). Test that clicking a button calls `onCategoryFilterChange` with the correct value. Test that the active filter is visually highlighted.
- **App integration**: Test that category filtering works correctly alone and in combination with status filtering.

### Edge Cases
- Existing tasks in localStorage without a `category` field — should default to `'other'` and display "Other" badge
- Selecting a category filter that has no tasks — should show contextual empty message
- Combining category filter with status filter when intersection is empty — should show empty state
- Rapidly switching between category filters — state should update without race conditions
- Category filter persists across page refreshes via localStorage
- Invalid category filter value in localStorage — should default to `'all'`
- Adding a task while a category filter is active — the new task should appear if it matches the filter, or be invisible if it doesn't (user should be aware)

## Acceptance Criteria
- A category selector dropdown is visible in the task creation form with all 5 options (Work, Personal, Shopping, Health, Other)
- The default category selection is "Other"
- Users can select a category when creating a task
- Tasks display their category as a colored badge (pill-shaped, color-coded)
- Each category has a distinct, easily identifiable color:
  - Work: blue
  - Personal: purple
  - Shopping: green
  - Health: rose/red
  - Other: gray
- A category filter bar is displayed with "All" and each category as filter options
- Clicking a category filter shows only tasks in that category
- Category filtering works in combination with the existing status filter (All/Active/Completed)
- Category filter selection persists to localStorage and is restored on page refresh
- Tasks' categories are persisted with tasks in localStorage
- Existing tasks without a category default to "Other" (backward compatible)
- Empty state messages are contextual when filters yield no results
- Category filter bar is hidden when no tasks exist
- No regressions in existing task CRUD and status filtering functionality
- The UI is responsive and styled consistently with Tailwind CSS

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `npm run build` - Run build to validate the feature compiles with zero TypeScript and Vite errors
- `npm run lint` - Run ESLint to ensure no linting errors in new and existing code
- `npm run format:check` - Verify all files are properly formatted with Prettier
- `npm run dev` - Start development server and manually test the feature
- Test in browser at http://localhost:5173

## Notes
- No new npm dependencies are required. The feature uses only React hooks, the browser localStorage API, and Tailwind CSS utility classes.
- The `TaskCategory` type is placed in `src/types/index.ts` alongside the existing `Task` interface and `FilterStatus` type, maintaining the established pattern.
- The `useCategoryFilter` hook follows the same localStorage persistence pattern established by `useFilter` (using `useState` with lazy initializer + `useEffect` for persistence).
- Category constants and color mappings are centralized in `src/utils/categories.ts` to avoid duplication and make future category additions easy (single source of truth).
- Backward compatibility is handled by defaulting tasks loaded from localStorage without a `category` field to `'other'`. This ensures existing users' tasks are not broken when upgrading.
- The `CategoryFilter` component uses small color dots alongside labels for quick visual identification, even in the filter bar itself.
- The category filter is designed to work in combination with the status filter, so users can do things like "show only active Work tasks".
- Category selection resets to "Other" after each task submission, matching the existing pattern of clearing the title input.
