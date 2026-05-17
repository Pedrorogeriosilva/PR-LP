import React from 'react';
import { ArrowUR, Reveal, WA_LINK, WhatsAppIcon } from './components';
import './reel.css';

/* ===== Projects Reel — scroll-pinned deck ===== */

type ReelProject = {
  index: string;
  name: string;
  niche: string;
  city: string;
  year: string;
  objective: string;
  highlight: string;
  tech: string[];
  stat: { n: string; label: string };
  stat2: { n: string; label: string };
  url: string;
  domain: string;
  image: string;
  palette: { bg: string; ink: string; accent: string; soft: string };
  Mock: React.FC;
};

const PROJECTS_REEL: ReelProject[] = [
  {
    index: '01',
    name: 'Next Level Club',
    niche: 'CLUBE PREMIUM · LIFESTYLE',
    city: 'BRASIL',
    year: '2025',
    objective:
      'Landing para captação de membros de clube de alta performance. Posicionamento exclusivo, narrativa de upgrade de vida e funil de aplicação por etapas.',
    highlight: 'Aplicação privada · Acesso por convite',
    tech: ['Next.js', 'GSAP', 'Vercel', 'Tailwind'],
    stat: { n: '98', label: 'PERFORMANCE' },
    stat2: { n: '1.2s', label: 'LCP' },
    url: 'https://www.next-level-club-lp.com.br/',
    domain: 'next-level-club-lp.com.br',
    image: '/assets/projects/next-leve.webp',
    palette: {
      bg: 'linear-gradient(135deg,#06120a 0%,#0a1f12 55%,#0d2a18 100%)',
      ink: '#e9f7ec',
      accent: '#3fbf6f',
      soft: 'rgba(63,191,111,0.18)',
    },
    Mock: NextLevelMock,
  },
  {
    index: '02',
    name: 'Jana Estética',
    niche: 'ESTÉTICA AVANÇADA · BEAUTY',
    city: 'SÃO PAULO · BR',
    year: '2025',
    objective:
      'Site da clínica de estética premium da Jana. Estética refinada com tipografia serifa, agendamento direto e showcase de procedimentos por especialidade.',
    highlight: 'Agendamento integrado · Avaliação gratuita',
    tech: ['React', 'Framer Motion', 'Vercel'],
    stat: { n: '3d', label: 'DO BRIEFING AO AR' },
    stat2: { n: '1.1s', label: 'LCP' },
    url: 'https://www.jana-estetica.com.br/',
    domain: 'jana-estetica.com.br',
    image: '/assets/projects/jana-estetica.webp',
    palette: {
      bg: 'linear-gradient(135deg,#1a0b12 0%,#26121d 55%,#321828 100%)',
      ink: '#fbe6ee',
      accent: '#f4a8b8',
      soft: 'rgba(244,168,184,0.18)',
    },
    Mock: JanaMock,
  },
  {
    index: '03',
    name: 'Espaço Mulher SP',
    niche: 'BEM-ESTAR · FEMININO',
    city: 'SÃO PAULO · BR',
    year: '2025',
    objective:
      'Plataforma para espaço de bem-estar feminino. Atmosfera acolhedora, identidade visual delicada e funil de agendamento simplificado para múltiplos serviços.',
    highlight: 'Multi-serviços · Booking em 3 toques',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    stat: { n: '97', label: 'MOBILE SCORE' },
    stat2: { n: '0.9s', label: 'LCP' },
    url: 'https://www.xn--espaomulhersp-lgb.com.br/',
    domain: 'espaçomulhersp.com.br',
    image: '/assets/projects/espaco-mulher.webp',
    palette: {
      bg: 'linear-gradient(135deg,#1a0612 0%,#2a0a1f 55%,#3a0e2c 100%)',
      ink: '#ffe7f1',
      accent: '#ff3da1',
      soft: 'rgba(255,61,161,0.22)',
    },
    Mock: EspacoMulherMock,
  },
  {
    index: '04',
    name: 'Aurora Dental',
    niche: 'ODONTOLOGIA · CLÍNICA',
    city: 'BRASIL',
    year: '2025',
    objective:
      'Identidade digital para clínica odontológica Aurora. Atmosfera clean clinical, foco em confiança, antes-e-depois e CTAs diretos para primeira consulta.',
    highlight: 'Primeira consulta · Avaliação 360°',
    tech: ['React', 'Tailwind', 'Vercel'],
    stat: { n: '100', label: 'ACESSIBILIDADE' },
    stat2: { n: '1.0s', label: 'LCP' },
    url: 'https://aurora-dental.lovable.app/',
    domain: 'aurora-dental.lovable.app',
    image: '/assets/projects/ilumina-dental.webp',
    palette: {
      bg: 'linear-gradient(135deg,#06101c 0%,#0a1a30 55%,#0e2548 100%)',
      ink: '#e6f1ff',
      accent: '#4ea8ff',
      soft: 'rgba(78,168,255,0.20)',
    },
    Mock: AuroraMock,
  },
];

