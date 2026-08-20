# Oussama Zerrad — Portfolio

React + Vite. Static output, auto-deployed to GitHub Pages via GitHub Actions.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. **Decide where this site will live:**
   - As your **user site** (`zerrad0z.github.io`, served at the domain root):
     rename this repo to `zerrad0z.github.io` and set `base: "/"` in `vite.config.js`.
   - As a **project site** (served at `zerrad0z.github.io/portfolio/`):
     name the repo `portfolio` and keep `base: "/portfolio/"` in `vite.config.js` (already set).

2. **Push this project to that repo:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/Zerrad0z/<repo-name>.git
   git push -u origin main
   ```

3. **Enable Pages via Actions:**
   In the repo, go to **Settings → Pages → Build and deployment → Source**, and select
   **GitHub Actions**. That's it — the workflow in `.github/workflows/deploy.yml`
   builds and deploys automatically on every push to `main`.

4. Your site will be live at the URL GitHub shows under **Settings → Pages**
   (and also in the Actions run summary) a minute or two after the push.

## Project structure

```
src/App.jsx       — the whole site (single component, easy to split up later)
src/main.jsx      — React entry point
index.html        — HTML shell
vite.config.js    — build config, including the GitHub Pages base path
.github/workflows/deploy.yml — CI: build + deploy on push to main
```

## Notes

- Content (experience, projects, skills) is pulled from the CV and prior conversation —
  double check dates/statuses (e.g. ApiHub sprint progress, MockForge status) before
  this goes live, since those move over time.
- No headshot is wired in yet. Drop an image into `src/` and reference it in the
  hero if you want a photo there.
- GitHub/LinkedIn links point to your public profiles — update if either changes.
