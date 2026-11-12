import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const root = document.documentElement;
const MOTION = root.classList.contains("motion");
const FINE = matchMedia("(hover: hover) and (pointer: fine)").matches;
const EASE = "expo.out";

let lenis: Lenis | null = null;

/* =========================================================
   Always-on behaviour (works with reduced motion)
   ========================================================= */
// Live clock (IST)
const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
const clocks = $$("[data-clock]");
const tick = () => { const t = `${fmt.format(new Date())} IST`; clocks.forEach((c) => (c.textContent = t)); };
tick(); setInterval(tick, 1000);

// Mobile menu
const burger = $<HTMLButtonElement>(".nav__burger")!;
const menu = $("#menu")!;
const setMenu = (open: boolean) => {
  root.classList.toggle("nav-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menu.setAttribute("aria-hidden", String(!open));
  if (open) {
    lenis?.stop();
    if (MOTION) gsap.fromTo("#menu li a", { yPercent: 110 }, { yPercent: 0, duration: 1, ease: EASE, stagger: 0.06, delay: 0.25 });
  } else lenis?.start();
};
burger.addEventListener("click", () => setMenu(!root.classList.contains("nav-open")));
$$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Nav: hide on scroll down, active section indicator
const nav = $("[data-nav]")!;
const links = $$<HTMLAnchorElement>("[data-link]");
const indicator = $(".nav__indicator")!;
let lastY = 0;
const onScroll = (y: number) => {
  nav.classList.toggle("is-hidden", y > lastY && y > 300 && !root.classList.contains("nav-open"));
  lastY = y;
};
const moveIndicator = (a: HTMLElement | null) => {
  if (!a) { indicator.style.opacity = "0"; return; }
  indicator.style.opacity = "1";
  indicator.style.width = `${a.offsetWidth}px`;
  indicator.style.transform = `translateX(${a.offsetLeft}px)`;
};
const sections = links.map((a) => $(a.getAttribute("href")!)).filter(Boolean) as HTMLElement[];
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const link = links.find((l) => l.getAttribute("href") === `#${e.target.id}`) ?? null;
    links.forEach((l) => l.classList.toggle("is-active", l === link));
    moveIndicator(link);
  }),
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => io.observe(s));
$("#top") && new IntersectionObserver(([e]) => { if (e.isIntersecting) { links.forEach((l) => l.classList.remove("is-active")); moveIndicator(null); } }, { rootMargin: "-45% 0px -50% 0px" }).observe($("#top")!);

// Polyglot tabs (accessible, works without motion)
const tabs = $$<HTMLButtonElement>("[data-tab]");
const panels = $$<HTMLElement>("[data-panel]");
let activeTab = 0;
const selectTab = (i: number, focus = false) => {
  activeTab = (i + tabs.length) % tabs.length;
  tabs.forEach((t, k) => { const on = k === activeTab; t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; });
  panels.forEach((p, k) => { p.hidden = k !== activeTab; p.classList.toggle("is-active", k === activeTab); });
  const panel = panels[activeTab];
  const file = $("[data-file]"); const lang = $("[data-lang]");
  if (file) file.textContent = panel.dataset.file!;
  if (lang) lang.textContent = panel.dataset.name!;
  if (focus) tabs[activeTab].focus();
  if (MOTION) gsap.fromTo($$(".ln", panel), { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.035 });
  // restart progress bar animation
  const bar = $(".poly__tab-bar i", tabs[activeTab]);
  if (bar) { bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = ""; }
};
tabs.forEach((t, i) => {
  t.addEventListener("click", () => { userPicked = true; selectTab(i); });
  t.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); userPicked = true; selectTab(activeTab + 1, true); }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); userPicked = true; selectTab(activeTab - 1, true); }
  });
});
let userPicked = false;

if (!MOTION) {
  addEventListener("scroll", () => onScroll(scrollY), { passive: true });
  $("[data-top]")?.addEventListener("click", () => scrollTo({ top: 0 }));
} else {
  initMotion();
}

/* =========================================================
   Motion layer
   ========================================================= */
