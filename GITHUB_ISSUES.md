# GitHub Issues to Create

Create these issues in order on your GitHub repository. Each will be processed by the ADW system.

## Issue #1: Initial Project Setup ✅

**Status**: DONE (created manually)

**Type**: Chore

**Title**: Initial project setup with React, TypeScript, and Tailwind

**Body**:
```markdown
Setup the base project structure with modern tooling.

Tasks:
- [x] Initialize Vite project with React + TypeScript
- [x] Configure TypeScript with strict mode
- [x] Add Tailwind CSS for styling
- [x] Setup folder structure (components, hooks, utils, types)
- [x] Add ESLint and Prettier
- [x] Create base App component with sample UI
- [x] Configure Vercel deployment settings
- [x] Setup ADW infrastructure (.claude/commands, adws/, specs/)

This is the foundation for all future features.
```

---

## Issue #2: Task List Core Feature

**Type**: Feature

**Title**: Implement core task management functionality

**Body**:
```markdown
Add the basic task management features that allow users to create, view, complete, and delete tasks.

**User Story**:
As a user
I want to create and manage tasks
So that I can keep track of things I need to do

**Requirements**:
- [ ] Create Task interface/type with id, title, completed, createdAt
- [ ] Add task creation form with input field and submit button
- [ ] Display list of tasks with proper styling
- [ ] Mark tasks as complete/incomplete with checkbox
- [ ] Delete individual tasks with button
- [ ] Persist tasks to localStorage
- [ ] Load tasks from localStorage on app start

**Acceptance Criteria**:
- User can add a new task by typing and pressing Enter or clicking Add button
- Tasks appear in a list below the input
- User can toggle task completion status
- User can delete tasks
- Tasks persist after page refresh
- Empty state message when no tasks exist

**Tech Notes**:
- Use React hooks (useState, useEffect) for state management
- Use localStorage API for persistence
- Generate unique IDs for tasks (can use crypto.randomUUID() or Date.now())
- Keep components simple and functional
```

---

## Issue #3: Task Filtering

**Type**: Feature

**Title**: Add task filtering capabilities

**Body**:
```markdown
Allow users to filter tasks by their completion status.

**User Story**:
As a user
I want to filter my tasks by status
So that I can focus on active tasks or review completed ones

**Requirements**:
- [ ] Add filter buttons: All, Active, Completed
- [ ] Show task count (e.g., "3 tasks remaining")
- [ ] Add "Clear completed" button
- [ ] Update UI to show current filter state
- [ ] Persist filter selection in localStorage

**Acceptance Criteria**:
- Clicking "All" shows all tasks
- Clicking "Active" shows only incomplete tasks
- Clicking "Completed" shows only completed tasks
- Task count updates dynamically
- "Clear completed" button removes all completed tasks
- Filter selection persists after refresh

**Design Notes**:
- Filter buttons should be clearly visible
- Active filter should be highlighted
- Use Tailwind classes for styling
```

---

## Issue #4: Task Categories

**Type**: Feature

**Title**: Add categories/tags to tasks

**Body**:
```markdown
Enable users to categorize their tasks for better organization.

**User Story**:
As a user
I want to assign categories to my tasks
So that I can organize them by project or context

**Requirements**:
- [ ] Add category field to Task type
- [ ] Create category selector in task creation form
- [ ] Display category badges on tasks
- [ ] Add category filter alongside status filters
- [ ] Use color coding for different categories
- [ ] Predefined categories: Work, Personal, Shopping, Health, Other

**Acceptance Criteria**:
- Users can select a category when creating a task
- Tasks display their category with a colored badge
- Users can filter tasks by category
- Categories are persisted with tasks
- Each category has a distinct color

**Design Notes**:
- Use Tailwind color utilities for category badges
- Make category selection optional (default to "Other")
- Categories should be easily scannable
```

---

## Issue #5: Dark Mode

**Type**: Feature

**Title**: Implement dark mode toggle

**Body**:
```markdown
Add a dark mode theme that users can toggle.

**User Story**:
As a user
I want to switch between light and dark themes
So that I can use the app comfortably in different lighting conditions

**Requirements**:
- [ ] Create ThemeContext for theme management
- [ ] Add theme toggle button in header
- [ ] Update all components with dark mode styles
- [ ] Persist theme preference in localStorage
- [ ] Use system preference as default
- [ ] Smooth transition between themes

**Acceptance Criteria**:
- Toggle button switches between light/dark themes
- All UI elements are readable in both themes
- Theme preference persists after refresh
- Respects system theme preference on first load
- Smooth transition animation when switching themes

**Design Notes**:
- Use Tailwind's dark mode utilities
- Ensure proper contrast in both themes
- Add sun/moon icon for theme toggle
- Consider accessibility (WCAG AA compliance)
```

---

## Issue #6: Vercel Deployment

**Type**: Chore

**Title**: Deploy application to Vercel

**Body**:
```markdown
Setup and deploy the application to Vercel for public access.

**Tasks**:
- [ ] Connect GitHub repository to Vercel
- [ ] Configure build settings (npm run build)
- [ ] Set output directory to 'dist'
- [ ] Test production build locally
- [ ] Deploy to Vercel
- [ ] Verify deployment is working
- [ ] Update README with live URL
- [ ] Test all features on production

**Acceptance Criteria**:
- App is accessible via public Vercel URL
- All features work correctly in production
- README contains the live URL
- Build completes without errors
- No console errors in production

**Notes**:
- vercel.json is already configured
- Use Vercel dashboard for deployment
- May need to trigger manual deployment if needed
```

---

## How to Use These Issues

1. **Copy each issue** (starting with #2) to your GitHub repository
2. **Run ADW** for each issue:
   ```bash
   cd adws
   uv run adw_plan_build.py <issue-number>
   ```
3. **Review the PR** that gets created automatically
4. **Merge the PR** once satisfied
5. **Move to next issue**

## Tips

- Create one issue at a time
- Wait for each to be implemented and merged before creating the next
- Review generated plans in `specs/` directory
- Check commits to see agent work
- Adjust issues if needed based on results

## Expected Timeline

- Issue #2 (Core Features): ~30-45 minutes
- Issue #3 (Filtering): ~20-30 minutes
- Issue #4 (Categories): ~30-40 minutes
- Issue #5 (Dark Mode): ~25-35 minutes
- Issue #6 (Deployment): ~15-20 minutes

**Total**: ~2-3 hours of agent work + your review time
