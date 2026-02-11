# Feature: Add Task Filtering Capabilities

## Metadata
issue_number: `7`
adw_id: `c293924e`
issue_json: `{"number":7,"title":"Add task filtering capabilities","body":"Allow users to filter tasks by their completion status.\n\n**User Story**:\nAs a user\nI want to filter my tasks by status\nSo that I can focus on active tasks or review completed ones\n\n**Requirements**:\n- [ ] Add filter buttons: All, Active, Completed\n- [ ] Show task count (e.g., \"3 tasks remaining\")\n- [ ] Add \"Clear completed\" button\n- [ ] Update UI to show current filter state\n- [ ] Persist filter selection in localStorage\n\n**Acceptance Criteria**:\n- Clicking \"All\" shows all tasks\n- Clicking \"Active\" shows only incomplete tasks\n- Clicking \"Completed\" shows only completed tasks\n- Task count updates dynamically\n- \"Clear completed\" button removes all completed tasks\n- Filter selection persists after refresh\n\n**Design Notes**:\n- Filter buttons should be clearly visible\n- Active filter should be highlighted\n- Use Tailwind classes for styling"}`

## Feature Description
Add task filtering capabilities to the Task Manager application. This feature introduces a filter bar below the task list with three filter options (All, Active, Completed), a dynamic task count showing the number of remaining active tasks, and a "Clear completed" button to bulk-remove all completed tasks. The active filter selection is persisted to localStorage so it survives page refreshes. This builds directly on the core task management functionality implemented in issue #5, leveraging the existing `completed` field on the `Task` type.

## User Story
As a user
I want to filter my tasks by status
So that I can focus on active tasks or review completed ones

## Problem Statement
Currently, all tasks are displayed in a single list regardless of their completion status. As the number of tasks grows, users cannot easily separate active tasks from completed ones. There is also no way to bulk-remove completed tasks or see at a glance how many tasks remain to be done.

## Solution Statement
Add a `TaskFilter` component rendered below the task list that provides three filter buttons (All, Active, Completed), a task count display, and a "Clear completed" button. Introduce a `useFilter` custom hook to manage filter state and localStorage persistence. Extend the existing `useTasks` hook with a `clearCompleted` function. The `App` component will apply the active filter to the task array before passing it to `TaskList`, so the existing `TaskList` and `TaskItem` components require no changes.

## Relevant Files
Use these files to implement the feature:

- **`src/types/index.ts`** - Contains the `Task` interface. Will be extended with a `FilterStatus` type union for the filter options.
- **`src/hooks/useTasks.ts`** - Custom hook for task state management. Will be extended with a `clearCompleted` function to remove all completed tasks.
- **`src/App.tsx`** - Main application component. Will be updated to integrate the filter hook, apply filtering logic, and render the new `TaskFilter` component.
- **`src/components/TaskList.tsx`** - Task list component. Will receive filtered tasks (no internal changes needed, but empty state message will need to account for filter context).
- **`src/components/TaskItem.tsx`** - Individual task component. No changes needed.
- **`src/components/TaskForm.tsx`** - Task creation form. No changes needed.
- **`package.json`** - Project dependencies. No new dependencies needed.

### New Files
- **`src/hooks/useFilter.ts`** - Custom hook to manage the active filter state and persist it to localStorage.
- **`src/components/TaskFilter.tsx`** - Component rendering the filter buttons, task count, and "Clear completed" button.
- **`.claude/commands/e2e/test_task_filtering.md`** - E2E test script to validate the filtering feature.

## Implementation Plan
### Phase 1: Foundation
Define the `FilterStatus` type in `src/types/index.ts`. Create the `useFilter` custom hook to manage filter state with localStorage persistence. Add the `clearCompleted` method to the existing `useTasks` hook.

### Phase 2: Core Implementation
Build the `TaskFilter` component that renders:
1. Three filter buttons (All, Active, Completed) with the active filter visually highlighted.
2. A task count showing remaining active tasks (e.g., "3 tasks remaining").
3. A "Clear completed" button that only appears when there are completed tasks.

