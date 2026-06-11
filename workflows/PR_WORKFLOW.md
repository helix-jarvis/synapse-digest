# SynapseDigest PR Workflow

To ensure site stability and a clean main branch, all changes must follow this workflow.

## 🛠️ The Workflow

### 1. Feature Development
- **Create a branch**: Always work on a dedicated feature branch.
  `git checkout -b feature/name-of-feature`
- **Develop**: Make your changes and commit them locally.
  `git add . && git commit -m "description of changes"`

### 2. Verification (The "Vercel Preview" Step)
- **Deploy Preview**: Before merging, trigger a Vercel preview build.
  `npx vercel` (This will prompt you to log in/select project if not already configured).
- **Review**: Inspect the provided preview URL (`https://*-jarvis-projects4.vercel.app.vercel.app`) to ensure the UI and content are perfect.
- **Run Tests**: (If applicable) Run `npm run build` locally to catch any compilation errors.

### 3. Pull Request & Merge
- **Push Branch**: Push your feature branch to GitHub.
  `git push origin feature/name-of-feature`
- **Open PR**: Open a Pull Request on GitHub.
- **Final Check**: Verify the Vercel deployment for that specific PR (if integrated with GitHub) is green.
- **Merge**: Once verified, merge the branch into `main`.
  `git checkout main && git merge feature/name-of-feature && git push origin main`

## ⚠️ Rules
- **NEVER** push directly to `main`.
- **NEVER** merge a PR that has build errors or broken preview links.
- **ALWAYS** use descriptive branch names (e.g., `feature/new-ui`, `fix/broken-link`).
