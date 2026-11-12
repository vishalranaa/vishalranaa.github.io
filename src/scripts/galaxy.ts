import {
  AdditiveBlending, BufferAttribute, BufferGeometry, Color, PerspectiveCamera, Points, Scene, ShaderMaterial, WebGLRenderer,
} from "three";

/** Gold particle galaxy for the hero. Returns a controller, or null if WebGL is unavailable. */
export function createGalaxy(canvas: HTMLCanvasElement) {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  const small = innerWidth < 760;
  const dpr = Math.min(devicePixelRatio, small ? 1.5 : 2);
  renderer.setPixelRatio(dpr);

  const scene = new Scene();
  const camera = new PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 2.6, 6.2);
  camera.lookAt(0, 0, 0);

  /* ---------- Galaxy ---------- */
  const COUNT = small ? 26000 : 70000;
  const RADIUS = 5.2;
  const BRANCHES = 4;
  const SPIN = 1.1;
  const inner = new Color("#fff0c8");
  const mid = new Color("#d6b67c");
  const outer = new Color("#5a4220");

  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const scale = new Float32Array(COUNT);
  const rnd = new Float32Array(COUNT * 3);
  const c = new Color();

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    const r = Math.pow(Math.random(), 1.6) * RADIUS;
    const branch = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
    const spin = r * SPIN;
    pos[i3] = Math.cos(branch + spin) * r;
    pos[i3 + 1] = 0;
    pos[i3 + 2] = Math.sin(branch + spin) * r;

    const spread = (p: number) => Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * p * (0.25 + r * 0.12);
    rnd[i3] = spread(1);
    rnd[i3 + 1] = spread(0.45);
    rnd[i3 + 2] = spread(1);

    const t = r / RADIUS;
    c.copy(inner).lerp(mid, Math.min(1, t * 2.2));
    if (t > 0.45) c.lerp(outer, (t - 0.45) / 0.55);
    if (Math.random() < 0.04) c.set("#fff8e6");
    col[i3] = c.r; col[i3 + 1] = c.g; col[i3 + 2] = c.b;
    scale[i] = Math.random() < 0.02 ? 2.5 + Math.random() * 2 : 0.4 + Math.random();
  }

  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(pos, 3));
  geo.setAttribute("color", new BufferAttribute(col, 3));
  geo.setAttribute("aScale", new BufferAttribute(scale, 1));
  geo.setAttribute("aRandom", new BufferAttribute(rnd, 3));

  const uniforms = {
    uTime: { value: 0 },
    uSize: { value: (small ? 22 : 26) * dpr },
    uOpacity: { value: 0 },
    uSpread: { value: 1 },
    uMouse: { value: [0, 0] as [number, number] },
  };

  const mat = new ShaderMaterial({
    uniforms,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uSize;
      uniform float uSpread;
      attribute float aScale;
      attribute vec3 aRandom;
      varying vec3 vColor;
      varying float vFade;
      void main() {
        vec4 mp = modelMatrix * vec4(position, 1.0);
        float ang = atan(mp.x, mp.z);
        float d = length(mp.xz);
        ang += (1.0 / (d + 0.35)) * uTime * 0.16;   // differential rotation
        mp.x = sin(ang) * d;
        mp.z = cos(ang) * d;
        mp.xyz += aRandom * uSpread;
        mp.y += sin(uTime * 0.5 + d * 1.7) * 0.05;
        vec4 vp = viewMatrix * mp;
        gl_Position = projectionMatrix * vp;
        gl_PointSize = uSize * aScale * (1.0 / -vp.z);
        vColor = color;
        vFade = smoothstep(5.6, 2.5, d);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uOpacity;
      varying vec3 vColor;
      varying float vFade;
      void main() {
        float s = distance(gl_PointCoord, vec2(0.5));
        float a = pow(max(0.0, 1.0 - s * 2.0), 2.6);
        gl_FragColor = vec4(vColor, a * uOpacity * (0.35 + vFade * 0.65));
      }
    `,
  });

  const galaxy = new Points(geo, mat);
  galaxy.rotation.x = 0.18;
  scene.add(galaxy);

  /* ---------- Distant dust ---------- */
  const DUST = small ? 700 : 1600;
  const dpos = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) {
    const r = 8 + Math.random() * 18;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    dpos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    dpos[i * 3 + 1] = r * Math.cos(ph);
    dpos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
  }
  const dgeo = new BufferGeometry();
  dgeo.setAttribute("position", new BufferAttribute(dpos, 3));
  const dmat = new ShaderMaterial({
    uniforms: { uOpacity: uniforms.uOpacity, uSize: { value: 30 * dpr } },
    transparent: true, depthWrite: false, blending: AdditiveBlending,
    vertexShader: `uniform float uSize; void main(){ vec4 vp = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix*vp; gl_PointSize = uSize / -vp.z; }`,
    fragmentShader: `uniform float uOpacity; void main(){ float s = distance(gl_PointCoord, vec2(.5)); gl_FragColor = vec4(1.0,.93,.78, pow(max(0.,1.-s*2.),3.)*.55*uOpacity); }`,
  });
  const dust = new Points(dgeo, dmat);
  scene.add(dust);

  /* ---------- Sizing ---------- */
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < h ? 75 : 55;
    galaxy.position.y = w < h ? -1.6 : 0;
    camera.updateProjectionMatrix();
  };
  resize();
  new ResizeObserver(resize).observe(canvas);

  /* ---------- Loop ---------- */
  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  let progress = 0;
  let running = false;
  let raf = 0;
  let last = performance.now();
  let elapsed = 0;

  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    elapsed += dt;
    uniforms.uTime.value = elapsed;
    cur.x += (target.x - cur.x) * 0.04;
    cur.y += (target.y - cur.y) * 0.04;

    camera.position.x = cur.x * 0.9;
    camera.position.y = 2.6 - cur.y * 0.6 - progress * 1.8;
    camera.position.z = 6.2 - progress * 2.2;
    camera.lookAt(0, -progress * 0.6, 0);
    galaxy.rotation.z = cur.x * 0.06;
    dust.rotation.y = elapsed * 0.01;
    uniforms.uSpread.value = 1 + progress * 1.6;

    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };

  return {
    start() { if (!running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); } },
    stop() { running = false; cancelAnimationFrame(raf); },
    pointer(nx: number, ny: number) { target.x = nx; target.y = ny; },
    scroll(p: number) { progress = p; },
    uniforms,
  };
}