function initMotion() {
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Smooth scroll ---------- */
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95 });
  lenis.on("scroll", (e: Lenis) => { ScrollTrigger.update(); onScroll(e.scroll); });
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href")!;
      if (id.length < 2) return;
      const el = $(id);
      if (!el) return;
      e.preventDefault();
      lenis!.scrollTo(id === "#top" ? 0 : el, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4) });
    })
  );
  $("[data-top]")?.addEventListener("click", () => lenis!.scrollTo(0, { duration: 2.2 }));

  /* ---------- Hero WebGL (lazy) ---------- */
  const hero = $(".hero")!;
  const canvas = $<HTMLCanvasElement>(".hero__gl")!;
  type Galaxy = NonNullable<ReturnType<typeof import("./galaxy").createGalaxy>>;
  let galaxy: Galaxy | null = null;
  const galaxyReady = import("./galaxy")
    .then(({ createGalaxy }) => {
      hero.classList.add("has-gl");
      galaxy = createGalaxy(canvas);
      if (!galaxy) { hero.classList.remove("has-gl"); return; }
      new IntersectionObserver(([e]) => (e.isIntersecting ? galaxy!.start() : galaxy!.stop())).observe(hero);
      ScrollTrigger.create({ trigger: hero, start: "top top", end: "bottom top", onUpdate: (s) => galaxy!.scroll(s.progress) });
    })
    .catch(() => {});

  /* ---------- Preloader → intro ---------- */
  const count = $("[data-count]")!;
  const counter = { v: 0 };
  const intro = gsap.timeline({ defaults: { ease: EASE } });
  intro
    .to(".loader__mark path", { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.25 }, 0)
    .to(counter, { v: 100, duration: 2, ease: "power3.inOut", onUpdate: () => (count.textContent = String(Math.round(counter.v)).padStart(3, "0")) }, 0)
    .to(".loader__bar i", { scaleX: 1, duration: 2, ease: "power3.inOut" }, 0)
    .to(".loader__mark", { scale: 0.85, opacity: 0, duration: 0.6, ease: "power2.in" })
    .to(".loader__foot", { opacity: 0, duration: 0.4 }, "<")
    .add(() => galaxyReady.then(() => galaxy && gsap.to(galaxy.uniforms.uOpacity, { value: innerWidth < 760 ? 0.7 : 0.82, duration: 3, ease: "power2.out" })))
    .to(".loader", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.2, ease: "expo.inOut" }, "-=0.1")
    .set(".loader", { display: "none" })
    .fromTo(".hero__rings", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.4 }, "-=0.7")
    .to(".hero__line > span", { y: 0, yPercent: 0, duration: 1.5, stagger: 0.1 }, "<0.1")
    .fromTo("[data-hero]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.4, stagger: 0.1 }, "<0.3")
    .from(".nav__pill", { y: -30, opacity: 0, duration: 1.2 }, "<")
    .add(() => lenis!.start(), "<");
  gsap.set(".hero__line > span", { yPercent: 105 });

  /* ---------- Hero scroll-out ---------- */
  gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } })
    .fromTo(".hero__inner", { yPercent: 0, opacity: 1 }, { yPercent: -18, opacity: 0, ease: "none" }, 0)
    .fromTo(".hero__foot", { opacity: 1 }, { opacity: 0, ease: "none" }, 0);

  /* ---------- Scroll progress ---------- */
  gsap.to(".nav__progress i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 } });

  /* ---------- Generic reveals ---------- */
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 90%", once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.4, ease: EASE, stagger: 0.08, overwrite: true }),
  });

  /* ---------- Split headings ---------- */
  $$(".split").forEach((h) =>
    gsap.to($$(".split__w", h), { yPercent: 0, y: 0, duration: 1.4, ease: EASE, stagger: 0.06, scrollTrigger: { trigger: h, start: "top 88%", once: true } })
  );
  gsap.set(".split__w", { yPercent: 105 });

  /* ---------- About: words light up ---------- */
  const words = $$("[data-lit] > *");
  gsap.set(words, { opacity: 0.12 });
  gsap.to(words, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: "[data-lit]", start: "top 78%", end: "bottom 50%", scrub: 0.5 } });

  /* ---------- Counters & ring ---------- */
  $$("[data-counter]").forEach((el) => {
    const end = Number(el.dataset.counter); const o = { v: 0 };
    el.textContent = "0";
    gsap.to(o, { v: end, duration: 2.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true }, onUpdate: () => (el.textContent = String(Math.round(o.v))) });
  });
  gsap.fromTo(".tile__ring-fill", { strokeDashoffset: 1 }, { strokeDashoffset: 0.15, duration: 2.6, ease: "power3.out", scrollTrigger: { trigger: ".tile--years", start: "top 85%", once: true } });
  gsap.from(".tile__bars i", { scaleY: 0, transformOrigin: "bottom", duration: 1.2, ease: EASE, stagger: 0.07, scrollTrigger: { trigger: ".tile--products", start: "top 85%", once: true } });

  /* ---------- Journey timeline ---------- */
  gsap.to(".tl__fill", { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".tl", start: "top 60%", end: "bottom 60%", scrub: 0.4 } });
  $$("[data-tl]").forEach((item) => {
    ScrollTrigger.create({ trigger: item, start: "top 62%", onEnter: () => item.classList.add("is-on"), onLeaveBack: () => item.classList.remove("is-on") });
    gsap.from(item.querySelector(".tl__card"), { y: 50, opacity: 0, duration: 1.3, ease: EASE, scrollTrigger: { trigger: item, start: "top 88%", once: true } });
  });

  /* ---------- Contact ---------- */
  gsap.to(".contact__line > span", { yPercent: 0, y: 0, duration: 1.5, ease: EASE, stagger: 0.12, scrollTrigger: { trigger: ".contact__title", start: "top 85%", once: true } });
  gsap.set(".contact__line > span", { yPercent: 105 });
  gsap.from(".orb", { scale: 0, rotate: -90, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: ".contact__row", start: "top 88%", once: true } });
  gsap.from(".contact__mailbox > *", { y: 30, opacity: 0, duration: 1.2, ease: EASE, stagger: 0.1, scrollTrigger: { trigger: ".contact__row", start: "top 88%", once: true } });
  gsap.to(".footer__word span", { yPercent: 0, y: 0, duration: 1.4, ease: EASE, stagger: 0.04, scrollTrigger: { trigger: ".footer__word", start: "top 95%", once: true } });
  gsap.set(".footer__word span", { yPercent: 100 });

  /* ---------- Futuristic layer ---------- */
  initScramble();
  initRotor();
  initConsole();
  initPolyAuto();

  /* ---------- Pointer luxuries ---------- */
  if (FINE) initPointer(() => galaxy);

  addEventListener("load", () => ScrollTrigger.refresh());
}

