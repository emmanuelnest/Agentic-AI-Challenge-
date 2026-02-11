# Feature: Implement Core Task Management Functionality

## Metadata
issue_number: `5`
adw_id: `738bc9db`
issue_json: `{"number":5,"title":"Implement core task management functionality","body":"Add the basic task management features that allow users to create, view, complete, and delete tasks.\n\n**User Story**:\nAs a user\nI want to create and manage tasks\nSo that I can keep track of things I need to do\n\n**Requirements**:\n- [ ] Create Task interface/type with id, title, completed, createdAt\n- [ ] Add task creation form with input field and submit button\n- [ ] Display list of tasks with proper styling\n- [ ] Mark tasks as complete/incomplete with checkbox\n- [ ] Delete individual tasks with button\n- [ ] Persist tasks to localStorage\n- [ ] Load tasks from localStorage on app start\n\n**Acceptance Criteria**:\n- User can add a new task by typing and pressing Enter or clicking Add button\n- Tasks appear in a list below the input\n- User can toggle task completion status\n- User can delete tasks\n- Tasks persist after page refresh\n- Empty state message when no tasks exist\n\n**Tech Notes**:\n- Use React hooks (useState, useEffect) for state management\n- Use localStorage API for persistence\n- Generate unique IDs for tasks (can use crypto.randomUUID() or Date.now())\n- Keep components simple and functional"}`

## Feature Description
Implement the core task management functionality for the Task Manager application. This feature transforms the initial placeholder UI into a fully functional task management interface where users can create new tasks, view them in a list, toggle their completion status, and delete them. All task data is persisted to localStorage so tasks survive page refreshes and browser restarts. This is the foundational feature that all subsequent features (filtering, categories, dark mode) will build upon.

## User Story
As a user
I want to create and manage tasks
So that I can keep track of things I need to do

## Problem Statement
The application currently shows only a placeholder UI with a counter button. There is no actual task management functionality — users cannot create, view, complete, or delete tasks. The app needs its core CRUD functionality to deliver value as a task manager.

## Solution Statement
Build a complete task management UI with a creation form, task list display, completion toggle, and delete functionality. Use a custom React hook (`useTasks`) to encapsulate all task state management and localStorage persistence logic. Create modular, reusable components (`TaskForm`, `TaskItem`, `TaskList`) that follow the existing Tailwind CSS styling patterns. The `Task` type already exists in `src/types/index.ts` and will be used as-is.

## Relevant Files
Use these files to implement the feature:

- **`src/types/index.ts`** - Already contains the `Task` interface with `id`, `title`, `completed`, and `createdAt` fields. No changes needed.
- **`src/App.tsx`** - Main application component. Will be rewritten to use the new task management components instead of the placeholder counter UI.
- **`src/index.css`** - Global styles with Tailwind directives. Already configured, no changes needed.
- **`src/main.tsx`** - Application entry point. Already configured, no changes needed.
- **`package.json`** - Project dependencies and scripts. No new dependencies needed.
- **`tailwind.config.js`** - Tailwind CSS configuration. Already configured, no changes needed.
- **`tsconfig.json`** - TypeScript configuration with strict mode. Already configured, no changes needed.

### New Files
- **`src/hooks/useTasks.ts`** - Custom hook to manage task state (CRUD operations) and localStorage persistence.
- **`src/components/TaskForm.tsx`** - Component with input field and submit button for creating new tasks.
- **`src/components/TaskItem.tsx`** - Component to render a single task with checkbox toggle and delete button.
- **`src/components/TaskList.tsx`** - Component to render the list of tasks or an empty state message.
- **`.claude/commands/e2e/test_task_management.md`** - E2E test script to validate core task management functionality.

## Implementation Plan
### Phase 1: Foundation
Set up the localStorage utility logic and the custom `useTasks` hook that encapsulates all task state management. This hook will be the single source of truth for task data and will handle reading from and writing to localStorage. The `Task` type already exists in `src/types/index.ts` and requires no changes.

### Phase 2: Core Implementation
Build the three UI components:
1. **TaskForm** - A controlled input with an "Add" button that calls the hook's `addTask` function. Supports both Enter key and button click submission. Validates that the input is not empty/whitespace.
2. **TaskItem** - Renders a single task with a checkbox (for toggling completion), the task title (with strikethrough styling when completed), and a delete button.
3. **TaskList** - Renders the array of `TaskItem` components or displays an empty state message ("No tasks yet. Add one above!") when the list is empty.

