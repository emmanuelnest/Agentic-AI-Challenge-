# Feature: Implement Dark Mode Toggle

## Metadata
issue_number: `12`
adw_id: `6555d412`
issue_json: `{"number":12,"title":"Implement dark mode toggle","body":"Add a dark mode theme that users can toggle.\n\n**User Story**:\nAs a user\nI want to switch between light and dark themes\nSo that I can use the app comfortably in different lighting conditions\n\n**Requirements**:\n- [ ] Create ThemeContext for theme management\n- [ ] Add theme toggle button in header\n- [ ] Update all components with dark mode styles\n- [ ] Persist theme preference in localStorage\n- [ ] Use system preference as default\n- [ ] Smooth transition between themes\n\n**Acceptance Criteria**:\n- Toggle button switches between light/dark themes\n- All UI elements are readable in both themes\n- Theme preference persists after refresh\n- Respects system theme preference on first load\n- Smooth transition animation when switching themes\n\n**Design Notes**:\n- Use Tailwind's dark mode utilities\n- Ensure proper contrast in both themes\n- Add sun/moon icon for theme toggle\n- Consider accessibility (WCAG AA compliance)"}`

## Feature Description
Add a dark mode toggle to the Task Manager application. Users will be able to switch between light and dark themes via a toggle button in the header area. The feature uses Tailwind CSS's built-in `dark:` variant with the `class` strategy, toggling a `dark` class on the `<html>` element. The theme preference is persisted in localStorage and defaults to the user's system preference (`prefers-color-scheme`) on first visit. A smooth CSS transition animates the color changes when switching themes. The toggle button displays a sun icon (in dark mode) or moon icon (in light mode) for intuitive UX. All existing components are updated with `dark:` Tailwind utilities to ensure proper contrast and readability in both themes, meeting WCAG AA compliance.

## User Story
As a user
I want to switch between light and dark themes
So that I can use the app comfortably in different lighting conditions

## Problem Statement
The application currently only supports a light theme with hardcoded light colors (gray-100 background, white cards, gray-800 text). Users who prefer dark interfaces — or who use the app in low-light environments — have no way to reduce visual strain. Additionally, the app does not respect the user's operating system theme preference, creating a jarring experience for users with system-wide dark mode enabled.

## Solution Statement
Implement a theme system using Tailwind CSS's `dark:` class variant. A `useTheme` custom hook will manage the theme state, reading from localStorage on load (with system preference as the fallback default), and toggling the `dark` class on the `<html>` element. A `ThemeToggle` component in the header will let users switch themes with a sun/moon icon button. All existing components (`App`, `TaskForm`, `TaskItem`, `TaskFilter`, `CategoryFilter`, `TaskList`) will be updated with `dark:` Tailwind classes for backgrounds, text colors, borders, and interactive states. A CSS `transition` on `background-color` and `color` will provide smooth visual feedback during theme changes.

## Relevant Files
Use these files to implement the feature:

- **`tailwind.config.js`** — Must be updated to enable `darkMode: 'class'` so that Tailwind's `dark:` variant is controlled by a `dark` class on the root element rather than `prefers-color-scheme` media query.
- **`src/index.css`** — Global CSS file. Needs a transition rule for smooth theme switching and cleanup of default Vite dark-mode styles that would conflict.
- **`index.html`** — The root HTML file. The `dark` class will be toggled on the `<html>` element by the theme hook.
- **`src/App.tsx`** — Main application component. Needs dark mode Tailwind classes on the container and header, and will render the `ThemeToggle` component.
- **`src/components/TaskForm.tsx`** — Task creation form. Needs `dark:` classes on the input, select, and button elements.
- **`src/components/TaskItem.tsx`** — Individual task display. Needs `dark:` classes on the list item container, text, checkbox, category badge, and delete button.
- **`src/components/TaskFilter.tsx`** — Status filter bar. Needs `dark:` classes on buttons and text elements.
- **`src/components/CategoryFilter.tsx`** — Category filter bar. Needs `dark:` classes on buttons and text elements.
- **`src/components/TaskList.tsx`** — Task list container. Needs `dark:` class on the empty state text.
- **`src/utils/categories.ts`** — Category color constants. Needs `dark:` color variants added for category badge backgrounds and text colors in dark mode.
- **`src/types/index.ts`** — TypeScript types. Will be extended with `Theme` type.

### New Files
- **`src/hooks/useTheme.ts`** — Custom hook to manage theme state: reads from localStorage, falls back to system preference, toggles `dark` class on `<html>`, and persists changes.
- **`src/components/ThemeToggle.tsx`** — Toggle button component with sun/moon SVG icons, accessible label, and smooth rotation animation on click.
- **`.claude/commands/e2e/test_dark_mode.md`** — E2E test script to validate the dark mode feature end-to-end.

