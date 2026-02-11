# Task Manager - Agentic AI Challenge

A modern task management application built entirely using AI agents following the **plan → build → test** workflow.

🔗 **Live Demo**: [https://agentic-ai-challenge-git-fea-a0ce12-emmanuels-projects-d12ad1b8.vercel.app/](https://agentic-ai-challenge-git-fea-a0ce12-emmanuels-projects-d12ad1b8.vercel.app/)

## 🎯 Project Overview

This project is part of the **Agentic AI Challenge**, demonstrating how AI agents can autonomously handle the entire software development lifecycle - from planning to implementation to deployment.

### Key Features (To Be Implemented)
- ✅ Task creation, editing, and deletion
- ✅ Task filtering (All, Active, Completed)
- ✅ Task categories/tags
- ✅ Dark mode toggle
- ✅ LocalStorage persistence
- ✅ Responsive design

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + LocalStorage
- **Build Tool**: Vite
- **Deployment**: Vercel
- **AI Development**: Claude Code CLI + Custom ADWs

## 🤖 Agentic Development Workflow

This project uses **AI Developer Workflows (ADWs)** to automate development:

1. **Create GitHub Issue** - Define what needs to be built
2. **ADW Processes Issue** - AI agent analyzes the requirement
3. **Generate Plan** - Creates detailed implementation spec in `specs/`
4. **Implement Solution** - AI writes the code
5. **Create Pull Request** - Automatically opens PR with changes

### ADW Structure

```
.claude/
├── commands/           # Slash commands (/feature, /chore, etc.)
│   ├── install.md      # Project setup and initialization
│   ├── prime.md        # Understand codebase
│   ├── start.md        # Start dev server
│   ├── test.md         # Run validation tests
│   ├── feature.md      # Plan new features
│   ├── bug.md          # Plan bug fixes
│   ├── patch.md        # Quick fixes
│   ├── implement.md    # Execute plans
│   ├── review.md       # Review implementations
│   ├── document.md     # Generate documentation
│   ├── commit.md       # Create git commits
│   ├── pull_request.md # Create PRs
│   ├── generate_branch_name.md
│   ├── classify_issue.md
│   └── conditional_docs.md
├── hooks/             # Git hooks (optional)
└── settings.json      # Permissions and configuration

adws/
├── adw_modules/       # Core ADW functionality
│   ├── agent.py       # Claude Code integration
│   ├── github.py      # GitHub API operations
│   ├── git_ops.py     # Git operations
│   └── workflow_ops.py # Workflow orchestration
├── adw_plan.py        # Planning phase
├── adw_build.py       # Implementation phase
└── adw_plan_build.py  # Combined workflow

specs/                 # Generated implementation plans
├── patch/            # Patch plans for quick fixes
└── *.md              # Feature and bug plans

app_docs/             # Generated feature documentation
└── assets/           # Screenshots and images
```

### Available Commands

Use these slash commands in Claude Code:

**Setup & Development:**
- `/install` - Initialize project and install dependencies
- `/prime` - Understand the codebase structure
- `/start` - Start the development server

**Planning:**
- `/feature` - Plan a new feature from GitHub issue
- `/bug` - Plan a bug fix from GitHub issue
- `/chore` - Plan maintenance tasks
- `/patch` - Create quick fix plan

**Implementation:**
- `/implement <plan-path>` - Execute an implementation plan
- `/test` - Run validation suite (TypeScript, ESLint, build)
- `/review <adw-id> <spec-path>` - Review implementation against spec

**Git Operations:**
- `/commit` - Create a git commit with proper message
- `/pull_request` - Create a pull request

**Documentation:**
- `/document <adw-id> <spec-path>` - Generate feature documentation

**Utilities:**
- `/classify_issue <issue-json>` - Classify GitHub issue type
- `/generate_branch_name <type> <adw-id> <issue-json>` - Generate branch name

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/bun
- Python 3.10+
- uv (Python package manager): `curl -LsSf https://astral.sh/uv/install.sh | sh`
- GitHub CLI: `brew install gh` (then `gh auth login`)
- Claude Code CLI: [Installation Guide](https://docs.anthropic.com/en/docs/claude-code)

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:emmanuelnest/Agentic-AI-Challenge-.git
   cd Agentic-AI-Challenge-
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Setup ADWs environment**
   ```bash
   cp .env.sample .env
   # Edit .env with your API keys
   ```

4. **Install ADW dependencies**
   ```bash
   cd adws
   uv sync
   ```

### Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit [http://localhost:5173](http://localhost:5173)

## 🛠️ Using ADWs

### Process a GitHub Issue

```bash
cd adws/

# Set environment variables
export GITHUB_REPO_URL="https://github.com/emmanuelnest/Agentic-AI-Challenge-"
export ANTHROPIC_API_KEY="your-api-key"

# Process an issue (plan + build)
uv run adw_plan_build.py <issue-number>

# Or run phases separately
uv run adw_plan.py <issue-number>  # Planning only
uv run adw_build.py <issue-number> <adw-id>  # Build only
```

### Example Workflow

1. Create issue #1: "Add task list functionality"
2. Run: `uv run adw_plan_build.py 1`
3. ADW will:
   - Analyze the issue
   - Generate implementation plan in `specs/`
   - Create feature branch
   - Implement the code
   - Create pull request
4. Review and merge the PR
5. Repeat for next issue!

## 📋 Planned Issues

Here are the issues to implement sequentially:

### Issue #1: Initial Project Setup
**Type**: `/chore`
```markdown
Setup base project with Vite + React + TypeScript

- Initialize Vite project ✅ (done manually)
- Configure TypeScript strict mode ✅
- Add Tailwind CSS for styling ✅
- Setup basic folder structure ✅
- Create base App component ✅
```

### Issue #2: Task List Core Feature
**Type**: `/feature`
```markdown
Implement core task management functionality

- Create Task interface/type
- Add task creation form
- Display task list
- Mark tasks as complete/incomplete
- Delete tasks
- Persist to localStorage
```

### Issue #3: Task Filtering
**Type**: `/feature`
```markdown
Add task filtering capabilities

- Filter by: All, Active, Completed
- Show task count
- Clear completed tasks button
```

### Issue #4: Task Categories
**Type**: `/feature`
```markdown
Add categories/tags to tasks

- Add category field to tasks
- Category selector in form
- Filter by category
- Color-coded categories
```

### Issue #5: Dark Mode
**Type**: `/feature`
```markdown
Implement dark mode toggle

- Add theme context
- Create toggle button
- Update all styles for dark theme
- Persist preference in localStorage
```

### Issue #6: Deployment
**Type**: `/chore`
```markdown
Deploy to Vercel

- Connect GitHub repo to Vercel
- Configure build settings
- Test production deployment
- Add deployment URL to README
```

## 📁 Project Structure

```
task-manager-challenge/
├── .claude/              # Claude Code configuration
│   ├── commands/         # Custom slash commands
│   └── hooks/           # Git hooks
├── adws/                # AI Developer Workflows
│   ├── adw_modules/     # Core modules
│   └── *.py            # Workflow scripts
├── specs/               # Implementation plans
├── src/                 # React application
│   ├── components/      # React components
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript types
├── public/             # Static assets
└── dist/               # Build output
```

## 🎓 Challenge Requirements

This project fulfills the **Agentic AI Challenge** requirements:

✅ **Development based on Issues**
- All features implemented via GitHub issues
- Each issue processed by ADWs
- Commit history shows agent-driven development

✅ **Demonstrable Agentic Layer**
- `.claude/commands/` - Custom slash commands
- `adws/` - AI Developer Workflows
- `specs/` - Generated implementation plans

✅ **Vercel Deployment**
- Configured for Vercel deployment
- Production-ready build
- Publicly accessible

## 📧 Submission

**Email to**: agentic.challenge@patagonian.com

**Subject**: Agentic AI Challenge

**Content**:
- GitHub Issue URL: `https://github.com/emmanuelnest/Agentic-AI-Challenge-/issues/X`
- Vercel URL: `https://agentic-ai-challenge-git-fea-a0ce12-emmanuels-projects-d12ad1b8.vercel.app/`
- Repository URL: `https://github.com/emmanuelnest/Agentic-AI-Challenge-`

## 🔒 Environment Variables

Create a `.env` file in the `adws/` directory:

```bash
GITHUB_REPO_URL=https://github.com/emmanuelnest/Agentic-AI-Challenge-
GITHUB_PAT=your_github_token
ANTHROPIC_API_KEY=your_anthropic_key
```

## 📝 License

MIT License - Feel free to use this as a template for your own agentic projects!

## 🙏 Acknowledgments

Built with [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) and the AI Developer Workflow pattern learned in the TAC Agentic Coding course.

---

**Note**: This project demonstrates AI-driven development. Each feature is implemented by AI agents following the plan → build → test workflow, with human oversight for quality control.