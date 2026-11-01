/**
 * 粒子場：數千顆粒子在四種模式的圖形之間重組。
 * 每個圖形都來自該領域本身：研究＝相關散佈圖與迴歸線、臨床＝心電圖、技術＝神經網路、創作＝南丁格爾玫瑰圖。
 */

export type Shape = "all" | "research" | "clinical" | "tech" | "creative";

type Vec = [number, number, number];

const ACCENT: Record<Shape, [number, number, number]> = {
  all: [226, 232, 255],
  research: [255, 184, 77],
  clinical: [61, 219, 168],
  tech: [96, 140, 255],
  creative: [255, 99, 140],
};

/* 可重現的亂數：每次載入的圖形一致 */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(r: () => number) {
  return Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r());
}

/* 整合：一顆緩慢自轉的點雲球 */
function sphere(n: number): Vec[] {
  const out: Vec[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    out.push([Math.cos(th) * rad * 0.82, y * 0.82, Math.sin(th) * rad * 0.82]);
  }
  return out;
}

/* 研究：r ≈ 0.6 的雙變量常態散佈，加上一條迴歸線 */
function research(n: number): Vec[] {
  const r = rng(11);
  const rho = 0.62;
  const out: Vec[] = [];
  const lineCount = Math.floor(n * 0.14);
  for (let i = 0; i < n - lineCount; i++) {
    const a = gauss(r);
    const b = rho * a + Math.sqrt(1 - rho * rho) * gauss(r);
    out.push([a * 0.3, -b * 0.3, (r() - 0.5) * 0.25]);
  }
  for (let i = 0; i < lineCount; i++) {
    const x = -0.95 + (i / lineCount) * 1.9;
    out.push([x, -x * rho, 0]);
  }
  return out;
}

/* 臨床：兩個心跳週期的 PQRST 波形 */
function ecgAt(t: number) {
  // t: 0..1 一個週期
  const g = (mu: number, sd: number, amp: number) => amp * Math.exp(-((t - mu) ** 2) / (2 * sd * sd));
  return g(0.18, 0.025, 0.12) + g(0.355, 0.008, -0.12) + g(0.38, 0.01, 0.95) + g(0.405, 0.009, -0.28) + g(0.62, 0.045, 0.24);
}

function clinical(n: number): Vec[] {
  const r = rng(23);
  // 依「路徑長度」平均取樣，QRS 的陡峭尖峰才不會只剩幾個點
  const steps = 4000;
  const pts: [number, number][] = [];
  for (let k = 0; k <= steps; k++) {
    const x = -1 + (k / steps) * 2;
    const t = (((x + 1) / 2) * 2.2) % 1;
    pts.push([x, -ecgAt(t) * 0.85 + 0.32]);
  }
  const cum = [0];
  for (let k = 1; k < pts.length; k++) {
    cum.push(cum[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
  }
  const total = cum[cum.length - 1];
  const out: Vec[] = [];
  let k = 0;
  for (let i = 0; i < n; i++) {
    const d = (i / n) * total;
    while (k < cum.length - 2 && cum[k + 1] < d) k++;
    const [x, y] = pts[k];
    out.push([x * 0.86, y + gauss(r) * 0.006, (r() - 0.5) * 0.05]);
  }
  return out;
}

/* 技術：4·7·7·3 的前饋神經網路，粒子聚在節點與連線上 */
function tech(n: number): Vec[] {
  const r = rng(37);
  const layers = [4, 7, 7, 3];
  const nodes: Vec[][] = layers.map((count, li) =>
    Array.from({ length: count }, (_, k) => {
      const x = -0.78 + (li / (layers.length - 1)) * 1.56;
      const y = (k - (count - 1) / 2) * 0.2;
      return [x, y, Math.sin(k * 1.7 + li) * 0.18] as Vec;
    }),
  );
  const edges: [Vec, Vec][] = [];
  for (let li = 0; li < layers.length - 1; li++) {
    for (const a of nodes[li]) for (const b of nodes[li + 1]) edges.push([a, b]);
  }
  const flat = nodes.flat();
  const out: Vec[] = [];
  const nodeCount = Math.floor(n * 0.42);
  for (let i = 0; i < nodeCount; i++) {
    const c = flat[i % flat.length];
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * 0.035;
    out.push([c[0] + Math.cos(a) * d, c[1] + Math.sin(a) * d, c[2] + (r() - 0.5) * 0.03]);
  }
  for (let i = nodeCount; i < n; i++) {
    const [a, b] = edges[Math.floor(r() * edges.length)];
    const t = r();
    out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]);
  }
  return out;
}

/* 創作：12 片楔形的極座標面積圖（南丁格爾玫瑰圖） */
function creative(n: number): Vec[] {
  const r = rng(51);
  const radii = [0.42, 0.55, 0.7, 0.86, 0.62, 0.48, 0.38, 0.5, 0.66, 0.92, 0.74, 0.56];
  const wedge = (Math.PI * 2) / radii.length;
  const out: Vec[] = [];
  for (let i = 0; i < n; i++) {
    const w = i % radii.length;
    // 楔形之間留縫、外緣加密，每一片的面積才看得清楚
    const a = w * wedge + (0.08 + r() * 0.84) * wedge - Math.PI / 2;
    const edge = r() < 0.45;
    const rad = (edge ? 0.9 + r() * 0.1 : Math.sqrt(r())) * radii[w] * 0.92;
    out.push([Math.cos(a) * rad, Math.sin(a) * rad, (r() - 0.5) * 0.08]);
  }
  return out;
}

const BUILDERS: Record<Shape, (n: number) => Vec[]> = { all: sphere, research, clinical, tech, creative };

