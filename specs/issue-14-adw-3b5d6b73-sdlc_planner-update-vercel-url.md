# Chore: Change Vercel URL

## Metadata
issue_number: `14`
adw_id: `3b5d6b73`
issue_json: `{"number":14,"title":"Change Vercer URL","body":"The vercel URL mentioned in the readme is incorrect. The correct one is: https://agentic-ai-challenge-snowy.vercel.app/\n"}`

## Chore Description
The Vercel URL referenced in the README.md file is incorrect and needs to be updated to the correct production URL. Currently, the README contains an old/incorrect Vercel deployment URL that should be replaced with `https://agentic-ai-challenge-snowy.vercel.app/` throughout the file.

This is a simple documentation update to ensure users and reviewers can access the correct live demo of the application.

## Relevant Files
Use these files to resolve the chore:

- `README.md` (lines 5, 314) - Contains the incorrect Vercel URL that needs to be updated
  - Line 5: Live Demo link in the header section
  - Line 314: Vercel URL in the Submission section
  - Both instances need to be replaced with the correct URL: `https://agentic-ai-challenge-snowy.vercel.app/`

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Update Live Demo URL in Header Section
- Replace the incorrect Vercel URL on line 5 with `https://agentic-ai-challenge-snowy.vercel.app/`
- Ensure the markdown link formatting remains intact

### 2. Update Vercel URL in Submission Section
- Replace the incorrect Vercel URL on line 314 with `https://agentic-ai-challenge-snowy.vercel.app/`
- Ensure the markdown formatting remains intact

### 3. Verify All URL References
- Search the README.md for any other instances of the old Vercel URL
- Confirm all Vercel URL references are updated to the correct URL

### 4. Validate Changes
- Run the `Validation Commands` to validate the chore is complete with zero regressions

## Validation Commands
Execute every command to validate the chore is complete with zero regressions.

- `grep -n "agentic-ai-challenge-snowy.vercel.app" README.md` - Verify the correct URL appears in the README
- `grep -n "agentic-ai-challenge-git-fea-a0ce12-emmanuels-projects-d12ad1b8.vercel.app" README.md` - Verify the old URL no longer appears in the README
- `npm run build` - Ensure the project still builds successfully

## Notes
- This is a simple documentation update with no code changes
- The chore only affects the README.md file
- No functional changes to the application
- The old URL was: `https://agentic-ai-challenge-git-fea-a0ce12-emmanuels-projects-d12ad1b8.vercel.app/`
- The new URL is: `https://agentic-ai-challenge-snowy.vercel.app/`