### Phase 3: Integration
Rewrite `src/App.tsx` to compose the new components together. Remove the placeholder counter UI. Wire up the `useTasks` hook in `App` and pass the necessary props down to child components. Validate the full end-to-end flow works including localStorage persistence across page refreshes.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Create E2E Test Script
- Create `.claude/commands/e2e/test_task_management.md` with the following validation steps:
  - Start the dev server with `npm run dev`
  - Open `http://localhost:5173` in the browser
  - Verify the task creation form is visible (input field + "Add" button)
  - Verify empty state message is displayed ("No tasks yet. Add one above!")
  - Type a task title and click "Add" — verify the task appears in the list
  - Type another task title and press Enter — verify it also appears
  - Click the checkbox on a task — verify it toggles to completed (strikethrough styling)
  - Click the checkbox again — verify it toggles back to incomplete
  - Click the delete button on a task — verify it is removed from the list
  - Refresh the page — verify tasks persist after refresh
  - Delete all tasks — verify empty state message reappears
  - Take screenshots at key steps to document the feature

### 2. Create the `useTasks` Custom Hook
- Create file `src/hooks/useTasks.ts`
- Define `STORAGE_KEY` constant as `"task-manager-tasks"`
- Implement a helper function to load tasks from localStorage:
  - Parse the JSON string from localStorage
  - Convert `createdAt` strings back to `Date` objects
  - Return an empty array if nothing is stored or if parsing fails
- Implement the `useTasks` hook that returns:
  - `tasks`: the current array of `Task` objects
  - `addTask(title: string)`: creates a new task with `crypto.randomUUID()` for ID, the given title, `completed: false`, and `createdAt: new Date()`
  - `toggleTask(id: string)`: toggles the `completed` boolean of the task with the given ID
  - `deleteTask(id: string)`: removes the task with the given ID from the array
- Use `useState` with a lazy initializer to load tasks from localStorage on first render
- Use `useEffect` to persist tasks to localStorage whenever the `tasks` array changes (serialize `Date` objects to ISO strings via `JSON.stringify`)
- Export the hook as default

### 3. Create the `TaskForm` Component
- Create file `src/components/TaskForm.tsx`
- Accept prop: `onAddTask: (title: string) => void`
- Render a `<form>` with:
  - A text `<input>` with placeholder "What needs to be done?", controlled by local `useState`
  - An "Add" `<button>` of type `submit`
- On form submit:
  - Prevent default form behavior
  - Trim the input value
  - If not empty, call `onAddTask(trimmedValue)` and clear the input
  - If empty, do nothing
- Style with Tailwind:
  - Form: `flex gap-2`
  - Input: `flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`
  - Button: `px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium`

### 4. Create the `TaskItem` Component
- Create file `src/components/TaskItem.tsx`
- Accept props:
  - `task: Task`
  - `onToggle: (id: string) => void`
  - `onDelete: (id: string) => void`
- Render a `<li>` containing:
  - A checkbox `<input type="checkbox">` that reflects `task.completed` and calls `onToggle(task.id)` on change
  - A `<span>` with the task title — apply `line-through text-gray-400` classes when completed, `text-gray-800` when not
  - A delete `<button>` with a "Delete" label that calls `onDelete(task.id)`
- Style with Tailwind:
  - Li: `flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 group`
  - Checkbox: `w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer`
  - Title span: `flex-1` plus conditional strikethrough/color classes
  - Delete button: `px-3 py-1 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100` (appears on hover)

### 5. Create the `TaskList` Component
- Create file `src/components/TaskList.tsx`
- Accept props:
  - `tasks: Task[]`
  - `onToggle: (id: string) => void`
  - `onDelete: (id: string) => void`
- If `tasks.length === 0`, render an empty state:
  - A `<div>` with `text-center py-12 text-gray-400`
  - A `<p>` with the message "No tasks yet. Add one above!"
- Otherwise, render a `<ul>` with `space-y-2` class containing a `TaskItem` for each task, keyed by `task.id`

