/* Hero — scroll-driven cinematic video, then 3D photo emerge over text */

/* Shared smoothed scroll value. Tracks real window.scrollY with a lerp so
   every animation tied to it (video currentTime, opacities, transforms)
   advances frame-by-frame instead of jumping each wheel event. */
function useSmoothScroll() {
  const [smooth, setSmooth] = React.useState(0);
  React.useEffect(() => {
    let raf;
    let cur = window.scrollY;
    let last = cur;
    const tick = () => {
      const target = window.scrollY;
      cur += (target - cur) * 0.12;
      if (Math.abs(target - cur) < 0.2) cur = target;
      // Only push to React state when value changed meaningfully (saves 60 renders/s when idle)
      if (Math.abs(cur - last) > 0.3) {
        last = cur;
        setSmooth(cur);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return smooth;
}

function useScrollProgress(ref, smoothY) {
  return React.useMemo(() => {
    const el = ref.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    // rect.top is from current real scroll; convert to absolute then to smoothed
    const absTop = rect.top + window.scrollY;
    const total = rect.height - window.innerHeight;
    const passed = smoothY - absTop;
    return Math.max(0, Math.min(1, passed / total));
  }, [smoothY, ref.current]);
}

function Hero() {
  const wrapRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const smoothY = useSmoothScroll();
  const progress = useScrollProgress(wrapRef, smoothY);
  const [vidDuration, setVidDuration] = React.useState(0);
  const [vidReady, setVidReady] = React.useState(false);
  const targetTimeRef = React.useRef(0);
  const lastSeekRef = React.useRef(0);

  // map progress 0->1 to video time, but reserve last 18% for the final-phrase reveal
  const videoProgress = Math.min(1, progress / 0.82);
  const finalReveal = Math.max(0, (progress - 0.78) / 0.22);

  // Load video via blob URL so seeking works (server doesn't expose Range)
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let blobUrl = null;
    let cancelled = false;

    const onMeta = () => { if (!cancelled) { setVidDuration(v.duration || 0); setVidReady(true); } };

    fetch('assets/hero-video.mp4')
      .then(r => r.blob())
      .then(b => {
        if (cancelled) return;
        blobUrl = URL.createObjectURL(b);
        v.muted = true;
        v.defaultMuted = true;
        v.src = blobUrl;
        v.load();
        v.addEventListener('loadedmetadata', onMeta, {once: true});
        v.addEventListener('loadeddata', onMeta, {once: true});
        // Warm up decoder
        const p = v.play();
        if (p && p.then) p.then(() => { v.pause(); v.currentTime = 0; }).catch(()=>{});
      })
      .catch(err => console.error('[hero] fetch failed', err));

    return () => {
      cancelled = true;
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('loadeddata', onMeta);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  // Track target seek time
  React.useEffect(() => {
    if (!vidDuration) return;
    targetTimeRef.current = videoProgress * vidDuration;
  }, [videoProgress, vidDuration]);

  // Persistent RAF: lerp video currentTime toward target.
  // Smaller threshold = more frequent seeks = smoother but heavier.
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf;
    let cur = 0;
    const tick = () => {
      const tgt = targetTimeRef.current;
      cur += (tgt - cur) * 0.25;
      const now = performance.now();
      if (v.readyState >= 1 && now - lastSeekRef.current > 33 && Math.abs(v.currentTime - cur) > 0.04) {
        try { v.currentTime = cur; } catch(e){}
        lastSeekRef.current = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // visual mappings
  const ringScale = 1 - finalReveal * 0.15;
  const ringOpacity = 1 - finalReveal * 0.6;
  const textFadeIn = Math.max(0, 1 - progress / 0.15);
  const orbitRot = progress * 90;

  // active step (0..3)
  const step = Math.min(3, Math.floor(progress / 0.25));

  const steps = [
    { label: 'APROXIMAÇÃO' },
    { label: 'ÓRBITA 360°' },
    { label: 'CONTATO VISUAL' },
    { label: 'DIRETO PARA VOCÊ' },
  ];

  return (
    <section className="hero-pin" ref={wrapRef} data-screen-label="01 Hero">
      <div className="hero-sticky">
        <div className="grid-bg"></div>

        {/* Orbiting rings */}
        <div className="orbit-ring r1" style={{ transform: `translate(-50%,-50%) rotate(${orbitRot}deg) scale(${1 - finalReveal*0.1})`, opacity: ringOpacity }}>
          <div className="orbit-dot" style={{ right: '4%', top: '34%' }}></div>
          <div className="orbit-dot" style={{ left: '6%', bottom: '20%' }}></div>
        </div>
        <div className="orbit-ring r2" style={{ transform: `translate(-50%,-50%) rotate(${-orbitRot*0.7}deg)`, opacity: ringOpacity * 0.7 }}>
          <div className="orbit-dot" style={{ left: '12%', bottom: '20%' }}></div>
        </div>
        <div className="orbit-ring r3" style={{ transform: `translate(-50%,-50%) rotate(${orbitRot*0.4}deg)`, opacity: ringOpacity * 0.4 }}>
          <div className="orbit-dot" style={{ right: '18%', top: '12%' }}></div>
        </div>

        {/* Floating chips around video */}
        <div className="hero-chip" style={{ top: '20%', right: '8%', opacity: ringOpacity }}>
          <span className="chip-dot"></span>REC · 4K
        </div>
        <div className="hero-chip mono-only" style={{ bottom: '18%', right: '8%', opacity: ringOpacity }}>
          [ 00:0{Math.floor(videoProgress*8)} / 00:08 ]
        </div>

        {/* Particles */}
        <Particles count={28} />

        {/* Video circle */}
        <div className="hero-video-wrap" style={{ opacity: ringOpacity, transform: `scale(${ringScale})` }}>
          <div className="hero-video-frame">
            <video
              ref={videoRef}
              className="hero-video"
              muted
              playsInline
              preload="auto"
            ></video>
            {!vidReady && (
              <div className="hero-frame-loading">
                <div className="hero-frame-loading-bar"><span style={{ width: '100%' }}></span></div>
                <div className="hero-frame-loading-text">CARREGANDO EXPERIÊNCIA</div>
              </div>
            )}
          </div>
        </div>

        {/* Text overlay (early phase) */}
        <div className="hero-text-layer" style={{ opacity: textFadeIn }}>
          <div>
            <div className="hero-eyebrow"><span className="bar"></span>PORTFÓLIO · 2026</div>
            <h1 className="hero-headline">
              Sua marca<br/>merece <em>mais</em><br/>do que apenas<br/>um site.
            </h1>
          </div>

          <div className="hero-bottom">
            <div className="hero-stat">
              <strong>47 projetos</strong>
              landing pages entregues
            </div>
            <div className="hero-stat">
              <strong>+312% <span className="accent">↑</span></strong>
              conversão média
            </div>
            <div className="hero-stat">
              <strong>0.8s</strong>
              tempo de carregamento
            </div>
          </div>
        </div>

        {/* Progress steps */}
        <div className="hero-progress">
          {steps.map((s, i) => (
            <div key={i} className={`hero-progress-step ${i === step ? 'active' : ''}`}>
              <span className="num">0{i+1}</span>
              <span className="dot"></span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Final phrase */}
        <div className="hero-final-phrase" style={{ opacity: finalReveal, transform: `scale(${0.95 + finalReveal*0.05})`, filter: `blur(${(1-finalReveal)*12}px)` }}>
          <h2>
            Enquanto outros têm <em>páginas</em>…<br/>
            você pode ter <em>presença</em>.
          </h2>
        </div>

        {/* Scroll hint (only at start) */}
        <div className="hero-scroll-hint" style={{ opacity: textFadeIn }}>
          <span>ROLAR</span>
          <span className="bar"></span>
          <span>EXPERIÊNCIA</span>
        </div>
      </div>
    </section>
  );
}

function Particles({ count = 24 }) {
  const dots = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    dur: 6 + Math.random() * 10,
    delay: -Math.random() * 10,
    o: 0.2 + Math.random() * 0.6,
  })), [count]);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {dots.map(d => (
        <span key={d.id} style={{
          position: 'absolute',
          left: `${d.left}%`, top: `${d.top}%`,
          width: d.size, height: d.size,
          background: '#c6ff00',
          borderRadius: '50%',
          opacity: d.o,
          boxShadow: `0 0 ${d.size*4}px #c6ff00`,
          animation: `particle ${d.dur}s ease-in-out ${d.delay}s infinite`,
        }}></span>
      ))}
      <style>{`@keyframes particle { 0%, 100% { transform: translate(0,0); opacity: 0.2; } 50% { transform: translate(20px, -30px); opacity: 0.9; } }`}</style>
    </div>
  );
}

/* 3D Emerge — portrait comes "out of" the word VOCÊ */
function Emerge() {
  const wrapRef = React.useRef(null);
  const smoothY = useSmoothScroll();
  const progress = useScrollProgress(wrapRef, smoothY);

  // portrait emerges from 0 -> 0.6, then text and CTA reveal
  const emergeP = Math.min(1, progress / 0.55);
  // portrait scale 0.7 -> 1.05
  const scale = 0.72 + emergeP * 0.34;
  // portrait translateY 100% -> 0
  const ty = (1 - emergeP) * 30;
  // bg-text slides from below the portrait
  const textY = -emergeP * 6;

  const ctaReveal = Math.max(0, (progress - 0.45) / 0.35);

  return (
    <section className="emerge-section" ref={wrapRef} data-screen-label="02 Emerge">
      <div className="emerge-sticky">
        <div className="grid-bg"></div>

        {/* big background word */}
        <div className="emerge-bg-text" style={{ transform: `translate(-50%, calc(-50% + ${textY}vh))` }}>
          VO<span className="fill">CÊ</span>
        </div>

        {/* portrait emerging */}
        <div className="emerge-portrait-wrap" style={{
          transform: `translateX(-50%) translateY(${ty}%) scale(${scale})`,
          opacity: Math.min(1, emergeP * 1.4),
        }}>
          <img src="assets/portrait.png" alt="Pedro Rogerio" className="emerge-portrait" />
          {/* faux floor shadow */}
          <div style={{
            position: 'absolute', bottom: '-2px', left: '50%',
            transform: 'translateX(-50%)',
            width: '60%', height: 24,
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.6), transparent 70%)',
            filter: 'blur(8px)',
          }}></div>
        </div>

        {/* subtitle + CTAs */}
        <div className="emerge-subtitle" style={{ opacity: ctaReveal, transform: `translateX(-50%) translateY(${(1-ctaReveal)*20}px)` }}>
          <div className="availability-pill" style={{ marginBottom: 16 }}>
            <span className="live-dot"></span>
            DISPONÍVEL · ABRIL 2026
          </div>
          <p>Agora é a sua vez de impressionar.<br/>O próximo case de sucesso pode ser o seu.</p>
          <div className="cta-row">
            <a className="btn btn-primary" href={WA_LINK} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={16} color="#050505"/>
              Falar comigo no WhatsApp
              <span className="arr">→</span>
            </a>
            <a className="btn btn-ghost" href="#projetos">
              Ver projetos
              <span className="arr">→</span>
            </a>
          </div>
        </div>

        {/* corner accents */}
        <div style={{ position: 'absolute', top: 24, left: 24, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.2em', color: '#5a5a5a' }}>
          [ MOMENTO · 02 / 04 ]
        </div>
        <div style={{ position: 'absolute', top: 24, right: 24, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.2em', color: '#c6ff00' }}>
          DIRETO_PARA_VOCÊ.EXE
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Emerge, useScrollProgress });
