# Chore: Initial Project Setup with React, TypeScript, and Tailwind

## Metadata
issue_number: `1`
adw_id: `276d3d2a`
issue_json: `{"number":1,"title":"Initial project setup with React, TypeScript, and Tailwind","body":"Setup the base project structure with modern tooling.\n\nTasks:\n- [ ] Initialize Vite project with React + TypeScript\n- [ ] Configure TypeScript with strict mode\n- [ ] Add Tailwind CSS for styling\n- [ ] Setup folder structure (components, hooks, utils, types)\n- [ ] Add ESLint and Prettier\n- [ ] Create base App component with sample UI\n- [ ] Configure Vercel deployment settings\n- [ ] Setup ADW infrastructure (.claude/commands, adws/, specs/)\n\nThis is the foundation for all future features."}`

## Chore Description
This chore establishes the foundational project structure for the Task Manager application. While the basic Vite + React + TypeScript setup already exists, this task focuses on completing the remaining missing components: adding Prettier configuration for code formatting consistency, creating the complete folder structure (components, hooks, utils subdirectories), and ensuring all tooling configurations are optimal for the project's needs. The goal is to have a production-ready base that follows modern React development best practices with strict TypeScript enforcement, consistent code formatting, and a well-organized directory structure that will support future feature development.

## Relevant Files
Use these files to resolve the chore:

- **package.json** - Contains project dependencies and scripts. Need to verify Prettier is added as a dev dependency.
- **tsconfig.json** - TypeScript configuration with strict mode already enabled. Verify all strict settings are optimal.
- **tailwind.config.js** - Tailwind CSS configuration. Already configured but should verify content paths are complete.
- **.eslintrc.cjs** - ESLint configuration. Already configured with TypeScript and React rules. May need Prettier integration.
- **vercel.json** - Vercel deployment configuration. Already exists and configured properly.
- **src/App.tsx** - Main application component. Already has basic UI with Tailwind classes.
- **src/index.css** - Global styles with Tailwind directives. Already exists.
- **src/types/index.ts** - TypeScript type definitions directory. Already exists but may be empty.
- **README.md** - Project documentation. Already comprehensive with ADW workflow documentation.
- **.claude/commands/** - Claude Code slash commands. Already configured with all ADW commands.
- **adws/** - AI Developer Workflows scripts. Already configured with complete ADW infrastructure.
- **specs/** - Implementation plans directory. Already exists with this plan.

### New Files
- **.prettierrc** - Prettier configuration file for consistent code formatting across the project.
- **.prettierignore** - File patterns to exclude from Prettier formatting (dist, node_modules, etc.).
- **src/components/.gitkeep** - Placeholder to ensure components directory is tracked by git.
- **src/hooks/.gitkeep** - Placeholder to ensure hooks directory is tracked by git.
- **src/utils/.gitkeep** - Placeholder to ensure utils directory is tracked by git.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Add Prettier Configuration
- Install Prettier as a dev dependency using npm
- Create `.prettierrc` file with standard React/TypeScript formatting rules (2-space indentation, single quotes, semicolons, trailing commas, line width 100)
- Create `.prettierignore` file to exclude dist, node_modules, coverage, and build artifacts
- Add Prettier scripts to package.json: `format` for formatting all files and `format:check` for CI validation
- Install `eslint-config-prettier` to disable ESLint rules that conflict with Prettier
- Update `.eslintrc.cjs` to extend `prettier` configuration to prevent conflicts

### 2. Complete Folder Structure
- Create `src/components/` directory with a `.gitkeep` file to ensure it's tracked in git
- Create `src/hooks/` directory with a `.gitkeep` file to ensure it's tracked in git
- Create `src/utils/` directory with a `.gitkeep` file to ensure it's tracked in git
- Verify `src/types/` directory exists (already created)
- Ensure all directories are properly tracked in version control

### 3. Verify and Optimize TypeScript Configuration
- Review `tsconfig.json` to ensure all strict mode options are enabled (already done)
- Verify compiler options are optimal for React development
- Ensure path aliases are not needed at this stage (can be added later if required)
- Confirm TypeScript is catching type errors properly

### 4. Verify ESLint Configuration
- Confirm ESLint is configured with TypeScript parser and React plugins (already done)
- Ensure ESLint rules are appropriate for the project
- Verify ESLint + Prettier integration works without conflicts
- Test that `npm run lint` executes successfully

### 5. Verify Tailwind CSS Configuration
- Review `tailwind.config.js` to ensure all source paths are included in content array (already configured)
- Verify `src/index.css` contains proper Tailwind directives (already done)
- Confirm Tailwind classes are working in the App component (already verified)
- Ensure PostCSS configuration is correct for Tailwind processing

### 6. Verify Base App Component
- Review `src/App.tsx` to confirm it demonstrates React + TypeScript + Tailwind working together (already done)
- Ensure the component shows the project is properly set up with all technologies
- Verify the UI renders correctly with Tailwind styling

### 7. Verify Vercel Deployment Configuration
- Review `vercel.json` to confirm build settings are correct (already configured)
- Ensure build command, output directory, and framework settings are optimal
- Verify configuration will support production deployment

### 8. Verify ADW Infrastructure
- Confirm `.claude/commands/` directory exists with all required command files (already done)
- Verify `adws/` directory contains all ADW Python scripts (already configured)
- Ensure `specs/` directory exists for implementation plans (already exists)
- Confirm ADW workflows are operational

### 9. Format All Code with Prettier
- Run Prettier on all source files to ensure consistent formatting
- Execute `npm run format` to format all TypeScript, TSX, CSS, and JSON files
- Verify no formatting issues remain

### 10. Run Validation Commands
- Execute all validation commands listed below to ensure zero regressions
- Verify TypeScript compilation succeeds
- Confirm ESLint passes with no errors
- Ensure Prettier formatting is consistent
- Test that the development server starts successfully
- Validate production build completes without errors

## Validation Commands
Execute every command to validate the chore is complete with zero regressions.

- `npm run lint` - Verify ESLint passes with zero errors or warnings
- `npm run format:check` - Verify all files are properly formatted with Prettier
- `npm run build` - Ensure production build completes successfully with no TypeScript errors
- `npm run dev` - Confirm development server starts (then manually verify app loads at http://localhost:5173)
- `npx tsc --noEmit` - Verify TypeScript compilation with no errors (separate from build)

## Notes
- The project already has most of the infrastructure in place from the initial setup commit
- This chore focuses on completing the missing pieces: Prettier configuration and folder structure
- Prettier integration with ESLint is critical to prevent formatting conflicts
- The `.gitkeep` files are temporary placeholders that will be removed once actual files are added to those directories
- All ADW infrastructure (.claude/commands, adws/, specs/) is already configured and operational
- The base App component already demonstrates React + TypeScript + Tailwind working correctly
- Vercel deployment configuration is already complete and ready for production use
- Future features will build upon this solid foundation with clear separation of concerns (components, hooks, utils, types)
