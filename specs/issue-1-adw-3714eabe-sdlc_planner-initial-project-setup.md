# Chore: Initial project setup with React, TypeScript, and Tailwind

## Metadata
issue_number: `1`
adw_id: `3714eabe`
issue_json: `{"number":1,"title":"Initial project setup with React, TypeScript, and Tailwind","body":"Setup the base project structure with modern tooling.\n\nTasks:\n- [ ] Initialize Vite project with React + TypeScript\n- [ ] Configure TypeScript with strict mode\n- [ ] Add Tailwind CSS for styling\n- [ ] Setup folder structure (components, hooks, utils, types)\n- [ ] Add ESLint and Prettier\n- [ ] Create base App component with sample UI\n- [ ] Configure Vercel deployment settings\n- [ ] Setup ADW infrastructure (.claude/commands, adws/, specs/)\n\nThis is the foundation for all future features."}`

## Chore Description
Complete the initial project setup to establish a robust foundation for the Task Manager application. The project has already been partially initialized with React, TypeScript, Vite, and Tailwind CSS. This chore will finalize the setup by:

1. Verifying and completing the TypeScript strict mode configuration
2. Adding Prettier for consistent code formatting
3. Creating the essential folder structure (components, hooks, utils directories)
4. Verifying Tailwind CSS integration
5. Confirming ESLint configuration is complete
6. Validating the base App component and sample UI
7. Ensuring Vercel deployment configuration is correct
8. Verifying ADW infrastructure is in place

The goal is to have a production-ready development environment that supports the agentic development workflow and modern best practices.

## Relevant Files
Use these files to resolve the chore:

- **package.json** - Contains project dependencies and scripts. Need to verify all required dependencies are present and add Prettier if missing.
- **tsconfig.json** - TypeScript configuration file. Already configured with strict mode enabled (`"strict": true`). Verify all strict settings are properly configured.
- **.eslintrc.cjs** - ESLint configuration. Already exists with recommended settings for TypeScript and React. May need verification.
- **tailwind.config.js** - Tailwind CSS configuration. Already configured with proper content paths. Verify configuration is complete.
- **postcss.config.js** - PostCSS configuration for Tailwind. Verify it exists and is properly configured.
- **vite.config.ts** - Vite build tool configuration. Already configured with React plugin. Verify settings.
- **vercel.json** - Vercel deployment configuration. Already exists with proper build settings. Verify completeness.
- **src/App.tsx** - Main application component. Already has a sample UI with Tailwind classes. Verify it's working properly.
- **src/index.css** - Global styles and Tailwind directives. Verify Tailwind directives are present.
- **src/main.tsx** - Application entry point. Verify it's properly configured.
- **src/types/index.ts** - TypeScript type definitions. Already exists, verify it's set up for future types.
- **.gitignore** - Git ignore file. Verify it includes all necessary patterns.
- **README.md** - Project documentation. Already comprehensive and up-to-date.

### New Files
The following files/directories need to be created:

- **src/components/.gitkeep** - Placeholder to ensure components directory exists in git
- **src/hooks/.gitkeep** - Placeholder to ensure hooks directory exists in git
- **src/utils/.gitkeep** - Placeholder to ensure utils directory exists in git
- **.prettierrc.json** - Prettier configuration file for consistent code formatting
- **.prettierignore** - Prettier ignore file to exclude certain files from formatting
- **specs/.gitkeep** - Placeholder to ensure specs directory exists in git (if not already present)

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Verify TypeScript Configuration
- Read `tsconfig.json` and confirm strict mode is enabled with all recommended strict flags
- Verify the following strict options are present: `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`
- Confirm TypeScript target is ES2020 or higher
- Validate that the configuration includes proper React JSX settings

### 2. Add Prettier Configuration
- Check if Prettier is already installed in `package.json` dev dependencies
- If not present, add `prettier` to dev dependencies in `package.json`
- Create `.prettierrc.json` with standard configuration:
  - semi: true
  - singleQuote: true
  - tabWidth: 2
  - trailingComma: 'es5'
- Create `.prettierignore` to exclude: dist, node_modules, .git, coverage, build
- Add a `format` script to `package.json`: `"format": "prettier --write \"src/**/*.{ts,tsx,css}\""`
- Add a `format:check` script to `package.json`: `"format:check": "prettier --check \"src/**/*.{ts,tsx,css}\""`

