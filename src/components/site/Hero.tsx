import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HERO_SLIDES as SL } from "./hero/hero.config";
import "./hero/hero.css";

const N = SL.length;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const E3 = (t: number) => 1 - Math.pow(1 - t, 3);
const SS = (t: number) => t * t * (3 - 2 * t);
const f2 = (n: number) => n.toFixed(1);

// Slide 1 backdrop: full-width clay running track in perspective (vanishing point 50% / 42%).
const HZ = 378;
function trackSvg(lanes: number, half: number, sw: number, cls: string) {
  const l: ReactNode[] = [];
  for (let k = 0; k <= lanes; k++) {
    const bx = 800 - half + (2 * half * k) / lanes;
    l.push(<line key={k} x1="800" y1={HZ} x2={f2(bx)} y2="900" />);
  }
  const sy = 560, t = (sy - HZ) / (900 - HZ);
  return (
    <svg className={cls} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`sacLf${cls}`} gradientUnits="userSpaceOnUse" x1="0" y1={HZ} x2="0" y2="900">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".35" stopColor="#fff" stopOpacity=".22" />
          <stop offset="1" stopColor="#fff" stopOpacity=".32" />
        </linearGradient>
      </defs>
      <g stroke={`url(#sacLf${cls})`} strokeWidth={sw}>{l}</g>
      <line x1={f2(800 - half * t)} y1={sy} x2={f2(800 + half * t)} y2={sy} stroke="#fff" strokeOpacity=".09" strokeWidth={sw * 1.2} />
    </svg>
  );
}
function trackLines() {
  return (
    <>
      <div className="tk-surf" />
      {trackSvg(8, 2600, 2.5, "tk-d")}
      {trackSvg(5, 1500, 4.5, "tk-m")}
      <div className="tk-hz" />
      <div className="tk-fade" />
    </>
  );
}
function mandala() {
  const p: ReactNode[] = [];
  for (let k = 0; k < 16; k++) p.push(<ellipse key={`a${k}`} cx="50" cy="20" rx="4.4" ry="12" transform={`rotate(${k * 22.5} 50 50)`} fill="#f5d36b" fillOpacity=".085" />);
  for (let k = 0; k < 16; k++) p.push(<ellipse key={`b${k}`} cx="50" cy="34" rx="2.8" ry="7.5" transform={`rotate(${k * 22.5 + 11.25} 50 50)`} fill="#f5d36b" fillOpacity=".11" />);
  for (let k = 0; k < 32; k++) p.push(<circle key={`c${k}`} cx="50" cy="4.6" r=".9" transform={`rotate(${k * 11.25} 50 50)`} fill="#f5d36b" fillOpacity=".3" />);
  return (
    <div className="mdl">
      <svg viewBox="0 0 100 100">{p}</svg>
    </div>
  );
}
const THEMES: (() => ReactNode)[] = [
  trackLines,
  () => (
    <>
      <div className="bm" style={{ left: "6vw" }} />
      <div className="bm r" style={{ left: "72vw", animationDelay: "-3s" }} />
      <div className="stg" style={{ bottom: "10svh", width: "min(54vw,72svh)", aspectRatio: "6/1" }} />
    </>
  ),
  mandala,
];

const words = (s: string) =>
  s.trim().split(" ").map((x, i, arr) => (
    <span key={i}>
      <span className="m">
        <span className="wd">{x}</span>
      </span>
      {i < arr.length - 1 ? " " : ""}
    </span>
  ));

type Layer = { bg: HTMLDivElement; th: HTMLDivElement; w: HTMLDivElement; sh: HTMLDivElement; fig: HTMLDivElement; gl: HTMLDivElement; f: HTMLImageElement; tl: HTMLDivElement; tr: HTMLDivElement; k: HTMLDivElement; wd: HTMLElement[] };

// In-memory only: every full page load plays the curtain; client-side returns don't.
let introPlayed = false;

