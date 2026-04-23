You are rebuilding a portfolio website from two reference projects.

IMPORTANT RULES:
- Only write and modify code inside /src
- Do NOT modify files inside /reference
- Use /reference only to inspect and extract logic
- Use assets only from /assets
- Use project data only from /data/projects.js

GOAL:
Create a unified portfolio site using:
- UI system from portfolio-site
- content, logo, and project data from oks-design-site

HOMEPAGE BEHAVIOR:
- Show main title initially
- Show project names at the bottom
- On hover over project name:
  - show preview panel
  - update image, title, description
  - update accent color
- Keep title visible (do not fully replace it)

NAVIGATION:
- Home / About Me / Contact
- Fourth item shows current category (Architecture or Digital)
- Must feel stable, not jumping unpredictably

THEME:
- Light mode: allow accent color interaction
- Dark mode: keep background stable, only subtle accent highlights

DO NOT:
- merge old layouts directly
- duplicate styles from both projects
- create multiple design systems

BUILD ORDER:
1. global layout + theme
2. homepage interaction
3. project detail pages
4. about page
5. cleanup unused logic