/* ----- Mocks: one tailored composition per niche ----- */

function NextLevelMock() {
  return (
    <div className="reel-mock reel-mock--nlc">
      <div className="reel-mock-grid" />
      <div className="reel-mock-glow" />
      <div className="nlc-card">
        <div className="nlc-card-top">
          <span>N L · CLUB</span>
          <span>★ MEMBER</span>
        </div>
        <div className="nlc-card-no">N° 00184 / 500</div>
        <div className="nlc-card-name">PEDRO ROGERIO</div>
        <div className="nlc-card-foot">
          <span>2025 — 2026</span>
          <span>BLACK TIER</span>
        </div>
      </div>
      <div className="nlc-tagline">
        <em>Up.Level.</em><br />Your.Life.
      </div>
      <div className="reel-mock-corner reel-mock-corner--tl">REC · 4K</div>
      <div className="reel-mock-corner reel-mock-corner--br">PRIVATE · APPLY</div>
    </div>
  );
}

function JanaMock() {
  return (
    <div className="reel-mock reel-mock--jana">
      <div className="jana-orb jana-orb-a" />
      <div className="jana-orb jana-orb-b" />
      <div className="jana-display">
        <div className="jana-eyebrow">— Estética Avançada</div>
        <h4 className="jana-title">Sua melhor versão,<br /><em>sem atalhos.</em></h4>
        <div className="jana-strip">
          <span>HARMONIZAÇÃO</span>
          <span>SKIN BOOSTER</span>
          <span>BIOESTIMULADOR</span>
        </div>
        <div className="jana-chip">
          <span className="jana-chip-dot" />
          Agendar avaliação · Hoje
        </div>
      </div>
      <div className="reel-mock-corner reel-mock-corner--tl">JANA / 2025</div>
      <div className="reel-mock-corner reel-mock-corner--br">@JANA.ESTETICA</div>
    </div>
  );
}

function EspacoMulherMock() {
  return (
    <div className="reel-mock reel-mock--em">
      <svg className="em-blob" viewBox="0 0 400 400" preserveAspectRatio="none">
        <defs>
          <radialGradient id="emBlob" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(244,168,184,0.55)" />
            <stop offset="100%" stopColor="rgba(244,168,184,0)" />
          </radialGradient>
        </defs>
        <circle cx="160" cy="180" r="160" fill="url(#emBlob)" />
        <circle cx="280" cy="260" r="120" fill="url(#emBlob)" opacity="0.7" />
      </svg>
      <div className="em-phone">
        <div className="em-phone-notch" />
        <div className="em-phone-head">
          <span>ESPAÇO MULHER</span>
          <span>·</span>
        </div>
        <h5 className="em-phone-h">Sentir-se<br /><em>bem</em>.</h5>
        <ul className="em-phone-list">
          <li><span /> Massagem relaxante</li>
          <li><span /> Drenagem linfática</li>
          <li><span /> Beauty &amp; spa</li>
        </ul>
        <div className="em-phone-cta">Reservar →</div>
      </div>
      <div className="reel-mock-corner reel-mock-corner--tl">PARA · ELAS</div>
      <div className="reel-mock-corner reel-mock-corner--br">SP · BR</div>
    </div>
  );
}