## Implementation Plan
### Phase 1: Foundation
Configure Tailwind for class-based dark mode by adding `darkMode: 'class'` to `tailwind.config.js`. Define the `Theme` type in `src/types/index.ts`. Create the `useTheme` custom hook that manages theme state with localStorage persistence and system preference detection. Add global CSS transitions for smooth theme switching. Clean up conflicting default Vite styles in `index.css`.

### Phase 2: Core Implementation
1. Create the `ThemeToggle` component with sun/moon SVG icons and accessible button markup.
2. Update `App.tsx` to use the `useTheme` hook and render the `ThemeToggle` in the header.
3. Add `dark:` Tailwind classes to every component: `App`, `TaskForm`, `TaskItem`, `TaskFilter`, `CategoryFilter`, `TaskList`.
4. Update category color constants in `categories.ts` with dark mode variants.

### Phase 3: Integration
1. Verify all components render correctly in both light and dark themes.
2. Test localStorage persistence of theme preference.
3. Test system preference detection on first load.
4. Test smooth transition animations between themes.
5. Run full validation suite to ensure zero regressions.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Create E2E Test Script
- Create `.claude/commands/e2e/test_dark_mode.md` with the following validation steps:
  - Start the dev server with `npm run dev`
  - Open `http://localhost:5173` in the browser
  - **Test default theme (system preference):**
    - Clear localStorage and reload the page
    - Verify the app respects the system's `prefers-color-scheme` setting
    - Take a screenshot of the initial state
  - **Test theme toggle button:**
    - Verify the theme toggle button is visible in the header area
    - Verify it shows a moon icon in light mode (indicating "switch to dark")
    - Click the toggle button
    - Verify the theme switches to dark mode
    - Verify the icon changes to a sun icon (indicating "switch to light")
    - Take a screenshot in dark mode
  - **Test dark mode appearance:**
    - Verify the page background changes to a dark color (dark gray/slate)
    - Verify the header text is light-colored and readable
    - Verify task cards have dark backgrounds with light text
    - Verify the input field and select dropdown have dark backgrounds
    - Verify the "Add" button is still visible with appropriate contrast
    - Verify category badges are readable in dark mode
    - Verify filter buttons are readable in dark mode
    - Take a screenshot showing task list in dark mode
  - **Test switching back to light mode:**
    - Click the toggle button again
    - Verify the theme switches back to light mode
    - Verify all elements return to their light mode appearance
    - Take a screenshot in light mode
  - **Test smooth transitions:**
    - Observe that background and text color changes have a smooth transition (not an abrupt switch)
  - **Test persistence:**
    - Switch to dark mode
    - Refresh the page
    - Verify the app loads in dark mode (preference persisted)
    - Switch to light mode
    - Refresh the page
    - Verify the app loads in light mode (preference persisted)
    - Take a screenshot after refresh
  - **Test accessibility:**
    - Verify the toggle button has an accessible label (aria-label)
    - Verify contrast ratios meet WCAG AA in both themes
    - Take a screenshot

### 2. Add `Theme` Type
- Open `src/types/index.ts`
- Add `export type Theme = 'light' | 'dark';` after the existing type definitions

### 3. Configure Tailwind for Class-Based Dark Mode
- Open `tailwind.config.js`
- Add `darkMode: 'class'` to the config object so Tailwind's `dark:` variant is triggered by a `dark` class on the root element

### 4. Update Global CSS for Theme Transitions
- Open `src/index.css`
- Replace the default Vite `:root` styles that conflict with the Tailwind-managed theme
- Keep only font-related settings in `:root`
- Add a `*` rule with `transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;` to apply smooth transitions to all elements during theme switching
- Keep the `body` and `#root` styles as they are

### 5. Create `useTheme` Custom Hook
- Create file `src/hooks/useTheme.ts`
- Define `THEME_STORAGE_KEY` constant as `"task-manager-theme"`
- Implement a `getSystemTheme()` helper function:
  - Use `window.matchMedia('(prefers-color-scheme: dark)')` to detect system preference
  - Return `'dark'` if the media query matches, otherwise `'light'`
- Implement a `loadTheme()` helper function:
  - Read from localStorage using `THEME_STORAGE_KEY`
  - If the stored value is `'light'` or `'dark'`, return it
  - Otherwise, return `getSystemTheme()` as the default
- Implement the `useTheme` hook:
  - Use `useState<Theme>` with lazy initializer calling `loadTheme()`
  - Use `useEffect` to:
    - Add or remove the `dark` class on `document.documentElement` based on the current theme
    - Persist the theme to localStorage
  - Expose a `toggleTheme` function that toggles between `'light'` and `'dark'`
  - Return `{ theme, toggleTheme }`