export function Hero() {
  const [active, setActive] = useState(0);
  const [curtain, setCurtain] = useState(() => !introPlayed);
  const refs = useRef<Partial<Record<keyof Layer, HTMLElement>>[]>(SL.map(() => ({})));
  const api = useRef<{ goTo: (i: number) => void; rel: (d: number) => void }>({ goTo: () => {}, rel: () => {} });
  const set = (i: number, key: keyof Layer) => (el: HTMLElement | null) => {
    if (el) refs.current[i]![key] = el;
  };
  const endCurtain = () => {
    introPlayed = true;
    setCurtain(false);
  };

  useEffect(() => {
    if (!introPlayed) window.scrollTo(0, 0);
    // release the pre-hydration cover once the curtain has painted its first frame
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => document.documentElement.classList.remove("hero-pending"));
    });
    // fallback; the CSS animation started on first paint and ends at ~1.75s
    const phone = matchMedia("(max-width:700px),(max-aspect-ratio:1/1)").matches;
    const t = window.setTimeout(endCurtain, phone ? 3300 : 2100);
    // preload the other two figures (on phones only after the curtain, when idle)
    const preload = () =>
      SL.slice(1).forEach((s) => {
        const im = new Image();
        im.src = s.img;
      });
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const t2 = window.setTimeout(
      () => (w.requestIdleCallback ? w.requestIdleCallback(preload, { timeout: 1500 }) : preload()),
      phone ? 3100 : 0,
    );
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
      history.scrollRestoration = "auto";
    };
  }, []);

  useEffect(() => {
    const L: Layer[] = refs.current.map((r) => ({ ...(r as unknown as Layer), wd: Array.from((r.tl as HTMLElement).querySelectorAll<HTMLElement>(".wd")) }));
    const PER = matchMedia("(pointer:coarse)").matches ? 1.4 : 1;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    let vh = innerHeight, lw = innerWidth, settled = 0, touching = false, disp = 0, running = false, lastT = 0, cur = -1;
    let idle: number | undefined, raf = 0, tw = 0, animating = false, coolUntil = 0, previousY = scrollY, returningTouch = false;
    let hist: { t: number; a: number }[] = [];
    const target = () => clamp(scrollY / (PER * vh), 0, N - 1);
    const show = (e: HTMLElement, on: boolean) => { e.style.visibility = on ? "visible" : "hidden"; };

    function render(pos: number) {
      const W = innerWidth, H = vh, m = W < 700 || W < vh ? 0.6 : 1, cx = W / 2, cy = H * 0.55, R = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy));
      const v = L.map((_, i) => (i ? clamp((pos - (i - 1) - 0.04) / 0.7, 0, 1) : 1));
      for (let i = 0; i < N; i++) {
        const d = pos - i, ad = Math.abs(d), o = L[i]!, on = ad < 1, sg = d >= 0 ? 1 : -1;
        const hide = i < N - 1 && v[i + 1]! >= 1;
        show(o.bg, !hide && v[i]! > 0);
        o.bg.style.clipPath = i === 0 || v[i]! >= 1 ? "none" : `circle(${R * SS(v[i]!)}px at 50% 55%)`;
        [o.th, o.w, o.sh, o.fig, o.tl, o.tr].forEach((e) => show(e, on));
        o.tr.setAttribute("aria-hidden", String(Math.round(pos) !== i));
        if (!on) continue;
        o.th.style.opacity = String(1 - SS(clamp(ad / 0.85, 0, 1)));
        o.th.style.transform = `translate3d(${-sg * W * 0.06 * E3(clamp(ad / 0.85, 0, 1))}px,0,0) scale(${1 + ad * 0.08})`;
        o.w.style.opacity = String(1 - SS(clamp(ad / 0.9, 0, 1)));
        o.w.style.transform = `translate3d(${-sg * W * 0.45 * E3(clamp(ad / 0.9, 0, 1))}px,0,0)`;
        o.gl.style.opacity = String(1 - clamp(ad / 0.7, 0, 1));
        o.gl.style.transform = `scale(${1 + ad * 0.18})`;
        let x, y, sc, rt, op;
        if (d < 0) {
          const f = clamp((d + 0.6) / 0.6, 0, 1), e = E3(f);
          x = (1 - e) * W * 0.09; y = (1 - e) * H * 0.1; sc = 0.88 + 0.12 * e; rt = (1 - e) * 4; op = clamp(f * 1.6, 0, 1);
        } else {
          const f = clamp(d / 0.45, 0, 1), e = SS(f);
          x = -e * W * 0.12; y = -e * H * 0.08; sc = 1 - 0.1 * e; rt = -4 * e; op = 1 - f;
        }
        o.f.style.opacity = String(op);
        o.f.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rt}deg) scale(${sc})`;
        o.sh.style.opacity = String(op);
        o.sh.style.transform = `translate3d(${x}px,0,0)`;
        const P = d < 0 ? clamp((d + 0.5) / 0.5, 0, 1) : clamp((0.5 - d) / 0.5, 0, 1), st = d > 0 ? -1 : 1;
        o.wd.forEach((e, k) => {
          const p = clamp((P - k * 0.07) / 0.58, 0, 1);
          e.style.transform = `translate3d(0,${st * (1 - E3(p)) * 110}%,0)`;
        });
        o.k.style.opacity = String(P);
        o.k.style.transform = `translate3d(0,${st * (1 - P) * 20 * m}px,0)`;
        const pr = clamp(P * 1.5 - 0.5, 0, 1);
        o.tr.style.opacity = String(pr);
        o.tr.style.transform = `translate3d(0,${st * (1 - pr) * 44 * m}px,0)`;
      }
      const c = Math.round(pos);
      if (c !== cur) {
        cur = c;
        setActive(c);
        L.forEach((o, i) => {
          o.fig.classList.toggle("on", i === c);
          o.th.classList.toggle("on", i === c);
          o.sh.classList.toggle("on", i === c);
        });
      }
    }
    function loop(n: number) {
      // A queued frame can predate kick() when the route restores its scroll.
      const dt = clamp((n - lastT) / 1000 || 0.016, 0, 0.05);
      lastT = n;
      const tg = target();
      disp += (tg - disp) * (reduce ? 1 : 1 - Math.exp(-dt * 7));
      if (Math.abs(tg - disp) < 0.0006) disp = tg;
      render(reduce ? Math.round(disp) : disp);
      if (disp !== tg) raf = requestAnimationFrame(loop);
      else running = false;
    }
    function kick() {
      if (!running) { running = true; lastT = performance.now(); raf = requestAnimationFrame(loop); }
    }
    const endY = () => (N - 1) * PER * vh;
    function tweenTo(y: number) {
      cancelAnimationFrame(tw);
      const y0 = scrollY, dy = y - y0;
      if (Math.abs(dy) < 2 || reduce) { coolUntil = performance.now() + 250; scrollTo(0, y); animating = false; return; }
      const dur = clamp(650 + (Math.abs(dy) / vh) * 350, 650, 1150), t0 = performance.now();
      animating = true;
      coolUntil = performance.now() + dur + 250;
      const step = (n: number) => {
        const t = clamp((n - t0) / dur, 0, 1), e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        scrollTo(0, y0 + dy * e);
        if (t < 1) tw = requestAnimationFrame(step);
        else animating = false;
      };
      tw = requestAnimationFrame(step);
    }
    const goTo = (i: number) => { i = (i + N) % N; settled = i; tweenTo(i * PER * vh); };
    function settle() {
      if (touching || animating) return;
      if (scrollY > endY() + 4) { settled = N - 1; return; }
      const p = target(), d = p - settled, a = Math.abs(d);
      let n = a < 0.05 ? settled : a < 1.18 ? settled + Math.sign(d) : Math.round(p);
      n = clamp(n, 0, N - 1);
      settled = n;
      if (Math.abs(p - n) > 0.02) tweenTo(n * PER * vh);
    }
    const onScroll = () => {
      const crossedBack = previousY > endY() + 4 && scrollY < endY() - 4;
      previousY = scrollY;
      if (crossedBack && !animating) { returningTouch = touching; goTo(N - 1); return; }
      kick(); clearTimeout(idle); idle = window.setTimeout(settle, 120);
    };
    const onScrollEnd = () => { clearTimeout(idle); settle(); };
    const inHero = () => scrollY <= endY() + 4;
    function step(dir: number) {
      if (dir > 0 && settled < N - 1) { goTo(settled + 1); return true; }
      if (dir < 0 && settled > 0) { goTo(settled - 1); return true; }
      return false;
    }
    function newGesture(now: number, a: number) {
      const last = hist[hist.length - 1];
      hist.push({ t: now, a });
      if (hist.length > 8) hist.shift();
      if (!last || now - last.t > 220) return true;
      const p = hist.slice(0, -1).slice(-4), avg = p.reduce((x, y) => x + y.a, 0) / p.length;
      return a > avg * 1.7 + 8;
    }
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const a = Math.abs(e.deltaY);
      if (a < 2) return;
      const now = performance.now(), dir = Math.sign(e.deltaY);
      if (!inHero()) {
        settled = N - 1;
        if (dir < 0 && scrollY + e.deltaY <= endY()) { e.preventDefault(); goTo(N - 1); }
        return;
      }
      const fresh = newGesture(now, a);
      if (animating || now < coolUntil || !fresh) { e.preventDefault(); return; }
      if ((dir > 0 && settled >= N - 1) || (dir < 0 && settled <= 0)) return;
      e.preventDefault();
      step(dir);
    };
    let ty0 = 0, tx0 = 0, tdec = 0, thj = false;
    const onTS = (e: TouchEvent) => { const t = e.touches[0]!; ty0 = t.clientY; tx0 = t.clientX; tdec = 0; thj = false; returningTouch = false; touching = true; };
    const onTM = (e: TouchEvent) => {
      const t = e.touches[0]!, dy = t.clientY - ty0, dx = t.clientX - tx0;
      if (!returningTouch && !inHero() && dy > Math.abs(dx) && scrollY - dy <= endY()) {
        returningTouch = true;
        goTo(N - 1);
      }
      if (!tdec) {
        if (Math.abs(dy) < 8 && Math.abs(dx) < 8) return;
        tdec = 1;
        thj = inHero() && Math.abs(dy) > Math.abs(dx) && !((dy < 0 && settled >= N - 1) || (dy > 0 && settled <= 0));
      }
      if ((thj || returningTouch) && e.cancelable) e.preventDefault();
    };
    const onTE = (e: TouchEvent) => {
      touching = false;
      if (returningTouch) { returningTouch = false; goTo(N - 1); return; }
      if (thj) {
        thj = false;
        const dy = (e.changedTouches[0] ? e.changedTouches[0].clientY : ty0) - ty0;
        if (Math.abs(dy) > 40 && !animating && performance.now() >= coolUntil) step(dy < 0 ? 1 : -1);
      } else { clearTimeout(idle); idle = window.setTimeout(settle, 120); }
    };
    const onResize = () => {
      if (innerWidth === lw && Math.abs(innerHeight - vh) < 150) return;
      lw = innerWidth; vh = innerHeight; render(disp);
    };
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      const tag = document.activeElement?.tagName ?? "";
      if (/INPUT|TEXTAREA|SELECT/.test(tag) || !inHero()) return;
      if (k === "ArrowLeft" || k === "ArrowRight") { goTo(Math.round(target()) + (k === "ArrowRight" ? 1 : -1)); return; }
      if (["ArrowDown", "PageDown", "ArrowUp", "PageUp"].includes(k)) {
        const dir = /Down/.test(k) ? 1 : -1;
        if (animating || performance.now() < coolUntil) { e.preventDefault(); return; }
        if (step(dir)) e.preventDefault();
      }
    };
    api.current = { goTo, rel: (d) => goTo(Math.round(target()) + d) };

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("scrollend", onScrollEnd);
    addEventListener("wheel", onWheel, { passive: false });
    addEventListener("touchstart", onTS, { passive: true });
    addEventListener("touchmove", onTM, { passive: false });
    addEventListener("touchend", onTE, { passive: true });
    addEventListener("touchcancel", onTE, { passive: true });
    addEventListener("resize", onResize);
    addEventListener("keydown", onKey);

    settled = Math.round(target());
    disp = target();
    render(disp);

    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("scrollend", onScrollEnd);
      removeEventListener("wheel", onWheel);
      removeEventListener("touchstart", onTS);
      removeEventListener("touchmove", onTM);
      removeEventListener("touchend", onTE);
      removeEventListener("touchcancel", onTE);
      removeEventListener("resize", onResize);
      removeEventListener("keydown", onKey);
      clearTimeout(idle);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(tw);
    };
  }, []);

  const hid = (i: number) => ({ visibility: i === 0 ? ("visible" as const) : ("hidden" as const) });
  const s = SL[active]!;

  return (
    <div className="sac-hero-root">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;1,400&display=swap" precedence="default" />
      {curtain && (
        <div className="sh-cur" aria-hidden>
          <i className="a" />
          <i className="b" onAnimationEnd={endCurtain} />
          <u>SAC</u>
          <b />
        </div>
      )}
      <div className="sh-track">
        <section className="sh-hero" aria-roledescription="carousel" aria-label="Featured">
          <h1 className="sh-sr">{s.a + s.e}</h1>
          <div className="sh-stage">
            {SL.map((sl, i) => (
              <div key={`bg${i}`} ref={set(i, "bg")} aria-hidden className="bg" style={{ ...hid(i), ["--rm" as string]: sl.rm[0], ["--rm2" as string]: sl.rm[1], background: i === 0 ? "linear-gradient(to bottom,#3d1408 0%,#6a240e 30%,#a8462a 42%,#8a3a22 100%)" : `radial-gradient(90% 95% at 50% 55%,${sl.bg})` }} />
            ))}
            {SL.map((sl, i) => (
              <div key={`c${i}`} style={{ display: "contents" }}>
                <div ref={set(i, "th")} aria-hidden className="th" style={hid(i)}>{THEMES[i]!()}</div>
                <div ref={set(i, "w")} aria-hidden className="w" style={{ ...hid(i), ["--z" as string]: sl.z }}>{sl.w}</div>
                <div ref={set(i, "sh")} aria-hidden className="sh" style={{ ...hid(i), ["--fy" as string]: sl.fy }} />
                <div ref={set(i, "fig")} className="fig" style={hid(i)}>
                  <div ref={set(i, "gl")} aria-hidden className={i === 0 ? "gl gl-weak" : "gl"} style={{ ["--g" as string]: sl.g }} />
                  <img ref={set(i, "f")} className="f" src={sl.img} alt={i === active ? sl.alt : ""} aria-hidden={i !== active} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} decoding="async" />
                </div>
              </div>
            ))}
            <div className={active === 0 ? "veil veil-lite" : "veil"} aria-hidden />
            {SL.map((sl, i) => (
              <div key={`t${i}`} style={{ display: "contents" }}>
                <div ref={set(i, "tl")} className="tl" aria-hidden style={{ ...hid(i), ["--ac" as string]: sl.ac }}>
                  <div ref={set(i, "k")} className="k">{sl.k}</div>
                  <div className="h1">
                    {words(sl.a)} <em>{words(sl.e)}</em>
                  </div>
                </div>
                <div ref={set(i, "tr")} className="tr" style={hid(i)}>
                  <p className="pp">{sl.p}</p>
                  <Link to="/events" tabIndex={i === active ? 0 : -1} className="sh-cta group inline-flex shrink-0 items-center gap-2 bg-primary px-4 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-primary-foreground sm:gap-3 sm:px-6 sm:py-3.5 sm:tracking-[0.16em]">
                    Explore events
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="sh-sp" aria-hidden>
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} style={{ left: `${8 + i * 10.5}%`, ["--t" as string]: `${14 + ((i * 7) % 9)}s`, ["--dl" as string]: `${-(i * 3.3)}s`, ["--dx" as string]: `${(i % 2 ? 1 : -1) * (20 + i * 6)}px` }} />
            ))}
          </div>
          <div className="sh-tabs">
            <button className="ar" aria-label="Previous" onClick={() => api.current.rel(-1)}>←</button>
            {SL.map((sl, i) => (
              <button key={sl.k} className={i === active ? "on" : ""} aria-pressed={i === active} onClick={() => api.current.goTo(i)}>{sl.k}</button>
            ))}
            <button className="ar" aria-label="Next" onClick={() => api.current.rel(1)}>→</button>
          </div>
          <div className="sh-hint" aria-hidden>SCROLL</div>
        </section>
      </div>
    </div>
  );
}
