# Vishal Rana — Portfolio

Personal portfolio at **https://vishalranaa.github.io** — a static, SEO-first site built with
[Astro](https://astro.build), a Three.js particle-galaxy hero, GSAP + ScrollTrigger choreography and Lenis smooth scrolling.

```bash
npm install
npm run dev     # local dev server
npm run build   # static output in dist/
npm run og      # regenerate public/og.jpg + public/icon-512.png
```

| What | Where |
| --- | --- |
| All copy & content (projects, journey, services, links) | `src/data/profile.ts` |
| Sections | `src/components/*.astro` |
| Design tokens & styles | `src/styles/global.css` |
| Motion (scroll, cursor, preloader) | `src/scripts/main.ts` |
| Hero WebGL galaxy (lazy-loaded) | `src/scripts/galaxy.ts` |

Motion is skipped entirely for visitors with *prefers-reduced-motion*, and every word of content is in the HTML for crawlers.

**Deploy:** pushing to `main` runs `.github/workflows/deploy.yml`. In the repo go to *Settings → Pages → Source* and choose **GitHub Actions** once.
