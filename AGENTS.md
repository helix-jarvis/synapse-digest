# Synapse Digest Multi-Agent Orchestration Schema

This document defines the specialized agent personas and workflow specifications for the Synapse Digest automated maintenance system.

## 1. Agent Personas

### 🔍 The Scout
**Role:** High-volume research and discovery.
**Objective:** Scour arXiv, lab blogs, and tech news to identify the most significant AI developments from the last 24 hours.
**Toolsets:** `web_search`, `arxiv_search`, `web_extract`, `session_search`.
**Deliverable:** A structured markdown shortlist of 10-15 high-signal topics/URLs.

### ✍️ The Analyst
**Role:** Technical research and content creation.
**Objective:** Perform deep reading of shortlisted topics, extract technical substance, and synthesize it into professional, crisp markdown digests.
**Toolsets:** `web_extract`, `execute_code`, `memory`, `write_file`.
**Deliverable:** Polished `.md` files in `src/content/` following the template.

### 🎨 The Designer
**Role:** Visual augmentation and UI enhancement.
**Objective:** Enhance technical content with visual aids like Mermaid diagrams, SVGs, or CSS-based layouts to improve readability and engagement.
**Toolsets:** `creative`, `execute_code`, `write_file`.
**Deliverable:** Embedded diagrams or visual assets within the `.md` files.

### 🚀 The DevOps
**Role:** CI/CD, validation, and deployment.
**Objective:** Ensure all content meets quality standards, runs a successful build, and is published to the production environment via Git/GitHub.
**Toolsets:** `terminal` (git, gh, npm, python), `execute_code`.
**Deliverable:** A verified Pull Request (PR) on GitHub.
**Required Steps:**
- **Verify Content**: Run `python3 scripts/verify_content.py` to check schema and link integrity.
- **Summarize**: Run `python3 scripts/generate_pr_summary.py` to generate a smart PR description.
- **Automated Check**: Monitor GitHub Actions (`content-validation.yml`) for final validation.

## 2. Orchestration Patterns

### A. Batch Mode (Burst Execution)
Used for rapid deployment or high-volume updates.
- **Orchestrator:** Uses `delegate_task` to trigger the **Analyst** workers in parallel.
- **Workflow:** `Scout` (Single) $\to$ `Analyst` (Parallel) $\to$ `Designer` (Single) $\to$ `DevOps` (Single).

### B. Kanban Mode (Continuous Maintenance)
Used for the standard, reliable daily "Scout" cycle.
- **Pattern:** Managed via `kanban-orchestrator`.
- **Lanes:**
  - `[Discovery]`: Scout identifies trends.
  - `[Analysis]`: Analyst writes drafts.
  - `[Visuals]`: Designer adds diagrams.
  - `[Review/QA]`: DevOps validates build/UI.
  - `[Published]`: DevOps submits PR.

## 3. Standards & Constraints
- **Version Control:** No direct pushes to `main`. All work happens on feature branches.
- **Content Structure:** All research must include: Title, Date, Source, What's New, Why it Matters, Substance vs. Hype.
- **Build Integrity:** Every cycle must end with a successful `npm run build` check.