### 3. Create Essential Folder Structure
- Create `src/components/` directory with a `.gitkeep` file to preserve the directory in git
- Create `src/hooks/` directory with a `.gitkeep` file to preserve the directory in git
- Create `src/utils/` directory with a `.gitkeep` file to preserve the directory in git
- Verify `src/types/` directory already exists with `index.ts` file
- Ensure `specs/` directory exists at project root with a `.gitkeep` file if empty

### 4. Verify ESLint Configuration
- Read `.eslintrc.cjs` and confirm it has the recommended presets for TypeScript and React
- Verify it includes: `eslint:recommended`, `plugin:@typescript-eslint/recommended`, `plugin:react-hooks/recommended`
- Confirm the lint script exists in `package.json`
- Ensure ESLint is configured to ignore `dist` and `.eslintrc.cjs` itself

### 5. Verify Tailwind CSS Integration
- Read `src/index.css` and confirm Tailwind directives are present (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`)
- Read `tailwind.config.js` and verify content paths include all React files (`"./index.html"`, `"./src/**/*.{js,ts,jsx,tsx}"`)
- Read `postcss.config.js` and confirm it includes Tailwind and Autoprefixer plugins
- Verify `src/App.tsx` uses Tailwind classes for styling

### 6. Validate Base App Component
- Read `src/App.tsx` and confirm it has a functional sample UI
- Verify the component uses Tailwind CSS classes for styling
- Confirm the component demonstrates basic React functionality (like the counter example)
- Ensure the UI displays project information and technology stack

### 7. Verify Vercel Deployment Configuration
- Read `vercel.json` and confirm it has correct build settings:
  - buildCommand: `npm run build`
  - outputDirectory: `dist`
  - devCommand: `npm run dev`
  - installCommand: `npm install`
  - framework: `vite`
- Verify the configuration matches Vite's output structure

### 8. Confirm ADW Infrastructure
- Verify `.claude/commands/` directory exists with all necessary command files:
  - feature.md, bug.md, chore.md, patch.md
  - implement.md, review.md, document.md
  - commit.md, pull_request.md
  - install.md, prime.md, start.md, test.md
  - generate_branch_name.md, classify_issue.md, conditional_docs.md
- Verify `adws/` directory exists with ADW scripts:
  - adw_plan.py, adw_build.py, adw_plan_build.py
  - adw_modules/ directory with core modules
- Confirm `specs/` directory exists for storing implementation plans

### 9. Update Project Documentation
- Read `README.md` and verify it contains:
  - Project overview and purpose
  - Technology stack information
  - ADW workflow explanation
  - Getting started instructions
  - Available commands documentation
  - Project structure overview
- Ensure all information is accurate and up-to-date

### 10. Run Validation Commands
- Execute all validation commands listed below to ensure zero regressions
- Verify all commands complete successfully without errors
- Fix any issues that arise during validation

## Validation Commands
Execute every command to validate the chore is complete with zero regressions.

- `npm install` - Install all dependencies to verify package.json is correct
- `npm run lint` - Run ESLint to ensure no linting errors in the codebase
- `npm run build` - Build the project to verify TypeScript compilation and Vite configuration
- `npm run format:check` - Verify all files are properly formatted (after Prettier is added)
- `node -e "console.log('TypeScript strict mode:', require('./tsconfig.json').compilerOptions.strict)"` - Confirm strict mode is enabled
- `ls -la src/components src/hooks src/utils src/types` - Verify all folder structure exists
- `test -f .prettierrc.json && echo "Prettier config exists" || echo "Prettier config missing"` - Verify Prettier config file exists
- `test -f vercel.json && echo "Vercel config exists" || echo "Vercel config missing"` - Verify Vercel config exists
- `ls -la .claude/commands | grep -c ".md"` - Count command files to ensure all ADW commands are present

## Notes
- Most of the initial setup has already been completed. This chore focuses on verification and filling in the missing pieces (Prettier, folder structure).
- The project is already using Vite + React 18 + TypeScript with strict mode enabled.
- Tailwind CSS is already integrated with proper configuration.
- ESLint is configured with TypeScript and React presets.
- The ADW infrastructure (.claude/commands and adws/) is already in place.
- Vercel deployment configuration is already set up correctly.
- The main additions needed are: Prettier configuration, folder structure (components, hooks, utils), and final validation.
- After completing this chore, the project will be ready for feature implementation using the agentic workflow.
- All subsequent features should follow the plan → build → test workflow using the ADW scripts.