/* =========================================================
   Cursor, magnetic buttons, spotlight, work preview
   ========================================================= */
function initPointer(getGalaxy: () => { pointer(x: number, y: number): void } | null) {
  const cursor = $(".cursor")!;
  const label = $(".cursor__label")!;
  const cx = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
  const cy = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
  let shown = false;

  addEventListener("pointermove", (e) => {
    if (!shown) { shown = true; gsap.set(cursor, { x: e.clientX, y: e.clientY }); gsap.to(cursor, { opacity: 1, duration: 0.4 }); }
    cx(e.clientX); cy(e.clientY);
    getGalaxy()?.pointer(e.clientX / innerWidth - 0.5, e.clientY / innerHeight - 0.5);
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => gsap.to(cursor, { opacity: 0, duration: 0.3 }));
  document.documentElement.addEventListener("pointerenter", () => shown && gsap.to(cursor, { opacity: 1, duration: 0.3 }));

  document.addEventListener("pointerover", (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
    const text = t?.dataset.cursor;
    cursor.classList.toggle("is-label", !!text);
    cursor.classList.toggle("is-link", !!t && !text);
    if (text) label.textContent = text;
  });

  // Magnetic
  $$("[data-magnetic]").forEach((el) => {
    const mx = gsap.quickTo(el, "x", { duration: 0.9, ease: "elastic.out(1, 0.35)" });
    const my = gsap.quickTo(el, "y", { duration: 0.9, ease: "elastic.out(1, 0.35)" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      mx((e.clientX - r.left - r.width / 2) * 0.3);
      my((e.clientY - r.top - r.height / 2) * 0.3);
    });
    el.addEventListener("pointerleave", () => { mx(0); my(0); });
  });

  // Spotlight on cards
  $$("[data-spot]").forEach((el) =>
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    })
  );

  // Work floating preview
  const preview = $(".preview");
  const reel = $(".preview__reel");
  const list = $(".plist");
  if (preview && reel && list && matchMedia("(min-width: 960px)").matches) {
    const px = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3" });
    const py = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3" });
    const rot = gsap.quickTo(preview, "rotate", { duration: 0.9, ease: "power3" });
    let lastX = 0;
    list.addEventListener("pointermove", (e) => {
      px(e.clientX); py(e.clientY);
      rot(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4));
      lastX = e.clientX;
    });
    list.addEventListener("pointerenter", (e) => {
      gsap.set(preview, { x: e.clientX, y: e.clientY });
      gsap.to(preview, { opacity: 1, scale: 1, duration: 0.6, ease: EASE });
    });
    list.addEventListener("pointerleave", () => gsap.to(preview, { opacity: 0, scale: 0.6, duration: 0.5, ease: "power3.out" }));
    $$<HTMLElement>("[data-preview]").forEach((row) =>
      row.addEventListener("pointerenter", () => { reel.style.transform = `translateY(${-Number(row.dataset.preview) * 100}%)`; })
    );
  }
}