### Phase 3: Integration
Update `App.tsx` to:
1. Use the `useFilter` hook to manage filter state.
2. Derive the filtered task list based on the active filter.
3. Render the `TaskFilter` component between the `TaskForm` and `TaskList`, passing all necessary props.
4. Update the `TaskList` empty state to be contextual (different message when no tasks exist vs. when filter has no matching tasks).

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Create E2E Test Script
- Create `.claude/commands/e2e/test_task_filtering.md` with the following validation steps:
  - Start the dev server with `npm run dev`
  - Open `http://localhost:5173` in the browser
  - Add 3 tasks: "Task A", "Task B", "Task C"
  - Mark "Task A" and "Task C" as completed
  - Verify all 3 tasks are visible (default "All" filter)
  - Verify task count shows "1 task remaining"
  - Click "Active" filter button — verify only "Task B" is visible
  - Verify "Active" button is highlighted
  - Click "Completed" filter button — verify only "Task A" and "Task C" are visible
  - Click "All" filter button — verify all 3 tasks are visible again
  - Click "Clear completed" button — verify "Task A" and "Task C" are removed
  - Verify task count shows "1 task remaining"
  - Verify "Clear completed" button is no longer visible (no completed tasks left)
  - Refresh the page — verify filter selection persists after refresh
  - Take screenshots at key steps to document the feature

### 2. Add `FilterStatus` Type
- Open `src/types/index.ts`
- Add `export type FilterStatus = 'all' | 'active' | 'completed';` below the existing `Task` interface

### 3. Create the `useFilter` Custom Hook
- Create file `src/hooks/useFilter.ts`
- Define `FILTER_STORAGE_KEY` constant as `"task-manager-filter"`
- Implement a helper function `loadFilter()` to load the filter from localStorage:
  - Read the value from localStorage using `FILTER_STORAGE_KEY`
  - Validate it is one of `'all'`, `'active'`, or `'completed'`
  - Return `'all'` as default if nothing is stored or value is invalid
- Implement the `useFilter` hook that returns:
  - `filter`: the current `FilterStatus` value
  - `setFilter(filter: FilterStatus)`: updates the filter state
- Use `useState` with lazy initializer calling `loadFilter()`
- Use `useEffect` to persist the filter to localStorage whenever it changes
- Export the hook as default

### 4. Add `clearCompleted` to `useTasks` Hook
- Open `src/hooks/useTasks.ts`
- Add a `clearCompleted` function inside the hook:
  - `const clearCompleted = () => { setTasks((prev) => prev.filter((task) => !task.completed)); }`
- Add `clearCompleted` to the returned object: `return { tasks, addTask, toggleTask, deleteTask, clearCompleted };`

### 5. Create the `TaskFilter` Component
- Create file `src/components/TaskFilter.tsx`
- Accept props:
  - `filter: FilterStatus` — the currently active filter
  - `onFilterChange: (filter: FilterStatus) => void` — callback when filter changes
  - `activeCount: number` — number of incomplete tasks
  - `completedCount: number` — number of completed tasks
  - `onClearCompleted: () => void` — callback to clear completed tasks
- Render a container `<div>` with the following layout:
  - Left section: task count text — e.g., "3 tasks remaining" (or "1 task remaining" for singular)
  - Center section: three filter buttons — "All", "Active", "Completed"
    - The active filter button should have a distinct highlighted style (e.g., `bg-blue-500 text-white`)
    - Inactive buttons should have a muted style (e.g., `text-gray-600 hover:text-gray-800`)
  - Right section: "Clear completed" button
    - Only render when `completedCount > 0`
    - Style: `text-sm text-red-500 hover:text-red-700 hover:underline`
- Style the container with Tailwind:
  - `flex items-center justify-between py-3 px-1 text-sm`
- Define the filter options as a constant array to map over: `[{ key: 'all', label: 'All' }, { key: 'active', label: 'Active' }, { key: 'completed', label: 'Completed' }]`

### 6. Update `TaskList` Empty State Message
- Open `src/components/TaskList.tsx`
- Add a new optional prop `emptyMessage?: string` to `TaskListProps`
- Use `emptyMessage` (defaulting to `"No tasks yet. Add one above!"`) in the empty state `<p>` tag
- This allows `App.tsx` to pass a contextual message depending on the active filter

### 7. Update `App.tsx` to Integrate Filtering
- Open `src/App.tsx`
- Import `useFilter` from `./hooks/useFilter`
- Import `TaskFilter` from `./components/TaskFilter`
- Import `FilterStatus` from `./types`
- Call `useFilter()` to get `filter` and `setFilter`
- Destructure `clearCompleted` from the `useTasks()` call
- Compute derived values:
  - `activeCount`: `tasks.filter((t) => !t.completed).length`
  - `completedCount`: `tasks.filter((t) => t.completed).length`
  - `filteredTasks`: based on `filter` value:
    - `'all'` → `tasks`
    - `'active'` → `tasks.filter((t) => !t.completed)`
    - `'completed'` → `tasks.filter((t) => t.completed)`
