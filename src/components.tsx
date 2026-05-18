import React from 'react';

/* Shared constants */
export const WA_PHONE = '5511936236227';
const WA_MSG = encodeURIComponent(
  'Olá Pedro, vim pelo seu portfólio e quero um site profissional.',
);
export const WA_LINK = `https://wa.me/${WA_PHONE}?text=${WA_MSG}`;

/* Icons */
export function WhatsAppIcon({
  size = 16,
  color = 'currentColor',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.224 8.224 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23a8.21 8.21 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.41-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.06 0 1.21.88 2.38 1.01 2.55.12.17 1.74 2.65 4.22 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.18-.48-.3z"
        fill={color}
      />
    </svg>
  );
}

export function ArrowUR({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path
        d="M3 9L9 3M9 3H4M9 3V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Custom cursor */
export function Cursor() {
  const ringRef = React.useRef<HTMLDivElement>(null);
  const dotRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest(
        'a, button, .project-card, .service-card, .process-step, .testimonial-card',
      );
      if (t) ring.classList.add('hover');
      else ring.classList.remove('hover');
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor"></div>
      <div ref={dotRef} className="cursor-dot"></div>
    </>
  );
}

/* Loader */
export function Loader() {
  const [hidden, setHidden] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1600);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`loader ${hidden ? 'hidden' : ''}`}>
      <div className="loader-logo">
        Pedro Rogerio<span style={{ color: '#c6ff00' }}>.</span>
      </div>
      <div className="loader-bar"></div>
      <div className="loader-meta">[ INICIANDO EXPERIÊNCIA · 2026 ]</div>
    </div>
  );
}

/* Nav */
export function Nav() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <span className="nav-logo-dot"></span>
        PEDRO_ROGERIO<span style={{ color: '#c6ff00' }}>.dev</span>
      </div>
      <div className="nav-links">
        <a href="#projetos">Projetos</a>
        <a href="#servicos">Serviços</a>
        <a href="#processo">Processo</a>
        <a href="#contato">Contato</a>
      </div>
      <a className="nav-cta" href={WA_LINK} target="_blank" rel="noreferrer">
        Iniciar projeto
        <ArrowUR size={11} />
      </a>
    </nav>
  );
}

/* Floating WhatsApp */
export function WhatsAppFloat() {
  return (
    <a className="wa-float" href={WA_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp">
      <span className="wa-float-icon">
        <WhatsAppIcon size={18} color="#c6ff00" />
      </span>
      <span className="wa-float-label">Falar agora</span>
    </a>
  );
}

/* Reveal-on-scroll wrapper */
type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  [key: string]: any;
};

export function Reveal({ children, delay = 0, as = 'div', className = '', ...rest }: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let revealed = false;
    const reveal = () => {
      if (!revealed) {
        revealed = true;
        el.classList.add('in');
      }
    };
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
        reveal();
        window.removeEventListener('scroll', check);
        window.removeEventListener('resize', check);
      }
    };
    check();
    if (!revealed) {
      window.addEventListener('scroll', check, { passive: true });
      window.addEventListener('resize', check);
    }
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);
  const Tag = as as any;
  const delayClass = delay ? ` reveal-delay-${delay}` : '';
  return (
    <Tag ref={ref} className={`reveal${delayClass} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* Ticker */
export function Ticker() {
  const items = [
    'Landing Pages que convertem',
    'Experiências cinematográficas',
    'Conversion-focused design',
    'Performance · Vercel · Edge',
    'Motion · GSAP · Three.js',
  ];
  const renderRow = (key: string) => (
    <span key={key}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="dot"></span>}
          <span className={i % 2 === 0 ? '' : 'neon'}>{it}</span>
        </React.Fragment>
      ))}
      <span className="dot"></span>
    </span>
  );
  return (
    <div className="ticker">
      <div className="ticker-track">
        {renderRow('a')}
        {renderRow('b')}
      </div>
    </div>
  );
}
