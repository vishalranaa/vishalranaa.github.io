import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://vishalranaa.github.io",
  integrations: [sitemap()],
  build: { inlineStylesheets: "always" },
  vite: { build: { chunkSizeWarningLimit: 700 } },
});