- Compute `emptyMessage` based on context:
  - If `tasks.length === 0`: `"No tasks yet. Add one above!"`
  - If `filter === 'active'`: `"No active tasks."`
  - If `filter === 'completed'`: `"No completed tasks."`
  - Default: `"No tasks yet. Add one above!"`
- Render `TaskFilter` between `TaskForm` and `TaskList`:
  - Pass `filter`, `onFilterChange={setFilter}`, `activeCount`, `completedCount`, `onClearCompleted={clearCompleted}`
  - Only render `TaskFilter` when `tasks.length > 0` (hide filter bar when there are no tasks at all)
- Pass `filteredTasks` instead of `tasks` to `TaskList`
- Pass `emptyMessage` to `TaskList`

### 8. Run Validation Commands
- Execute all validation commands listed below to ensure zero regressions
- Fix any TypeScript, ESLint, formatting, or build errors that arise
- Verify the app works correctly in the browser at `http://localhost:5173`

## Testing Strategy
### Unit Tests
- **useFilter hook**: Test that the initial state defaults to `'all'`, `setFilter` updates the state, and localStorage is written on each change. Test that loading from localStorage with a valid value works, and loading with an invalid value falls back to `'all'`.
- **TaskFilter component**: Test that clicking each filter button calls `onFilterChange` with the correct value. Test that the active filter button has the highlighted style. Test that "Clear completed" is not rendered when `completedCount === 0`. Test that task count text uses correct singular/plural form.
- **useTasks clearCompleted**: Test that calling `clearCompleted` removes all completed tasks and leaves active tasks untouched.
- **App filtering integration**: Test that changing the filter correctly filters the displayed tasks.

### Edge Cases
- All tasks are completed — "Active" filter should show empty state, "Clear completed" should remove all tasks
- No tasks are completed — "Completed" filter should show empty state, "Clear completed" button should not appear
- No tasks exist — filter bar should not be rendered at all
- Single task remaining — task count should say "1 task remaining" (singular)
- Multiple tasks remaining — task count should say "N tasks remaining" (plural)
- Clearing completed tasks while on "Completed" filter — should show empty state for completed
- localStorage contains invalid filter value (e.g., "deleted") — should default to `'all'`
- Rapidly clicking filter buttons — state should update correctly without race conditions

## Acceptance Criteria
- Clicking "All" shows all tasks regardless of completion status
- Clicking "Active" shows only incomplete tasks
- Clicking "Completed" shows only completed tasks
- The active filter button is visually highlighted (distinct from inactive buttons)
- Task count displays dynamically (e.g., "3 tasks remaining", "1 task remaining")
- "Clear completed" button appears only when there are completed tasks
- Clicking "Clear completed" removes all completed tasks from the list
- Filter bar is hidden when there are no tasks at all
- Filter selection persists to localStorage and is restored on page refresh
- Empty state messages are contextual based on the active filter
- No regressions in existing task CRUD functionality
- The UI is responsive and styled consistently with Tailwind CSS

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `npm run build` - Run build to validate the feature compiles with zero TypeScript and Vite errors
- `npm run lint` - Run ESLint to ensure no linting errors in new and existing code
- `npm run format:check` - Verify all files are properly formatted with Prettier
- `npm run dev` - Start development server and manually test the feature
- Test in browser at http://localhost:5173

## Notes
- No new npm dependencies are required. The feature uses only React hooks and the browser localStorage API.
- The `FilterStatus` type is intentionally placed in `src/types/index.ts` alongside the `Task` interface to maintain the existing pattern of co-locating types.
- The `useFilter` hook follows the same localStorage persistence pattern established by `useTasks` (using `useState` with lazy initializer + `useEffect` for persistence).
- The `TaskFilter` component conditionally renders "Clear completed" only when there are completed tasks, keeping the UI clean.
- The filter bar is hidden entirely when no tasks exist, as filtering an empty list serves no purpose.
- The `TaskList` component receives an optional `emptyMessage` prop to support contextual empty state messages without coupling the list component to filter logic.
- Future features (categories/tags) may add additional filter dimensions — the current approach is extensible by adding new filter types and hooks.