function AuroraMock() {
  return (
    <div className="reel-mock reel-mock--aurora">
      <div className="aurora-aurora" />
      <div className="aurora-screen">
        <div className="aurora-screen-head">
          <span className="aurora-logo"> AURORA</span>
          <span className="aurora-pill">AGENDAR</span>
        </div>
        <svg className="aurora-smile" viewBox="0 0 200 80">
          <path d="M 20 30 Q 100 80 180 30" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={36 + i * 19}
              y={28 + Math.sin(i / 2) * 4}
              width="14"
              height="22"
              rx="3"
              fill="#fafafa"
              stroke="rgba(15,40,55,0.15)"
              strokeWidth="0.6"
            />
          ))}
        </svg>
        <div className="aurora-h">Um sorriso<br /><em>que abre portas.</em></div>
        <div className="aurora-stats">
          <div><strong>+5.000</strong><span>SORRISOS</span></div>
          <div><strong>4.9★</strong><span>NPS</span></div>
        </div>
      </div>
      <div className="reel-mock-corner reel-mock-corner--tl">AURORA · DENTAL</div>
      <div className="reel-mock-corner reel-mock-corner--br">CLÍNICA · 2025</div>
    </div>
  );
}

/* ----- Local scroll helpers (kept here to avoid coupling to hero.tsx) ----- */

function useScrollY() {
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    let pending = false;
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        pending = false;
        setY(window.scrollY);
      });
    };
    setY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

function useSectionProgress(ref: React.RefObject<HTMLElement>, scrollY: number) {
  return React.useMemo(() => {
    const el = ref.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const absTop = rect.top + window.scrollY;
    const total = rect.height - window.innerHeight;
    if (total <= 0) return 0;
    return Math.max(0, Math.min(1, (scrollY - absTop) / total));
  }, [scrollY, ref.current]);
}

/* ----- Projects (deck reel) ----- */