/* =========================================================
   Futuristic helpers
   ========================================================= */
const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEFX§∆◇";
function scramble(el: HTMLElement, final = el.dataset.final ?? el.textContent ?? "", dur = 900) {
  el.dataset.final = final;
  const start = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    const reveal = Math.floor(p * final.length);
    el.textContent = final.split("").map((c, i) => (i < reveal || c === " " ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join("");
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initScramble() {
  $$("[data-scramble]").forEach((el) => {
    ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => scramble(el) });
    el.closest(".label")?.addEventListener("pointerenter", () => scramble(el, undefined, 600));
  });
  $$("[data-link]").forEach((a) => a.addEventListener("pointerenter", () => scramble(a, undefined, 450)));
}

function initRotor() {
  const el = $("[data-rotor]");
  if (!el) return;
  const words = el.dataset.rotor!.split("|");
  let i = 0;
  const type = async (word: string) => {
    el.classList.add("is-typing");
    const cur = el.textContent ?? "";
    for (let k = cur.length; k >= 0; k--) { el.textContent = cur.slice(0, k); await wait(32); }
    for (let k = 1; k <= word.length; k++) { el.textContent = word.slice(0, k); await wait(70); }
    el.classList.remove("is-typing");
  };
  const loop = async () => {
    await wait(5200);
    i = (i + 1) % words.length;
    if (i === 0) i = 1;
    await type(words[i]);
    loop();
  };
  loop();
}

function initConsole() {
  const box = $("[data-console]");
  if (!box) return;
  const lines = $$("[data-line]", box);
  const cmd = $(".cl__type", box)!;
  const full = cmd.dataset.text!;
  let running = false;
  let visible = false;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !running) run(); }, { threshold: 0.35 }).observe(box);

  async function run() {
    running = true;
    while (visible) {
      lines.forEach((l) => l.classList.remove("is-in", "is-run", "is-ok"));
      cmd.textContent = "";
      await wait(500);
      for (let k = 1; k <= full.length; k++) { cmd.textContent = full.slice(0, k); await wait(28); }
      await wait(400);
      for (const l of lines.slice(1)) {
        l.classList.add("is-in");
        const r = $(".cl__r", l);
        if (r) {
          const text = r.dataset.r ?? r.textContent!;
          r.dataset.r = text; r.textContent = "running…"; l.classList.add("is-run");
          await wait(700 + Math.random() * 500);
          l.classList.remove("is-run"); l.classList.add("is-ok"); r.textContent = text;
        } else await wait(300);
      }
      await wait(4200);
    }
    running = false;
  }
}

function initPolyAuto() {
  const editor = $(".editor");
  if (!editor || !tabs.length) return;
  let inView = false;
  let hover = false;
  new IntersectionObserver(([e]) => (inView = e.isIntersecting), { threshold: 0.3 }).observe(editor);
  [editor, $(".poly__tabs")!].forEach((el) => {
    el.addEventListener("pointerenter", () => { hover = true; tabs.forEach((t) => t.classList.add("is-paused")); });
    el.addEventListener("pointerleave", () => { hover = false; tabs.forEach((t) => t.classList.remove("is-paused")); });
  });
  let elapsed = 0;
  gsap.ticker.add((_, dt) => {
    if (!inView || hover || userPicked) return;
    elapsed += dt;
    if (elapsed > 6000) { elapsed = 0; selectTab(activeTab + 1); }
  });
}

function wait(ms: number) { return new Promise((r) => setTimeout(r, ms)); }