- Import `Theme` from `../types`

### 6. Create `ThemeToggle` Component
- Create file `src/components/ThemeToggle.tsx`
- Import `Theme` from `../types`
- Accept props:
  - `theme: Theme` — the current theme
  - `onToggle: () => void` — callback to toggle the theme
- Render a `<button>` with:
  - `aria-label` set to `"Switch to dark mode"` or `"Switch to light mode"` based on current theme
  - `onClick` bound to `onToggle`
  - Tailwind classes for styling: `p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 transition-colors`
- Render SVG icons inline:
  - **Moon icon** (shown in light mode — indicates "switch to dark"): a crescent moon SVG, 20x20, with `fill="none"` and `stroke="currentColor"`
  - **Sun icon** (shown in dark mode — indicates "switch to light"): a sun SVG with rays, 20x20, with `fill="none"` and `stroke="currentColor"`
- Use a conditional render: `theme === 'light' ? <MoonIcon /> : <SunIcon />`

### 7. Update `App.tsx` — Integrate Theme Hook and Toggle
- Import `useTheme` from `./hooks/useTheme`
- Import `ThemeToggle` from `./components/ThemeToggle`
- Call `useTheme()` to get `{ theme, toggleTheme }`
- Update the root `<div>` class: change `bg-gray-100` to `bg-gray-100 dark:bg-gray-900` and add `transition-colors`
- Update the header `<h1>` class: change `text-gray-800` to `text-gray-800 dark:text-gray-100`
- Add a header container wrapping the `<h1>` and `<ThemeToggle>`:
  - Use a `<div>` with `flex items-center justify-between mb-8`
  - Move `<h1>` inside (remove its `mb-8` and `text-center`, keep other classes)
  - Place `<ThemeToggle theme={theme} onToggle={toggleTheme} />` at the end
- Pass `theme` and `toggleTheme` to `ThemeToggle`

### 8. Update `TaskForm` with Dark Mode Classes
- Open `src/components/TaskForm.tsx`
- Update the text input classes: add `dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400`
- Update the select dropdown classes: add `dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100`
- The "Add" button uses `bg-blue-500` / `hover:bg-blue-600` which work fine in both themes — no dark changes needed

### 9. Update `TaskItem` with Dark Mode Classes
- Open `src/components/TaskItem.tsx`
- Update the `<li>` container classes: add `dark:bg-gray-800 dark:border-gray-700` after the existing `bg-white` and `border-gray-100`
- Update the task title `<span>`: change the non-completed text `text-gray-800` to `text-gray-800 dark:text-gray-100`, and the completed text `text-gray-400` to `text-gray-400 dark:text-gray-500`
- Update the checkbox classes: add `dark:border-gray-600`
- Update the delete button: add `dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20`

### 10. Update `TaskFilter` with Dark Mode Classes
- Open `src/components/TaskFilter.tsx`
- Update the "remaining" count `<span>`: add `dark:text-gray-400` to the existing `text-gray-500`
- Update filter buttons:
  - Active state (`bg-blue-500 text-white`) works in both themes — no change
  - Inactive state: add `dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700`
- Update the "Clear completed" button: add `dark:text-red-400 dark:hover:text-red-300`

### 11. Update `CategoryFilter` with Dark Mode Classes
- Open `src/components/CategoryFilter.tsx`
- Update the "Category:" label `<span>`: add `dark:text-gray-400`
- Update the "All" button:
  - Active state: add `dark:bg-gray-700 dark:text-gray-200`
  - Inactive state: add `dark:text-gray-400 dark:hover:text-gray-200`
- Update category buttons:
  - Inactive state: add `dark:text-gray-400 dark:hover:text-gray-200`
  - Active state uses category bgColor/textColor which will be updated in categories.ts

### 12. Update `categories.ts` with Dark Mode Variant Colors
- Open `src/utils/categories.ts`
- Add `darkBgColor` and `darkTextColor` fields to each category entry:
  - Work: `darkBgColor: 'dark:bg-blue-900/40'`, `darkTextColor: 'dark:text-blue-300'`
  - Personal: `darkBgColor: 'dark:bg-purple-900/40'`, `darkTextColor: 'dark:text-purple-300'`
  - Shopping: `darkBgColor: 'dark:bg-green-900/40'`, `darkTextColor: 'dark:text-green-300'`
  - Health: `darkBgColor: 'dark:bg-rose-900/40'`, `darkTextColor: 'dark:text-rose-300'`
  - Other: `darkBgColor: 'dark:bg-gray-700/40'`, `darkTextColor: 'dark:text-gray-300'`