export function Projects() {
  const wrapRef = React.useRef<HTMLElement>(null);
  const scrollY = useScrollY();
  const progress = useSectionProgress(wrapRef, scrollY);
  const [isCompact, setIsCompact] = React.useState(false);
  const CARDS = PROJECTS_REEL.length;
  // Active slot 0 -> CARDS-1. Pads the start/end so the first/last linger.
  const p = progress * (CARDS - 1);
  const activeIdx = Math.max(0, Math.min(CARDS - 1, Math.round(p)));

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)');
    const update = () => setIsCompact(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  if (isCompact) {
    return (
      <section className="reel-mobile-section" data-screen-label="03 Projects">
        <div className="reel-bg-grid" />
        <Reveal>
          <div className="reel-mobile-head">
            <div className="reel-eyebrow"><span className="bar" />CASES SELECIONADOS</div>
            <h2 className="reel-title">
              Quatro entregas.<br />
              Quatro <em>presenças</em>.
            </h2>
          </div>
        </Reveal>

        <div className="reel-mobile-list">
          {PROJECTS_REEL.map((proj, i) => (
            <Reveal key={proj.index} delay={Math.min(i + 1, 3)}>
              <a
                href={proj.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Abrir site ${proj.name}`}
                className="reel-mobile-card"
                style={{
                  background: proj.palette.bg,
                  color: proj.palette.ink,
                  ['--card-accent' as any]: proj.palette.accent,
                  ['--card-soft' as any]: proj.palette.soft,
                }}
              >
                <div className="reel-mobile-image">
                  <img src={proj.image} alt={`Preview do site ${proj.name}`} loading="lazy" decoding="async" />
                  <span className="reel-card-preview-badge">
                    <span className="reel-card-highlight-dot" />
                    SITE NO AR
                  </span>
                </div>
                <div className="reel-mobile-content">
                  <div className="reel-card-idx">CASE / {proj.index}</div>
                  <h3 className="reel-card-name">{proj.name}<em>.</em></h3>
                  <div className="reel-card-highlight">
                    <span className="reel-card-highlight-dot" />
                    {proj.highlight}
                  </div>
                  <div className="reel-card-stats">
                    <div>
                      <div className="reel-card-stat-num">{proj.stat.n}</div>
                      <span className="reel-card-stat-lbl">{proj.stat.label}</span>
                    </div>
                    <div>
                      <div className="reel-card-stat-num">{proj.stat2.n}</div>
                      <span className="reel-card-stat-lbl">{proj.stat2.label}</span>
                    </div>
                  </div>
                  <div className="reel-card-tech">
                    {proj.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className="reel-section"
      data-screen-label="03 Projects"
      ref={wrapRef}
      style={{ ['--reel-cards' as any]: CARDS }}
    >
      <div className="reel-sticky">
        <div className="reel-bg-grid" />
        <div className="reel-side reel-side--left">
          <div className="reel-side-block">
            <div className="reel-eyebrow"><span className="bar" />CASES SELECIONADOS</div>
            <h2 className="reel-title">
              Quatro entregas.<br />
              Quatro <em>presenças</em>.
            </h2>
            <p className="reel-sub">
              Cada card é um projeto real <em>no ar</em>. Role para folhear o portfólio — quando
              encontrar o seu nicho, abra o site e veja por dentro.
            </p>
            <div className="reel-progress">
              <div className="reel-progress-bar">
                <div
                  className="reel-progress-fill"
                  style={{ transform: `scaleY(${Math.max(0, Math.min(1, progress))})` }}
                />
              </div>
              <div className="reel-progress-meta">
                <span>{String(activeIdx + 1).padStart(2, '0')}</span>
                <span>/</span>
                <span>{String(CARDS).padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          <ol className="reel-toc" aria-label="Projetos">
            {PROJECTS_REEL.map((proj, i) => (
              <li
                key={proj.index}
                className={`reel-toc-item ${i === activeIdx ? 'is-active' : ''} ${
                  i < activeIdx ? 'is-past' : ''
                }`}
              >
                <span className="reel-toc-num">{proj.index}</span>
                <span className="reel-toc-name">{proj.name}</span>
                <span className="reel-toc-line" />
              </li>
            ))}
          </ol>
        </div>

        <div className="reel-stage" aria-label="Deck de projetos">
          {PROJECTS_REEL.map((proj, i) => {
            const delta = i - p;
            const abs = Math.abs(delta);
            // Stack: active centered. Cards below slide up; past cards drift away/up.
            const ahead = delta > 0;
            const translateY = ahead
              ? Math.min(abs, 3) * 22 // future cards stack down + back
              : -Math.min(abs, 3) * 90; // past cards exit upward
            const scale = Math.max(0.78, 1 - abs * 0.06);
            const rotate = ahead ? Math.min(abs, 3) * 1.2 : -Math.min(abs, 3) * 3;
            const opacity = ahead ? Math.max(0, 1 - abs * 0.18) : Math.max(0, 1 - abs * 0.55);
            const isActive = abs < 0.5;
            const z = 100 - Math.round(abs * 10);

            return (
              <a
                key={proj.index}
                href={proj.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Abrir site ${proj.name}`}
                className={`reel-card ${isActive ? 'is-active' : ''} ${
                  delta < -0.5 ? 'is-past' : ''
                }`}
                style={{
                  zIndex: z,
                  opacity,
                  transform: `translate3d(-50%, calc(-50% + ${translateY}px), 0) rotate(${rotate}deg) scale(${scale})`,
                  background: proj.palette.bg,
                  color: proj.palette.ink,
                  ['--card-accent' as any]: proj.palette.accent,
                  ['--card-soft' as any]: proj.palette.soft,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
              >
                <header className="reel-card-head">
                  <span className="reel-card-idx">CASE / {proj.index}</span>
                  <span className="reel-card-niche">{proj.niche}</span>
                  <span className="reel-card-loc">{proj.city} · {proj.year}</span>
                </header>

                <div className="reel-card-body">
                  <div className="reel-card-visual">
                    <img
                      className="reel-card-preview"
                      src={proj.image}
                      alt={`Preview do site ${proj.name}`}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="reel-card-preview-glow" />
                    <div className="reel-card-preview-mask" aria-hidden="true" />
                    <div className="reel-card-preview-badge">
                      <span className="reel-card-highlight-dot" />
                      SITE NO AR
                    </div>
                  </div>

                  <div className="reel-card-text">
                    <h3 className="reel-card-name">{proj.name}<em>.</em></h3>
                    <p className="reel-card-obj">{proj.objective}</p>

                    <div className="reel-card-highlight">
                      <span className="reel-card-highlight-dot" />
                      {proj.highlight}
                    </div>

                    <div className="reel-card-stats">
                      <div>
                        <div className="reel-card-stat-num">{proj.stat.n}</div>
                        <span className="reel-card-stat-lbl">{proj.stat.label}</span>
                      </div>
                      <div>
                        <div className="reel-card-stat-num">{proj.stat2.n}</div>
                        <span className="reel-card-stat-lbl">{proj.stat2.label}</span>
                      </div>
                    </div>

                    <div className="reel-card-foot">
                      <div className="reel-card-tech">
                        {proj.tech.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                      <span className="reel-card-link" aria-hidden="true">
                        <span className="reel-card-link-domain">{proj.domain}</span>
                        <span className="reel-card-link-arr">↗</span>
                      </span>
                    </div>
                  </div>
                </div>

                <footer className="reel-card-foot-bar">
                  <span>SCROLL · PRXIMO CASE</span>
                  <span className="reel-card-foot-bar-line" />
                  <span>{proj.domain}</span>
                </footer>
              </a>
            );
          })}
        </div>

        <div className="reel-hint">
          <span className="reel-hint-bar" />
          ROLE PARA FOLHEAR
        </div>
      </div>
    </section>
  );
}

/* ----- Services ----- */
const SERVICES = [
  {
    num: '01',
    title: 'Landing Page',
    desc: 'Uma página estratégica para apresentar sua oferta, gerar confiança e transformar visitantes em contatos qualificados.',
    list: ['Copy focada em conversão', 'Design responsivo premium', 'Botão direto para WhatsApp', 'Publicação na Vercel'],
  },
  {
    num: '02',
    title: 'Landing Page + Google Ads',
    desc: 'Página pronta para receber tráfego pago, com estrutura de campanha pensada para gerar leads todos os dias.',
    list: ['Landing page completa', 'Configuração do Google Ads', 'Pixel e conversões', 'Otimização inicial da campanha'],
    featured: true,
  },
  {
    num: '03',
    title: 'Loja Virtual + Google Ads',
    desc: 'Uma loja online preparada para vender, divulgar seus produtos e atrair compradores com anúncios no Google.',
    list: ['Vitrine de produtos', 'Checkout ou boto de compra', 'Google Ads para vendas', 'Métricas e acompanhamento'],
  },
];

export function Services() {
  return (
    <section className="section" data-screen-label="04 Services" style={{ paddingTop: 60 }}>
      <Reveal>
        <div className="section-header">
          <div>
            <div className="section-tag">
              <span className="bar"></span>SERVIÇOS · 2026
            </div>
            <h2 className="section-title">
              Não <em>faço</em> sites.
              <br />
              Construo <em>presença digital.</em>
            </h2>
          </div>
          <p className="section-sub">
            Três produtos. Cada um pensado para um momento específico do crescimento da sua marca.
            Sem pacote genérico, sem template.
          </p>
        </div>
      </Reveal>

      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <Reveal key={i} delay={i + 1} className={`service-card ${s.featured ? 'featured' : ''}`}>
            <div className="service-num">{s.num} / 03</div>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
            <ul className="service-list">
              {s.list.map((l, j) => (
                <li key={j}>{l}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----- Process ----- */
const PROCESS = [
  { num: '01', title: 'Imersão',     desc: 'Entendo seu produto, seu cliente, seu funil. Antes de uma linha de código, uma estratégia.' },
  { num: '02', title: 'Direção',     desc: 'Crio o conceito visual + copy + storyboard cinematográfico. Você aprova antes de tudo.' },
  { num: '03', title: 'Construção',  desc: 'Desenvolvimento à mão em Next.js. Performance, motion design, microinterações premium.' },
  { num: '04', title: 'Lançamento',  desc: 'Deploy na Vercel + analytics + plano de iteração baseado em dados de conversão real.' },
];

/* Phase icons — pie-chart style progression: 25% → 50% → 75% → 100% filled.
   SVG so they never break with encoding/font issues. */
function PhaseIcon({ phase }: { phase: 0 | 1 | 2 | 3 }) {
  const cx = 14;
  const cy = 14;
  const r = 10.5;
  const pct = (phase + 1) * 0.25; // 0.25, 0.5, 0.75, 1.0
  // Pie slice: start at 12 o'clock, sweep clockwise by `pct`
  const angle = pct * Math.PI * 2;
  const endX = cx + r * Math.sin(angle);
  const endY = cy - r * Math.cos(angle);
  const largeArc = pct > 0.5 ? 1 : 0;
  const slice = `M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY} Z`;

  return (
    <svg width="34" height="34" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r} stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.45" />
      {/* Progress slice */}
      {phase < 3 ? (
        <path d={slice} fill="currentColor" />
      ) : (
        <circle cx={cx} cy={cy} r={r} fill="currentColor" />
      )}
      {/* Tick marks at quarters */}
      {[0, 1, 2, 3].map((q) => {
        const a = (q / 4) * Math.PI * 2;
        const x1 = cx + (r - 2) * Math.sin(a);
        const y1 = cy - (r - 2) * Math.cos(a);
        const x2 = cx + r * Math.sin(a);
        const y2 = cy - r * Math.cos(a);
        return (
          <line key={q} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" opacity={q <= phase ? 1 : 0.3} />
        );
      })}
    </svg>
  );
}

export function Process() {
  return (
    <section className="section" data-screen-label="05 Process" style={{ paddingTop: 60 }}>
      <Reveal>
        <div className="section-header">
          <div>
            <div className="section-tag">
              <span className="bar"></span>COMO TRABALHO · 4 ETAPAS
            </div>
            <h2 className="section-title">
              Do briefing ao <em>deploy</em>, entre 3 a 5 dias.
            </h2>
          </div>
          <p className="section-sub">
            Processo enxuto e direto. Sem reuniões intermináveis, sem ciclos de aprovação confusos.
            Cada semana, um marco visível.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="process">
          {PROCESS.map((p, i) => (
            <div key={i} className="process-step">
              <div className="process-icon"><PhaseIcon phase={i as 0 | 1 | 2 | 3} /></div>
              <div className="process-num">
                <span className="bar"></span>SEMANA {p.num}
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ----- Testimonials ----- */
const TESTIMONIALS = [
  {
    quote: 'O Pedro entregou uma página que pareceu de outro planeta. Em 14 dias, fechamos o primeiro round de captação — algo que tentávamos há 6 meses.',
    name: 'Bruno Almeida',
    role: 'CEO · ECLIPSE CRYPTO',
    initials: 'BA',
  },
  {
    quote: 'Não é design, é direção de arte. O site virou o nosso pitch deck. Investidores comentam dele em toda reunião.',
    name: 'Carolina Vega',
    role: 'CMO · AURA STUDIO',
    initials: 'CV',
  },
  {
    quote: 'Trabalhei com 4 desenvolvedores antes. Nenhum entendeu que o site é a venda. O Pedro entendeu na primeira call.',
    name: 'Diego Tanaka',
    role: 'FOUNDER · KIN ATHLETICS',
    initials: 'DT',
  },
];

export function Testimonials() {
  return (
    <section className="section" data-screen-label="06 Testimonials" style={{ paddingTop: 60 }}>
      <Reveal>
        <div className="section-header">
          <div>
            <div className="section-tag">
              <span className="bar"></span>O QUE DIZEM
            </div>
            <h2 className="section-title">
              Clientes que <em>voltam</em>.<br />E indicam.
            </h2>
          </div>
          <p className="section-sub">
            A maior parte dos meus projetos chega por indicação. Não vendo serviço — entrego resultado.
          </p>
        </div>
      </Reveal>

      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={i} delay={i + 1} className="testimonial-card">
            <div className="testimonial-stars">{'★★★★★'}</div>
            <p className="testimonial-quote">"{t.quote}"</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.initials}</div>
              <div>
                <div className="testimonial-author-name">{t.name}</div>
                <div className="testimonial-author-role">{t.role}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----- Final CTA ----- */
export function FinalCTA() {
  return (
    <section className="final-cta" data-screen-label="07 Contact">
      <Reveal>
        <div className="availability-pill">
          <span className="live-dot"></span>
          DISPONIBILIDADE LIMITADA · MAIO/26
        </div>
      </Reveal>
      <Reveal delay={1}>
        <h2>
          Vamos transformar
          <br />
          <em>visitantes</em> em <em>clientes</em>.
        </h2>
      </Reveal>
      <Reveal delay={2}>
        <p>
          Resposta em até 2 horas. Reunião de descoberta gratuita. Sem propostas genéricas — cada
          projeto começa com uma conversa real.
        </p>
      </Reveal>
      <Reveal delay={3}>
        <div className="final-cta-row">
          <a className="btn btn-primary" href={WA_LINK} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={16} color="#050505" />
            Falar comigo no WhatsApp
            <span className="arr" aria-hidden="true">
              <ArrowUR size={11} />
            </span>
          </a>
          <a className="btn btn-ghost" href="mailto:pedrorogeriosilva@outlook.com">
            pedrorogeriosilva@outlook.com
            <span className="arr" aria-hidden="true">
              <ArrowUR size={11} />
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ----- Footer ----- */
export function Footer() {
  return (
    <footer className="footer" data-screen-label="08 Footer">
      <div className="footer-left">
        <h2 className="footer-name">
          Pedro Rogerio<em>.</em>
        </h2>
        <div className="footer-meta">
          DEVELOPER · DESIGNER · MOTION
          <br />
          SÃO PAULO, BR · GMT-3
          <br />
          <a href={WA_LINK} target="_blank" rel="noreferrer">
            +55 11 96039-6045
          </a>
          <br />
          <a href="mailto:pedrorogeriosilva@outlook.com">pedrorogeriosilva@outlook.com</a>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-col">
          <h4>NAVEGAR</h4>
          <ul>
            <li>
              <a href="#projetos">Projetos</a>
            </li>
            <li>
              <a href="#servicos">Serviços</a>
            </li>
            <li>
              <a href="#processo">Processo</a>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>SOCIAL</h4>
          <ul>
            <li>
              <a href="https://www.instagram.com/pedrorogerin/" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/pedro-rog" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 · PEDRO ROGERIO · TODOS OS DIREITOS RESERVADOS</span>
        <span className="live">
          <span
            style={{
              width: 8,
              height: 8,
              background: '#c6ff00',
              borderRadius: '50%',
              boxShadow: '0 0 8px #c6ff00',
            }}
          ></span>
          SISTEMA ONLINE · UPTIME 99.9%
        </span>
      </div>
    </footer>
  );
}
