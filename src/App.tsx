import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Cursor, Loader, Nav, Ticker, WhatsAppFloat } from './components';
import { Hero } from './hero';


// Below-fold sections are code-split — they only download when the user scrolls down,
// drastically shrinking the initial bundle and Time-to-Interactive on mobile.
const MoneyMachine = React.lazy(() =>
  import('./money').then((m) => ({ default: m.MoneyMachine })),
);
const Projects = React.lazy(() =>
  import('./sections').then((m) => ({ default: m.Projects })),
);
const Services = React.lazy(() =>
  import('./sections').then((m) => ({ default: m.Services })),
);
const Process = React.lazy(() =>
  import('./sections').then((m) => ({ default: m.Process })),
);
const Testimonials = React.lazy(() =>
  import('./sections').then((m) => ({ default: m.Testimonials })),
);
const FinalCTA = React.lazy(() =>
  import('./sections').then((m) => ({ default: m.FinalCTA })),
);
const Footer = React.lazy(() =>
  import('./sections').then((m) => ({ default: m.Footer })),
);

const TWEAKS = {
  neon: '#c6ff00',
  showCursor: true,
  showWAFloat: true,
  showLoader: false,
};

const FallbackBlock = ({ h = '60vh' }: { h?: string }) => (
  <div aria-hidden="true" style={{ minHeight: h }} />
);

function DeferredSection({
  children,
  h = '100vh',
  id,
  rootMargin = '900px 0px',
}: {
  children: React.ReactNode;
  h?: string;
  id?: string;
  rootMargin?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || shouldRender) return;
    if (id && window.location.hash.slice(1) === id) {
      setShouldRender(true);
      return;
    }
    if (!('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, rootMargin, shouldRender]);

  return (
    <div ref={ref} id={id} style={id ? { scrollMarginTop: 16 } : undefined}>
      {shouldRender ? children : <FallbackBlock h={h} />}
    </div>
  );
}

export default function App() {
  // Touch & coarse-pointer devices skip the cinematic cursor entirely (saves work + jank)
  const isTouchLike =
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches || !window.matchMedia('(hover: hover)').matches);

  React.useEffect(() => {
    const c = TWEAKS.neon;
    document.documentElement.style.setProperty('--neon', c);
    const hex2rgb = (h: string): [number, number, number] => {
      const n = h.replace('#', '');
      const v = n.length === 3 ? n.split('').map((ch) => ch + ch).join('') : n;
      return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
    };
    try {
      const [r, g, b] = hex2rgb(c);
      document.documentElement.style.setProperty('--neon-dim', `rgba(${r},${g},${b},0.35)`);
      document.documentElement.style.setProperty('--neon-soft', `rgba(${r},${g},${b},0.08)`);
    } catch (e) {}
  }, []);

  React.useEffect(() => {
    const timers: number[] = [];
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      [0, 120, 360, 900, 1600, 2600, 4200].forEach((delay) => {
        const timer = window.setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ block: 'start' });
        }, delay);
        timers.push(timer);
      });
    };
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      window.removeEventListener('hashchange', scrollToHash);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (

    
    <>
      {TWEAKS.showLoader && <Loader />}
      {TWEAKS.showCursor && !isTouchLike && <Cursor />}
      <Nav />
      <main>
        <Hero />
        <DeferredSection id="whatsapp" h="460vh">
          <React.Suspense fallback={<FallbackBlock h="460vh" />}>
            <MoneyMachine />
          </React.Suspense>
        </DeferredSection>
        <DeferredSection h="64px">
          <Ticker />
        </DeferredSection>
        <DeferredSection id="projetos" h="440vh">
          <React.Suspense fallback={<FallbackBlock h="440vh" />}>
            <Projects />
          </React.Suspense>
        </DeferredSection>
        <DeferredSection id="servicos" h="100vh">
          <React.Suspense fallback={<FallbackBlock h="100vh" />}>
            <Services />
          </React.Suspense>
        </DeferredSection>
        <DeferredSection id="processo" h="90vh">
          <React.Suspense fallback={<FallbackBlock h="90vh" />}>
            <Process />
          </React.Suspense>
        </DeferredSection>
        <DeferredSection h="80vh">
          <React.Suspense fallback={<FallbackBlock h="80vh" />}>
            <Testimonials />
          </React.Suspense>
        </DeferredSection>
        <DeferredSection id="contato" h="80vh">
          <React.Suspense fallback={<FallbackBlock h="80vh" />}>
            <FinalCTA />
          </React.Suspense>
        </DeferredSection>
      </main>
      <DeferredSection h="40vh">
        <React.Suspense fallback={<FallbackBlock h="40vh" />}>
          <Footer />
        </React.Suspense>
      </DeferredSection>
      {TWEAKS.showWAFloat && <WhatsAppFloat />}
      <Analytics />
    </>
  );
}
