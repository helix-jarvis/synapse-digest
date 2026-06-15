# SKILL: ui-qa-reviewer

## DESCRIPTION
Specialized skill for visual and UX auditing of the `synapse-digest` web application. It ensures design consistency and accessibility, specifically targeting color scheme integrity in both light and dark themes.

## GOAL
Automate the verification of the user interface against a high-quality design standard (e.g., Apple's design language) to prevent regressions in readability and color consistency.

## WORKFLOW
1. **Capture**: Execute a headless browser session to take full-page screenshots of the application in both `light` and `dark` modes.
2. **Vision Audit**: Analyze screenshots using a Vision LLM to detect:
    - **Contrast Issues**: Low visibility of text against backgrounds in light mode.
    - **Color Inconsistency**: Deviations from the defined design tokens or "Apple-like" aesthetic.
    - **Layout Shifts**: Visual regressions in component placement.
3. **Report**: Generate a summary of findings (Pass/Warning/Fail) and flag critical readability issues for the **Designer** agent to fix.

## CONSTRAINTS
- **Mode Switching**: Must explicitly force `light` and `dark` themes (e.g., via `class="light"` or system preference simulation).
- **Focus Area**: Prioritize color contrast and component clarity.
- **Decision Rule**: Any "Critical" contrast failure must block the **DevOps** deployment stage.

## TOOLS REQUIRED
- `terminal`: To run local build and headless browser scripts (Playwright/Puppeteer).
- `vision_analyze`: To perform the visual inspection of captured screenshots.

## PITFALLS
- **Dynamic Content**: Large data sets might cause scrolling issues; use full-page screenshots.
- **Non-deterministic Layouts**: Minor font rendering differences between environments can cause false positives in pixel-diffing; focus on semantic visual properties (color/contrast) rather than raw pixel comparison.
