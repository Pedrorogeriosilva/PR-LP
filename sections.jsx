/* Content sections */

/* ----- Projects ----- */
const PROJECTS = [
  {
    name: 'NOVA·BANK',
    nameAccent: '·',
    niche: 'FINTECH · CARTÃO PREMIUM',
    objective: 'Captação de leads para programa beta de cartão black. Foco em escassez e exclusividade.',
    tech: ['Next.js', 'GSAP', 'Three.js', 'Vercel'],
    stat: { n: '+412%', label: 'CONVERSÃO VS ANTES' },
    stat2: { n: '1.8s', label: 'LCP' },
    span: 'span-7',
    accent: '#c6ff00',
  },
  {
    name: 'AURA·studio',
    niche: 'SAAS · CRIATIVIDADE',
    objective: 'Conversão de visitantes em trial. Hero animada com produto em 3D.',
    tech: ['React', 'Spline', 'Framer'],
    stat: { n: '+218%', label: 'TRIALS / SEMANA' },
    stat2: { n: '0.6s', label: 'INP' },
    span: 'span-5',
  },
  {
    name: 'ECLIPSE·crypto',
    niche: 'WEB3 · STAKING',
    objective: 'Página de captação de capital para protocolo DeFi com narrativa cinematográfica.',
    tech: ['Next.js', 'Lenis', 'Three.js', 'GSAP'],
    stat: { n: '$1.4M', label: 'CAPTADOS EM 14D' },
    stat2: { n: '+580%', label: 'CLIQUES NO CTA' },
    span: 'span-6',
    tall: true,
  },
  {
    name: 'KIN·athletics',
    niche: 'D2C · PERFORMANCE',
    objective: 'Lançamento de tênis edição limitada. Pré-venda com timer e visualização 360°.',
    tech: ['Astro', 'GSAP', 'Vercel'],
    stat: { n: '2.300', label: 'PARES VENDIDOS' },
    stat2: { n: '7min', label: 'SOLD OUT' },
    span: 'span-6',
    tall: true,
  },
];