export const READOUT: Record<Shape, string> = {
  all: "4 modes · 1 question",
  research: "n = 3,600 · r = 0.62",
  clinical: "ECG · lead II · sinus rhythm",
  tech: "layers 4 · 7 · 7 · 3",
  creative: "polar area · 12 wedges",
};

interface Options {
  canvas: HTMLCanvasElement;
  shape?: Shape;
  count?: number;
  /** 圖形中心在畫布中的位置（0–1） */
  center?: () => [number, number];
  /** 圖形大小相對於畫布短邊 */
  scale?: () => number;
  interactive?: boolean;
}

export function createField({ canvas, shape = "all", count, center, scale, interactive = true }: Options) {
  const ctx = canvas.getContext("2d", { alpha: true })!;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const n = count ?? (innerWidth < 700 ? 1800 : 3600);
  const cache = new Map<Shape, Vec[]>();
  const targetsFor = (s: Shape) => {
    if (!cache.has(s)) cache.set(s, BUILDERS[s](n));
    return cache.get(s)!;
  };

  const pos = new Float32Array(n * 3);
  const vel = new Float32Array(n * 3);
  const seed = rng(7);
  for (let i = 0; i < n * 3; i++) pos[i] = (seed() - 0.5) * 2.4;

  let current: Shape = shape;
  let targets = targetsFor(current);
  let color = [...ACCENT[current]];
  let w = 0;
  let h = 0;
  let dpr = 1;
  let angle = 0;
  let running = false;
  let frame = 0;
  let pointer: [number, number] | null = null;
  let t0 = performance.now();

  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!running) draw(performance.now());
  };

  const spin = (s: Shape) => s === "all" || s === "tech";

  function draw(now: number) {
    const [cxr, cyr] = center?.() ?? [0.5, 0.5];
    const cx = w * cxr;
    const cy = h * cyr;
    const size = Math.min(w, h) * (scale?.() ?? 0.42);
    const time = (now - t0) / 1000;
    if (spin(current) && !reduce) angle += 0.0025;
    const cosA = Math.cos(spin(current) ? angle : 0);
    const sinA = Math.sin(spin(current) ? angle : 0);
    const target = ACCENT[current];
    for (let k = 0; k < 3; k++) color[k] = reduce ? target[k] : color[k] + (target[k] - color[k]) * 0.06;

    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    const [cr, cg, cb] = color.map(Math.round);
    // 心電圖的掃描亮帶
    const sweep = ((time * 0.45) % 1.3) * 2 - 1;

    for (let i = 0; i < n; i++) {
      const j = i * 3;
      const tg = targets[i];
      if (reduce) {
        pos[j] = tg[0];
        pos[j + 1] = tg[1];
        pos[j + 2] = tg[2];
      } else {
        const wob = 0.004 * Math.sin(time * 1.3 + i * 0.37);
        vel[j] = (vel[j] + (tg[0] - pos[j]) * 0.012) * 0.86;
        vel[j + 1] = (vel[j + 1] + (tg[1] + wob - pos[j + 1]) * 0.012) * 0.86;
        vel[j + 2] = (vel[j + 2] + (tg[2] - pos[j + 2]) * 0.012) * 0.86;
        pos[j] += vel[j];
        pos[j + 1] += vel[j + 1];
        pos[j + 2] += vel[j + 2];
      }

      const x = pos[j] * cosA - pos[j + 2] * sinA;
      const z = pos[j] * sinA + pos[j + 2] * cosA;
      const persp = 1 / (1.9 - z * 0.6);
      let sx = cx + x * size * persp * 1.9;
      let sy = cy + pos[j + 1] * size * persp * 1.9;

      if (pointer && interactive && !reduce) {
        const dx = sx - pointer[0];
        const dy = sy - pointer[1];
        const d2 = dx * dx + dy * dy;
        if (d2 < 9000) {
          const push = (1 - d2 / 9000) * 0.02;
          vel[j] += (dx / size) * push;
          vel[j + 1] += (dy / size) * push;
        }
      }

      let alpha = 0.35 + (z + 1) * 0.32;
      if (current === "clinical") {
        const d = Math.abs(pos[j] - sweep);
        alpha = 0.3 + Math.max(0, 1 - d * 2.2) * 0.7;
      }
      const big = i % 11 === 0;
      const s = (0.8 + persp * 1.2) * (big ? 2 : 1);
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${Math.min(alpha, 1).toFixed(3)})`;
      ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
      // 少數較大的粒子加一圈柔光
      if (big) {
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${(alpha * 0.18).toFixed(3)})`;
        ctx.fillRect(sx - s * 1.6, sy - s * 1.6, s * 3.2, s * 3.2);
      }
    }
    ctx.globalCompositeOperation = "source-over";
  }

  const loop = (now: number) => {
    if (!running) return;
    draw(now);
    frame = requestAnimationFrame(loop);
  };

  const start = () => {
    if (running || reduce) return;
    running = true;
    frame = requestAnimationFrame(loop);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // 不在畫面內或分頁隱藏時就停下來，不耗電
  let inView = false;
  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView && !document.hidden) start();
    else stop();
  });
  io.observe(canvas);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (inView) start();
  });

  if (interactive) {
    canvas.parentElement?.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer = [e.clientX - rect.left, e.clientY - rect.top];
    });
    canvas.parentElement?.addEventListener("pointerleave", () => (pointer = null));
  }

  return {
    setShape(next: Shape) {
      if (next === current) return;
      current = next;
      targets = targetsFor(next);
      // 重組時給粒子一點向外的爆散，看得出是同一批粒子在移動
      if (!reduce) {
        for (let i = 0; i < n * 3; i++) vel[i] += (Math.random() - 0.5) * 0.06;
      }
      if (reduce) draw(performance.now());
    },
    get shape() {
      return current;
    },
  };
}
