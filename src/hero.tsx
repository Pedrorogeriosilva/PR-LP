import React from 'react';
import { WA_LINK, WhatsAppIcon } from './components';

const HERO_WA_LINK = `https://wa.me/5511960396045?text=${encodeURIComponent(
  'Olá, vim pelo seu portfólio e gostaria de um site profissional.',
)}`;

function useSmoothScroll() {
  const [smooth, setSmooth] = React.useState(typeof window !== 'undefined' ? window.scrollY : 0);
  React.useEffect(() => {
    let raf = 0;
    let cur = window.scrollY;
    let last = cur;

    const tick = () => {
      raf = 0;
      const target = window.scrollY;
      const diff = target - cur;
      cur += diff * 0.18;
      if (Math.abs(diff) < 0.25) cur = target;
      if (Math.abs(cur - last) > 0.3) {
        last = cur;
        setSmooth(cur);
      }
      if (cur !== target) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', kick, { passive: true });
    kick();
    return () => {
      window.removeEventListener('scroll', kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return smooth;
}

export function useScrollProgress(ref: React.RefObject<HTMLElement>, smoothY: number) {
  return React.useMemo(() => {
    const el = ref.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const absTop = rect.top + window.scrollY;
    const total = rect.height - window.innerHeight;
    const passed = smoothY - absTop;
    return Math.max(0, Math.min(1, passed / total));
  }, [smoothY, ref.current]);
}

function useFrameCanvas(sectionRef: React.RefObject<HTMLElement>) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [loadProgress, setLoadProgress] = React.useState(0);
  const [firstFrameReady, setFirstFrameReady] = React.useState(false);
  const [frameNumber, setFrameNumber] = React.useState(1);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !section || !wrap) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const TOTAL = 192;
    const conn = (navigator as any).connection;
    const saveData = Boolean(conn?.saveData);
    const slowNet = /(^|-)(2g|slow-2g)$/.test(conn?.effectiveType || '');
    const small = window.matchMedia('(max-width: 768px)').matches;
    const deviceMemory = (navigator as any).deviceMemory || 8;
    const lowMem = deviceMemory <= 4;

    const stride = saveData || slowNet ? 8 : small || lowMem ? 4 : 3;
    const targetWidth = small ? 540 : 800;

    const indices: number[] = [];
    for (let i = 0; i < TOTAL; i += stride) indices.push(i);
    if (indices[indices.length - 1] !== TOTAL - 1) indices.push(TOTAL - 1);

    const frames = new Map<number, CanvasImageSource>();
    const loadingSet = new Set<number>();

    let active = true;
    let raf = 0;
    let isVisible = false;
    let needsDraw = true;
    let rendered = -1;
    let lastLabel = 1;

    const framePath = (i: number) => `/assets/frames/frame_${String(i + 1).padStart(4, '0')}.webp`;

    const loadFrame = async (index: number) => {
      if (!active || frames.has(index) || loadingSet.has(index)) return;
      loadingSet.add(index);
      try {
        const res = await fetch(framePath(index));
        const blob = await res.blob();
        if (!active) return;
        let bmp: CanvasImageSource;
        if ('createImageBitmap' in window) {
          try {
            bmp = await createImageBitmap(blob, { resizeWidth: targetWidth, resizeQuality: 'high' });
          } catch {
            bmp = await createImageBitmap(blob);
          }
        } else {
          bmp = await new Promise<HTMLImageElement>((resolve, reject) => {
            const im = new Image();
            im.decoding = 'async';
            im.onload = () => resolve(im);
            im.onerror = reject;
            im.src = URL.createObjectURL(blob);
          });
        }
        if (!active) {
          if (bmp && 'close' in bmp && typeof (bmp as ImageBitmap).close === 'function') {
            (bmp as ImageBitmap).close();
          }
          return;
        }
        frames.set(index, bmp);
        if (index === 0) setFirstFrameReady(true);
        setLoadProgress(Math.round((frames.size / indices.length) * 100));
        needsDraw = true;
        kick();
      } catch {
        // silently skip failed frames — nearest-neighbor will cover
      } finally {
        loadingSet.delete(index);
      }
    };

    const nearestLoaded = (target: number): number => {
      if (frames.has(target)) return target;
      for (let d = 1; d < TOTAL; d += 1) {
        const lo = target - d;
        const hi = target + d;
        if (lo >= 0 && frames.has(lo)) return lo;
        if (hi < TOTAL && frames.has(hi)) return hi;
      }
      return -1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rendered = -1;
      needsDraw = true;
      kick();
    };

    function tick() {
      raf = 0;
      if (!active || !isVisible) return;

      const rect = section.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const p = Math.max(0, Math.min(1, -rect.top / total));
      const targetIdx = Math.max(0, Math.min(TOTAL - 1, Math.round(p * (TOTAL - 1))));
      const drawIdx = nearestLoaded(targetIdx);

      if (drawIdx >= 0 && (drawIdx !== rendered || needsDraw)) {
        const img = frames.get(drawIdx)!;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        const iw = Number((img as ImageBitmap).width);
        const ih = Number((img as ImageBitmap).height);
        const scale = Math.max(w / iw, h / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const x = (w - dw) / 2;
        const y = (h - dh) / 2;
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, x, y, dw, dh);
        rendered = drawIdx;
        needsDraw = false;
      }

      const label = targetIdx + 1;
      if (label !== lastLabel) {
        lastLabel = label;
        setFrameNumber(label);
      }
    }

    function kick() {
      if (!raf && isVisible && active) raf = requestAnimationFrame(tick);
    }

    const onScroll = () => kick();

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) {
          needsDraw = true;
          kick();
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(section);

    resize();
    window.addEventListener('resize', resize, { passive: true });
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener('scroll', onScroll, { passive: true });

    const warmConcurrency = saveData || slowNet ? 1 : small ? 2 : 3;
    const warmQueue = async () => {
      let cursor = 0;
      const workers = Array.from({ length: warmConcurrency }, async () => {
        while (active && cursor < indices.length) {
          const i = cursor;
          cursor += 1;
          await loadFrame(indices[i]);
        }
      });
      await Promise.all(workers);
    };

    loadFrame(indices[0]).then(() => {
      const ric =
        (window as any).requestIdleCallback ||
        ((cb: () => void) => window.setTimeout(cb, 1));
      ric(warmQueue);
    });

    return () => {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      ro.disconnect();
      io.disconnect();
      frames.forEach((img) => {
        if (img && 'close' in img && typeof (img as ImageBitmap).close === 'function') {
          (img as ImageBitmap).close();
        }
      });
      frames.clear();
    };
  }, []);

  return { canvasRef, loadProgress, firstFrameReady, frameNumber };
}

function Particles({ count = 24 }: { count?: number }) {
  const dots = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        dur: 6 + Math.random() * 10,
        delay: -Math.random() * 10,
        o: 0.2 + Math.random() * 0.6,
      })),
    [count],
  );
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {dots.map((d) => (
        <span
          key={d.id}
          style={{
            position: 'absolute',
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: '#c6ff00',
            borderRadius: '50%',
            opacity: d.o,
            boxShadow: `0 0 ${d.size * 4}px #c6ff00`,
            animation: `particle ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        ></span>
      ))}
      <style>{`@keyframes particle { 0%, 100% { transform: translate(0,0); opacity: 0.2; } 50% { transform: translate(20px, -30px); opacity: 0.9; } }`}</style>
    </div>
  );
}

export function Hero() {
  const wrapRef = React.useRef<HTMLElement>(null);
  const smoothY = useSmoothScroll();
  const progress = useScrollProgress(wrapRef, smoothY);
  const { canvasRef, loadProgress, firstFrameReady, frameNumber } = useFrameCanvas(wrapRef);
  const isCompact =
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches);

  const progressLabel = loadProgress;
  const finalReveal = Math.max(0, Math.min(1, (progress - 0.76) / 0.2));
  const introReveal = Math.max(0, Math.min(1, 1 - progress / 0.22));
  const ringScale = 1 - finalReveal * 0.15;
  const ringOpacity = 1 - finalReveal * 0.62;
  const orbitRot = progress * 90;
  const step = Math.min(3, Math.floor(progress / 0.25));
  const steps = ['APROXIMACAO', 'ORBITA 360', 'CONTATO VISUAL', 'DIRETO PARA VOCE'];

  return (
    <section className="hero-pin" ref={wrapRef} data-screen-label="01 Hero">
      <div className="hero-sticky">
        <div className="grid-bg"></div>

        <div
          className="orbit-ring r1"
          style={{
            transform: `translate(-50%,-50%) rotate(${orbitRot}deg) scale(${1 - finalReveal * 0.1})`,
            opacity: ringOpacity,
          }}
        >
          <div className="orbit-dot" style={{ right: '4%', top: '34%' }}></div>
          <div className="orbit-dot" style={{ left: '6%', bottom: '20%' }}></div>
        </div>
        <div
          className="orbit-ring r2"
          style={{ transform: `translate(-50%,-50%) rotate(${-orbitRot * 0.7}deg)`, opacity: ringOpacity * 0.7 }}
        >
          <div className="orbit-dot" style={{ left: '12%', bottom: '20%' }}></div>
        </div>
        <div
          className="orbit-ring r3"
          style={{ transform: `translate(-50%,-50%) rotate(${orbitRot * 0.4}deg)`, opacity: ringOpacity * 0.4 }}
        >
          <div className="orbit-dot" style={{ right: '18%', top: '12%' }}></div>
        </div>

        <div className="hero-chip" style={{ top: '20%', right: '8%', opacity: ringOpacity }}>
          <span className="chip-dot"></span>CANVAS · 192 FRAMES
        </div>
        <div className="hero-chip mono-only" style={{ bottom: '18%', right: '8%', opacity: ringOpacity }}>
          [ FRAME {String(frameNumber).padStart(4, '0')} / 0192 ]
        </div>

        <Particles count={isCompact ? 10 : 28} />

        <div className="hero-video-wrap" style={{ opacity: ringOpacity, transform: `scale(${ringScale})` }}>
          <div className="hero-video-frame">
            <canvas ref={canvasRef} className="hero-frame-canvas" aria-label="Sequencia em frames do portfolio" />
            <div className="hero-frame-shade"></div>
            {!firstFrameReady && (
              <div className="hero-frame-loading" aria-live="polite">
                <div className="hero-frame-loading-bar">
                  <span style={{ width: `${progressLabel}%` }}></span>
                </div>
                <div className="hero-frame-loading-text">CARREGANDO FRAMES · {progressLabel}%</div>
              </div>
            )}
          </div>
        </div>

        <div
          className="hero-text-layer"
          style={{
            opacity: introReveal,
            transform: `translateY(${(1 - introReveal) * 18}px)`,
            filter: `blur(${(1 - introReveal) * 10}px)`,
          }}
        >
          <div>
            <div className="hero-eyebrow">
              <span className="bar"></span>AINDA SEM SITE? · 2026
            </div>
            <h1 className="hero-headline">
              Sem site,
              <br />
              sua marca não <em>existe</em>.
            </h1>
          </div>

          <div className="hero-bottom">
            <div className="hero-stat">
              <strong>9 em 10 <span className="accent">↗</span></strong>
              pesquisam no Google antes de comprar
            </div>
            <div className="hero-stat">
              <strong>24h</strong>
              vendendo enquanto você dorme
            </div>
            <div className="hero-stat">
              <strong>3 dias</strong>
              do briefing ao site no ar
            </div>
          </div>
        </div>

        <div className="hero-progress">
          {steps.map((label, i) => (
            <div key={label} className={`hero-progress-step ${i === step ? 'active' : ''}`}>
              <span className="num">0{i + 1}</span>
              <span className="dot"></span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div
          className="hero-final-phrase"
          style={{
            opacity: finalReveal,
            transform: `scale(${0.95 + finalReveal * 0.05})`,
            filter: `blur(${(1 - finalReveal) * 12}px)`,
          }}
        >
          <h2>
            Hoje você decide:
            <br />
            continuar <em>invisível</em>
            <br />
            ou ter <em>presença</em>.
          </h2>
          <a className="hero-final-cta" href={HERO_WA_LINK} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={18} color="#050505" />
            Falar comigo no WhatsApp
            <span>↗</span>
          </a>
        </div>

        <div className="hero-scroll-hint" style={{ opacity: introReveal }}>
          <span>ROLE</span>
          <span className="bar"></span>
          <span>PARA DESCOBRIR</span>
        </div>
      </div>
    </section>
  );
}

/* 3D Emerge */
export function Emerge() {
  const wrapRef = React.useRef<HTMLElement>(null);
  const smoothY = useSmoothScroll();
  const progress = useScrollProgress(wrapRef, smoothY);

  const emergeP = Math.min(1, progress / 0.55);
  const scale = 0.72 + emergeP * 0.34;
  const ty = (1 - emergeP) * 30;
  const textY = -emergeP * 6;
  const ctaReveal = Math.max(0, (progress - 0.45) / 0.35);

  return (
    <section className="emerge-section" ref={wrapRef} data-screen-label="02 Emerge">
      <div className="emerge-sticky">
        <div className="grid-bg"></div>

        <div className="emerge-bg-text" style={{ transform: `translate(-50%, calc(-50% + ${textY}vh))` }}>
          VO<span className="fill">CÊ</span>
        </div>

        <div
          className="emerge-portrait-wrap"
          style={{
            transform: `translateX(-50%) translateY(${ty}%) scale(${scale})`,
            opacity: Math.min(1, emergeP * 1.4),
          }}
        >
          <img
            src="/assets/portrait.png"
            alt="Pedro Rogerio"
            className="emerge-portrait"
            loading="lazy"
            decoding="async"
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-2px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: 24,
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.6), transparent 70%)',
              filter: 'blur(8px)',
            }}
          ></div>
        </div>

        <div
          className="emerge-subtitle"
          style={{
            opacity: ctaReveal,
            transform: `translateX(-50%) translateY(${(1 - ctaReveal) * 20}px)`,
          }}
        >
          <div className="availability-pill" style={{ marginBottom: 16 }}>
            <span className="live-dot"></span>
            DISPONIVEL · ABRIL 2026
          </div>
          <p>
            Agora é a sua vez de impressionar.
            <br />O próximo case de sucesso pode ser o seu.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href={WA_LINK} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={16} color="#050505" />
              Falar comigo no WhatsApp
              <span className="arr">→</span>
            </a>
            <a className="btn btn-ghost" href="#projetos">
              Ver projetos
              <span className="arr">→</span>
            </a>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            letterSpacing: '0.2em',
            color: '#5a5a5a',
          }}
        >
          [ MOMENTO · 02 / 04 ]
        </div>
        <div
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10,
            letterSpacing: '0.2em',
            color: '#c6ff00',
          }}
        >
          DIRETO_PARA_VOCE.EXE
        </div>
      </div>
    </section>
  );
}