- Update the type definition of the `CATEGORIES` array to include these new fields
- Update `TaskItem.tsx` category badge `<span>` to include `${categoryConfig.darkBgColor} ${categoryConfig.darkTextColor}` in the class string
- Update `CategoryFilter.tsx` active category button to include dark mode colors from the category config

### 13. Update `TaskList` with Dark Mode Classes
- Open `src/components/TaskList.tsx`
- Update the empty message `<p>` container: add `dark:text-gray-500` to the existing `text-gray-400`

### 14. Run Validation Commands
- Execute all validation commands listed below to ensure zero regressions
- Fix any TypeScript, ESLint, formatting, or build errors that arise
- Verify the app works correctly in the browser at `http://localhost:5173`
- Run the E2E test to validate the dark mode feature end-to-end

## Testing Strategy
### Unit Tests
- **Theme type**: Verify the `Theme` type accepts `'light'` and `'dark'` values only.
- **useTheme hook**: Test that initial state defaults to system preference when localStorage is empty. Test that it reads from localStorage when a value is stored. Test that `toggleTheme` switches between `'light'` and `'dark'`. Test that the `dark` class is added/removed from `document.documentElement`. Test that the theme is persisted to localStorage on change.
- **ThemeToggle component**: Test that the moon icon renders in light mode. Test that the sun icon renders in dark mode. Test that clicking the button calls `onToggle`. Test that `aria-label` updates correctly.
- **Dark mode classes on components**: Verify all components include `dark:` Tailwind classes for backgrounds, text, and borders. Verify that the dark classes produce appropriate contrast.

### Edge Cases
- System preference is "dark" but user has previously saved "light" to localStorage — localStorage should win
- System preference is "light" but user has previously saved "dark" to localStorage — localStorage should win
- No localStorage value and no system preference support — should default to `'light'`
- Corrupted or invalid value in localStorage for theme — should fall back to system preference
- `prefers-color-scheme` changes while the app is open — the user's explicit choice should persist (no auto-switch after manual toggle)
- Transition CSS should not cause layout shifts or flash of unstyled content on page load
- Theme toggle should be keyboard-accessible (focusable, activatable with Enter/Space)
- Category badges must be readable in both light and dark themes

## Acceptance Criteria
- A theme toggle button is visible in the header area with a sun or moon icon
- Clicking the toggle button switches between light and dark themes
- In dark mode: page background is dark, text is light, cards have dark backgrounds, inputs have dark backgrounds
- In light mode: appearance matches the current design (no regressions)
- All UI elements (text, buttons, inputs, badges, filters) are readable and have sufficient contrast in both themes
- The toggle button has an accessible `aria-label` that updates based on the current theme
- Theme preference is persisted in localStorage and restored on page refresh
- On first visit (no localStorage value), the app respects the system's `prefers-color-scheme` setting
- Smooth CSS transition animates background, text, and border color changes when switching themes
- Category badges maintain their distinct colors and readability in both themes
- Filter buttons, status counts, and "Clear completed" link are readable in both themes
- No regressions in existing task CRUD, filtering, or category functionality
- The UI is responsive and styled consistently with Tailwind CSS in both themes
- The feature compiles with zero TypeScript errors and passes ESLint/Prettier checks

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `npm run build` - Run build to validate the feature compiles with zero TypeScript and Vite errors
- `npm run lint` - Run ESLint to ensure no linting errors in new and existing code
- `npm run format:check` - Verify all files are properly formatted with Prettier
- `npm run dev` - Start development server and manually test the feature
- Test in browser at http://localhost:5173

## Notes
- No new npm dependencies are required. The feature uses Tailwind's built-in `dark:` variant, React hooks, the browser localStorage API, and `window.matchMedia` for system preference detection.
- Tailwind's `darkMode: 'class'` strategy is chosen over `'media'` because it allows explicit user control via a toggle, while still supporting system preference as the default.
- The `useTheme` hook follows the same localStorage persistence pattern established by `useFilter` and `useCategoryFilter` (using `useState` with lazy initializer + `useEffect` for persistence).
- SVG icons for sun/moon are inlined in the `ThemeToggle` component to avoid adding icon library dependencies. They use `currentColor` for stroke so they inherit the button's text color.
- The CSS transition on `*` is scoped to `background-color`, `color`, and `border-color` only (not `all`) to avoid unintended animation of other properties like `transform` or `opacity`.
- The `dark` class is toggled on `document.documentElement` (the `<html>` element) so that Tailwind's `dark:` variant applies globally to all descendants.
- The default Vite styles in `index.css` include `color-scheme: light dark` and dark background which conflict with Tailwind-managed theming and must be cleaned up.
- Category dark mode colors use opacity-based backgrounds (`bg-blue-900/40`) to blend with the dark card background rather than solid colors, creating a more cohesive dark theme appearance.
