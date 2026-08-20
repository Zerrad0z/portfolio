import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ---------------------------------------------------------------------
// base: the sub-path your site is served from on GitHub Pages.
//
// - If this repo IS your user site (repo name "zerrad0z.github.io"),
//   the site lives at the domain root -> set base to "/"
// - If this is a PROJECT repo (e.g. repo name "portfolio") served at
//   zerrad0z.github.io/portfolio/ -> set base to "/portfolio/"
//
// Defaults to "/portfolio/" to match the path already listed on your CV
// (zerrad0z.github.io/portfolio/). Change if your repo name differs.
// ---------------------------------------------------------------------
export default defineConfig({
  plugins: [react()],
  base: "/portfolio/",
});