### 6. Update `App.tsx` to Compose Components
- Rewrite `src/App.tsx`:
  - Import `useTasks` from `./hooks/useTasks`
  - Import `TaskForm` from `./components/TaskForm`
  - Import `TaskList` from `./components/TaskList`
  - Call the `useTasks` hook to get `tasks`, `addTask`, `toggleTask`, `deleteTask`
  - Render the layout:
    - Outer container: `min-h-screen bg-gray-100 py-8 px-4`
    - Inner container: `max-w-2xl mx-auto`
    - Header: `<h1>` with "Task Manager" text, styled `text-3xl font-bold text-gray-800 mb-8 text-center`
    - A `<div>` wrapping `TaskForm` and `TaskList` with `space-y-6`
    - Pass `addTask` to `TaskForm` as `onAddTask`
    - Pass `tasks`, `toggleTask`, and `deleteTask` to `TaskList` as `onToggle` and `onDelete`
  - Remove the old placeholder counter UI entirely

### 7. Remove `.gitkeep` Files from Populated Directories
- Delete `src/components/.gitkeep` (directory now has real files)
- Delete `src/hooks/.gitkeep` (directory now has real files)

### 8. Run Validation Commands
- Execute all validation commands listed below to ensure zero regressions
- Fix any TypeScript, lint, or build errors that arise
- Verify the app works correctly in the browser at `http://localhost:5173`

## Testing Strategy
### Unit Tests
- **useTasks hook**: Test that `addTask` creates a task with correct fields, `toggleTask` flips the `completed` flag, `deleteTask` removes the task, and localStorage is updated on each operation.
- **TaskForm component**: Test that submitting with text calls `onAddTask` with trimmed value and clears the input; submitting with empty/whitespace input does not call `onAddTask`.
- **TaskItem component**: Test that the checkbox reflects `task.completed`, clicking it calls `onToggle`, and clicking delete calls `onDelete`.
- **TaskList component**: Test that it renders `TaskItem` for each task, and renders the empty state message when the array is empty.

### Edge Cases
- Adding a task with only whitespace should be rejected (not create a task)
- Rapidly adding/deleting tasks should not cause state inconsistencies
- localStorage containing invalid JSON should not crash the app (graceful fallback to empty array)
- Very long task titles should not break the layout (CSS should handle overflow with `break-words` or truncation)
- `createdAt` dates should survive JSON serialization/deserialization round-trip correctly

## Acceptance Criteria
- User can type a task title and press Enter or click the "Add" button to create a new task
- New tasks appear immediately in the list below the input form
- Each task displays a checkbox, the task title, and a delete button (visible on hover)
- Clicking a task's checkbox toggles its completed state (strikethrough styling when completed)
- Clicking a task's delete button removes it from the list
- All tasks persist to localStorage and are restored on page refresh
- When no tasks exist, an empty state message ("No tasks yet. Add one above!") is displayed
- The input field is cleared after successfully adding a task
- Empty or whitespace-only input is not accepted as a valid task
- The UI is responsive and styled consistently with Tailwind CSS

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `npm run build` - Run build to validate the feature compiles with zero TypeScript and Vite errors
- `npm run lint` - Run ESLint to ensure no linting errors in new and existing code
- `npm run format:check` - Verify all files are properly formatted with Prettier
- `npm run dev` - Start development server and manually test the feature
- Test in browser at http://localhost:5173

## Notes
- The `Task` interface already exists in `src/types/index.ts` with the exact fields required (`id`, `title`, `completed`, `createdAt`). No modifications needed.
- No new npm dependencies are required. The feature uses only React hooks, the browser localStorage API, and `crypto.randomUUID()` (available in all modern browsers).
- The `createdAt` field is typed as `Date` in the interface. When serializing to localStorage with `JSON.stringify`, it becomes an ISO string. The `useTasks` hook must convert it back to a `Date` object when loading from localStorage.
- The delete button uses a `group-hover:opacity-100` pattern — it's invisible by default and appears when the user hovers over the task row. This keeps the UI clean.
- This feature establishes the component patterns (props interface, Tailwind styling, hook-based state) that future features (filtering, categories, dark mode) will follow.
- Future features will extend this foundation: filtering will read the `completed` field, categories will add a `category` field to the `Task` type, and dark mode will update the Tailwind classes.