function ProjectMock({ kind, name, niche, accent = '#c6ff00' }) {
  /* Stylized abstract mockups built with CSS — no external images */
  if (kind === 0) {
    /* Fintech card visual */
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 40%, rgba(198,255,0,0.15), transparent 60%)' }}>
        <div style={{
          position: 'absolute', left: '8%', top: '14%',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.15em', color: '#8a8a8a',
        }}>NOVA · BANK / BLACK</div>
        <div style={{
          position: 'absolute', left: '8%', top: '24%',
          fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05,
        }}>O cartão que pensa<br/>antes de você gastar.</div>
        <div style={{
          position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%) rotate(-8deg) perspective(800px) rotateY(-18deg) rotateX(8deg)',
          width: 220, height: 140, borderRadius: 16,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #050505 100%)',
          border: '1px solid rgba(198,255,0,0.3)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(198,255,0,0.15)',
          padding: 16,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 9, color: '#c6ff00', letterSpacing: '0.15em' }}>
            <span>NOVA</span><span>BLACK</span>
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.15em', color: '#f4f4f4' }}>4242 ····  ···· 9817</div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 10, color: '#5a5a5a', marginTop: 4, textTransform: 'uppercase' }}>PEDRO ROGERIO</div>
          </div>
        </div>
        <div style={{
          position: 'absolute', left: '8%', bottom: '14%',
          display: 'flex', gap: 10, alignItems: 'center', fontFamily: 'JetBrains Mono', fontSize: 10, color: '#c6ff00', letterSpacing: '0.15em',
        }}>
          <span style={{ width: 8, height: 8, background: '#c6ff00', borderRadius: '50%', boxShadow: '0 0 8px #c6ff00' }}></span>
          ENTRAR NA LISTA · 12.482 PESSOAS
        </div>
      </div>
    );
  }
  if (kind === 1) {
    /* SaaS — stacked panels */
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 60%, rgba(198,255,0,0.1), transparent 50%)', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%) perspective(900px) rotateY(-14deg) rotateX(10deg) rotateZ(-3deg)',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 280, height: 56,
              background: i === 1 ? 'linear-gradient(90deg, #c6ff00, #a8e000)' : 'rgba(20,20,20,0.9)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12,
              transform: `translateX(${i === 1 ? 20 : 0}px)`,
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: i === 1 ? '#050505' : '#c6ff00' }}></div>
              <div style={{ height: 6, flex: 1, background: i === 1 ? '#050505' : '#1a1a1a', borderRadius: 4 }}></div>
              <div style={{ width: 40, height: 16, background: i === 1 ? '#050505' : '#0a0a0a', borderRadius: 4 }}></div>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 24, top: 24, fontFamily: 'JetBrains Mono', fontSize: 10, color: '#8a8a8a', letterSpacing: '0.15em' }}>AURA / DESIGN OS</div>
      </div>
    );
  }
  if (kind === 2) {
    /* Crypto — chart */
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 80%, rgba(198,255,0,0.12), transparent 60%)' }}>
        <div style={{ position: 'absolute', left: 24, top: 24, fontFamily: 'JetBrains Mono', fontSize: 10, color: '#8a8a8a', letterSpacing: '0.15em' }}>ECLIPSE · TVL</div>
        <div style={{ position: 'absolute', left: 24, top: 50, fontFamily: 'Space Grotesk', fontSize: 36, fontWeight: 500, letterSpacing: '-0.02em' }}>$1,402,815</div>
        <div style={{ position: 'absolute', left: 24, top: 96, fontFamily: 'JetBrains Mono', fontSize: 11, color: '#c6ff00', letterSpacing: '0.1em' }}>↑ +28.4% / 7D</div>
        <svg viewBox="0 0 400 160" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height: '60%' }}>
          <defs>
            <linearGradient id="gradEclipse" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c6ff00" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#c6ff00" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M 0 140 C 50 130, 80 100, 120 110 S 180 80, 230 70 S 300 30, 360 20 L 400 10 L 400 160 L 0 160 Z" fill="url(#gradEclipse)"/>
          <path d="M 0 140 C 50 130, 80 100, 120 110 S 180 80, 230 70 S 300 30, 360 20 L 400 10" stroke="#c6ff00" strokeWidth="1.5" fill="none"/>
          <circle cx="360" cy="20" r="5" fill="#c6ff00"/>
          <circle cx="360" cy="20" r="10" fill="none" stroke="#c6ff00" strokeOpacity="0.4"/>
        </svg>
        <div style={{ position: 'absolute', right: 24, bottom: 24, fontFamily: 'JetBrains Mono', fontSize: 9, color: '#5a5a5a', letterSpacing: '0.15em' }}>APR · 18.2%</div>
      </div>
    );
  }
  /* D2C — sneaker / product silhouette */
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(198,255,0,0.12), transparent 60%)' }}>
      <div style={{ position: 'absolute', left: 24, top: 24, fontFamily: 'JetBrains Mono', fontSize: 10, color: '#8a8a8a', letterSpacing: '0.15em' }}>KIN · KX-01</div>
      <div style={{ position: 'absolute', left: 24, top: 50, fontFamily: 'Space Grotesk', fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>
        Edição<br/><span style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', color: '#c6ff00' }}>limitada.</span>
      </div>
      <svg viewBox="0 0 200 120" style={{ position: 'absolute', right: '4%', bottom: '12%', width: '55%' }}>
        <ellipse cx="100" cy="100" rx="80" ry="6" fill="#000" opacity="0.6" filter="blur(4px)"/>
        <path d="M 20 80 Q 30 60 60 58 L 110 58 Q 130 50 150 56 Q 175 60 180 78 L 180 86 Q 100 92 20 86 Z"
          fill="#1a1a1a" stroke="#c6ff00" strokeOpacity="0.5"/>
        <path d="M 60 58 Q 70 50 90 50 L 110 58" fill="none" stroke="#c6ff00" strokeOpacity="0.7" strokeWidth="1"/>
        <circle cx="155" cy="75" r="3" fill="#c6ff00"/>
      </svg>
      <div style={{ position: 'absolute', right: 24, top: 24, fontFamily: 'JetBrains Mono', fontSize: 10, color: '#c6ff00', letterSpacing: '0.15em', textAlign: 'right' }}>
        SOLD OUT<br/><span style={{ color: '#5a5a5a' }}>7 MIN · 2.300 PARES</span>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section className="section" id="projetos" data-screen-label="03 Projects">
      <Reveal>
        <div className="section-header">
          <div>
            <div className="section-tag"><span className="bar"></span>CASES SELECIONADOS · 2025/26</div>
            <h2 className="section-title">Cada projeto, um <em>case</em> de startup milionária.</h2>
          </div>
          <p className="section-sub">Landing pages que não apenas <em style={{color:'#c6ff00', fontStyle:'normal'}}>parecem</em> premium — performam. Conversão é o único KPI que importa.</p>
        </div>
      </Reveal>

      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <Reveal key={i} delay={(i % 2) + 1} className={`project-card ${p.span} ${p.tall ? 'tall' : ''}`}>
            <div className="project-visual">
              <div className="project-mock">
                <ProjectMock kind={i} name={p.name} niche={p.niche}/>
              </div>
            </div>
            <div className="project-meta">
              <div className="project-meta-top">
                <div>
                  <div className="project-niche">{p.niche}</div>
                  <h3 className="project-name" style={{marginTop: 8}}>{p.name}</h3>
                </div>
                <a href={WA_LINK} className="project-cta" target="_blank" rel="noreferrer">
                  Ver case <span className="arr">→</span>
                </a>
              </div>
              <p className="project-objective">{p.objective}</p>
              <div className="project-bottom">
                <div className="project-stats">
                  <div>
                    <div className="project-stat-num">{p.stat.n}</div>
                    <span className="project-stat-label">{p.stat.label}</span>
                  </div>
                  <div>
                    <div className="project-stat-num">{p.stat2.n}</div>
                    <span className="project-stat-label">{p.stat2.label}</span>
                  </div>
                </div>
                <div className="project-tech">
                  {p.tech.map((t, j) => <span key={j}>{t}</span>)}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----- Services ----- */
const SERVICES = [
  {
    num: '01',
    title: 'Landing Page de alta conversão',
    desc: 'Um único objetivo: transformar visitantes em clientes. Copy, design e desenvolvimento alinhados ao funil.',
    list: ['Estratégia + Copywriting', 'Design cinematográfico', 'Animações motion premium', 'CRO + A/B testing'],
  },
  {
    num: '02',
    title: 'Site institucional cinematográfico',
    desc: 'Para marcas que querem parecer 5 anos à frente da concorrência. Experiência completa, multi-página, 100% feita à mão.',
    list: ['UX/UI exclusivo', 'Identidade digital', 'Scroll storytelling', 'CMS opcional'],
    featured: true,
  },
  {
    num: '03',
    title: 'Lançamento de produto',
    desc: 'Página de pré-venda + countdown + captação. A ponte entre o seu hype e a sua receita.',
    list: ['Página de captura', 'Página de vendas', 'Integração com checkout', 'Pixel + analytics'],
  },
];

function Services() {
  return (
    <section className="section" id="servicos" data-screen-label="04 Services" style={{ paddingTop: 60 }}>
      <Reveal>
        <div className="section-header">
          <div>
            <div className="section-tag"><span className="bar"></span>SERVIÇOS · 2026</div>
            <h2 className="section-title">Não <em>faço</em> sites.<br/>Construo <em>presença digital.</em></h2>
          </div>
          <p className="section-sub">Três produtos. Cada um pensado para um momento específico do crescimento da sua marca. Sem pacote genérico, sem template.</p>
        </div>
      </Reveal>

      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <Reveal key={i} delay={i + 1} className={`service-card ${s.featured ? 'featured' : ''}`}>
            <div className="service-num">{s.num} / 03</div>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
            <ul className="service-list">
              {s.list.map((l, j) => <li key={j}>{l}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----- Process ----- */
const PROCESS = [
  { num: '01', title: 'Imersão', desc: 'Entendo seu produto, seu cliente, seu funil. Antes de uma linha de código, uma estratégia.', icon: '◐' },
  { num: '02', title: 'Direção', desc: 'Crio o conceito visual + copy + storyboard cinematográfico. Você aprova antes de tudo.', icon: '◑' },
  { num: '03', title: 'Construção', desc: 'Desenvolvimento à mão em Next.js. Performance, motion design, microinterações premium.', icon: '◒' },
  { num: '04', title: 'Lançamento', desc: 'Deploy na Vercel + analytics + plano de iteração baseado em dados de conversão real.', icon: '◓' },
];

function Process() {
  return (
    <section className="section" id="processo" data-screen-label="05 Process" style={{ paddingTop: 60 }}>
      <Reveal>
        <div className="section-header">
          <div>
            <div className="section-tag"><span className="bar"></span>COMO TRABALHO · 4 ETAPAS</div>
            <h2 className="section-title">Do briefing ao <em>deploy</em>, em 21 dias.</h2>
          </div>
          <p className="section-sub">Processo enxuto e direto. Sem reuniões intermináveis, sem ciclos de aprovação confusos. Cada semana, um marco visível.</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="process">
          {PROCESS.map((p, i) => (
            <div key={i} className="process-step">
              <div className="process-icon">{p.icon}</div>
              <div className="process-num"><span className="bar"></span>SEMANA {p.num}</div>
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

function Testimonials() {
  return (
    <section className="section" data-screen-label="06 Testimonials" style={{ paddingTop: 60 }}>
      <Reveal>
        <div className="section-header">
          <div>
            <div className="section-tag"><span className="bar"></span>O QUE DIZEM</div>
            <h2 className="section-title">Clientes que <em>voltam</em>.<br/>E indicam.</h2>
          </div>
          <p className="section-sub">A maior parte dos meus projetos chega por indicação. Não vendo serviço — entrego resultado.</p>
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
function FinalCTA() {
  return (
    <section className="final-cta" id="contato" data-screen-label="07 Contact">
      <Reveal>
        <div className="availability-pill">
          <span className="live-dot"></span>
          ACEITANDO · 02 PROJETOS · MAI/26
        </div>
      </Reveal>
      <Reveal delay={1}>
        <h2>
          Vamos transformar<br/>
          <em>visitantes</em> em <em>clientes</em>.
        </h2>
      </Reveal>
      <Reveal delay={2}>
        <p>Resposta em até 2 horas. Reunião de descoberta gratuita. Sem propostas genéricas — cada projeto começa com uma conversa real.</p>
      </Reveal>
      <Reveal delay={3}>
        <div className="final-cta-row">
          <a className="btn btn-primary" href={WA_LINK} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={16} color="#050505"/>
            Falar comigo no WhatsApp
            <span className="arr">→</span>
          </a>
          <a className="btn btn-ghost" href="mailto:pedro@pedrorogerio.dev">
            pedro@pedrorogerio.dev
            <span className="arr">→</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ----- Footer ----- */
function Footer() {
  return (
    <footer className="footer" data-screen-label="08 Footer">
      <div className="footer-left">
        <h2 className="footer-name">Pedro Rogerio<em>.</em></h2>
        <div className="footer-meta">
          DEVELOPER · DESIGNER · MOTION<br/>
          SÃO PAULO, BR · GMT-3<br/>
          <a href={WA_LINK} target="_blank" rel="noreferrer">+55 11 97983-3787</a><br/>
          <a href="mailto:pedro@pedrorogerio.dev">pedro@pedrorogerio.dev</a>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-col">
          <h4>NAVEGAR</h4>
          <ul>
            <li><a href="#projetos">Projetos</a></li>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#processo">Processo</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>SOCIAL</h4>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Behance</a></li>
            <li><a href="#">Dribbble</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 · PEDRO ROGERIO · TODOS OS DIREITOS RESERVADOS</span>
        <span className="live"><span style={{width:8,height:8,background:'#c6ff00',borderRadius:'50%',boxShadow:'0 0 8px #c6ff00'}}></span>SISTEMA ONLINE · UPTIME 99.9%</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Projects, Services, Process, Testimonials, FinalCTA, Footer });
