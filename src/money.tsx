import React from 'react';
import { WA_LINK, WhatsAppIcon } from './components';
import './money.css';

type Lead = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
  online: boolean;
  starred?: boolean;
  voice?: boolean;
  photo?: boolean;
};

const LEADS: Lead[] = [
  { id: '01', name: 'Maria Silva',     preview: 'Oi! Vi seu site, ficou incrível. Me passa orçamento?',    time: '08:14', unread: 2, online: true,  starred: true },
  { id: '02', name: 'João Pereira',    preview: 'Bom dia! Tenho interesse no plano premium 🙌',            time: '08:27', unread: 1, online: false },
  { id: '03', name: 'Carla Mendes',    preview: 'Pedro, quero fechar! Quando começamos?',                  time: '08:43', unread: 3, online: true,  starred: true },
  { id: '04', name: 'Roberto Castro',  preview: 'Mensagem de voz',                                          time: '09:01', unread: 1, online: false, voice: true },
  { id: '05', name: 'Beatriz Santos',  preview: 'Recebi sua indicação. Vou querer também!',                time: '09:18', unread: 1, online: true },
  { id: '06', name: 'Lucas Tavares',   preview: 'Posso parcelar em 3x sem juros?',                          time: '09:32', unread: 2, online: false },
  { id: '07', name: 'Ana Ferreira',    preview: 'Quanto custa um site igual ao da Jana?',                   time: '09:47', unread: 1, online: false, starred: true },
  { id: '08', name: 'Camila Ribeiro',  preview: 'Vamos fechar essa semana? 💼',                             time: '10:03', unread: 4, online: true },
  { id: '09', name: 'Felipe Oliveira', preview: 'Mensagem de voz',                                          time: '10:21', unread: 1, online: false, voice: true },
  { id: '10', name: 'Juliana Borges',  preview: 'Tô precisando de um site URGENTE',                         time: '10:38', unread: 2, online: false, starred: true },
  { id: '11', name: 'Marcos Vinícius', preview: 'Vim pelo site e tenho interesse. Me ajuda?',               time: '10:54', unread: 1, online: true },
  { id: '12', name: 'Helena Costa',    preview: 'Indicação do Bruno. Vamos conversar 👋',                   time: '11:12', unread: 1, online: false },
  { id: '13', name: 'Pedro Lima',      preview: 'Quero algo parecido com o Aurora Dental',                  time: '11:28', unread: 2, online: true,  starred: true },
  { id: '14', name: 'Sofia Almeida',   preview: 'Foto',                                                     time: '11:45', unread: 1, online: false, photo: true },
  { id: '15', name: 'Rafael Souza',    preview: 'Tô dentro! Como funciona o pagamento?',                    time: '12:02', unread: 3, online: true },
  { id: '16', name: 'Larissa Gomes',   preview: 'Posso pagar adiantado pra começar logo?',                  time: '12:18', unread: 2, online: true,  starred: true },
  { id: '17', name: 'Gabriel Mota',    preview: 'Tenho uma confeitaria, vale a pena pra mim?',              time: '12:34', unread: 1, online: false },
  { id: '18', name: 'Patrícia Reis',   preview: 'Vou recomendar pra minha sócia, ela tbm precisa',          time: '12:51', unread: 1, online: true },
  { id: '19', name: 'Daniel Almeida',  preview: 'Mensagem de voz',                                          time: '13:07', unread: 2, online: false, voice: true },
  { id: '20', name: 'Renata Lopes',    preview: 'Tô considerando você ou outro. Me convence? 😏',           time: '13:23', unread: 4, online: true },
  { id: '21', name: 'Vinícius P.',     preview: 'Quero algo bem premium, tem disponibilidade?',             time: '13:38', unread: 1, online: false, starred: true },
  { id: '22', name: 'Bruna Carvalho',  preview: 'Pago à vista tem desconto?',                               time: '13:54', unread: 2, online: true },
  { id: '23', name: 'Tiago Mendes',    preview: 'Foto',                                                     time: '14:09', unread: 1, online: false, photo: true },
  { id: '24', name: 'Aline Rocha',     preview: 'Indicada pela Sofia, podemos conversar?',                  time: '14:26', unread: 1, online: true,  starred: true },
  { id: '25', name: 'Renato Silva',    preview: 'Quanto tempo demora pra ficar pronto?',                    time: '14:41', unread: 3, online: false },
  { id: '26', name: 'Marina Costa',    preview: 'Tô lançando um produto, preciso URGENTE!',                 time: '14:58', unread: 2, online: true,  starred: true },
  { id: '27', name: 'Fábio Vieira',    preview: 'Mensagem de voz',                                          time: '15:14', unread: 1, online: false, voice: true },
  { id: '28', name: 'Eduardo Santos',  preview: 'Tô dentro! Manda o contrato pra eu assinar',               time: '15:31', unread: 2, online: true,  starred: true },
];

const LEADS_TARGET = 28;

const initials = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();

/* ---------- scroll helpers ---------- */
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

/* ---------- WhatsApp logo (small, accurate) ---------- */
function WALogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#00A884" />
      <path
        d="M22.84 9.16A9.62 9.62 0 0 0 16 6.33c-5.32 0-9.65 4.33-9.65 9.65 0 1.7.44 3.36 1.29 4.83L6.27 25.6l4.92-1.3a9.62 9.62 0 0 0 4.8 1.23h.01c5.32 0 9.65-4.33 9.65-9.65a9.6 9.6 0 0 0-2.81-6.72zm-4.39 9.27c-.24-.12-1.4-.69-1.62-.77-.22-.08-.37-.12-.53.12-.16.24-.61.77-.75.92-.14.16-.27.18-.51.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.18-1.4-1.32-1.63-.13-.24-.01-.37.11-.49.11-.11.24-.27.36-.41.11-.13.16-.24.24-.4.08-.16.04-.3-.02-.41-.06-.12-.53-1.28-.73-1.75-.19-.46-.39-.4-.53-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.83.81-.83 1.97 0 1.16.85 2.28.97 2.44.12.16 1.67 2.55 4.05 3.58.57.24 1.01.39 1.36.5.57.18 1.09.16 1.5.1.46-.07 1.4-.57 1.6-1.13.2-.55.2-1.02.14-1.13-.06-.1-.21-.16-.45-.27z"
        fill="#fff"
      />
    </svg>
  );
}

/* ---------- component ---------- */
export function MoneyMachine() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const scrollY = useScrollY();
  const progress = useSectionProgress(sectionRef, scrollY);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // Linear pacing: messages arrive evenly across the whole scroll, not in a burst
  const paced = Math.min(1, Math.max(0, (progress - 0.04) / 0.90));
  const messagePace = isMobile ? Math.pow(paced, 4.25) : paced;
  const fractional = messagePace * LEADS_TARGET;
  const fullCount = Math.floor(fractional);
  const shownCount = Math.min(LEADS_TARGET, fullCount + (fractional - fullCount > 0 ? 1 : 0));

  // Most-recent-first list, up to 6 visible
  const feed = React.useMemo(() => {
    const slice = LEADS.slice(0, shownCount);
    return slice.slice().reverse().slice(0, 6); // newest first, capped at 6
  }, [shownCount]);

  // Counters
  const totalUnread = React.useMemo(
    () => LEADS.slice(0, shownCount).reduce((s, l) => s + l.unread, 0),
    [shownCount],
  );

  // Current time (set once on mount)
  const clock = React.useMemo(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }, []);
  const todayLbl = React.useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase();
  }, []);

  // Floating-pills state (faux "digitando…" / online)
  const liveTyping = Math.min(3, Math.floor(messagePace * 6));

  return (
    <section
      ref={sectionRef}
      className="phx-section"
      data-screen-label="02 WhatsApp"
      aria-label="WhatsApp recebendo clientes ao vivo"
    >
      <div className="phx-sticky">
        <div className="phx-bg-grid" />
        <div className="phx-bg-glow" />

        {/* corner meta */}
        <div className="phx-meta phx-meta--tl">[ 02 / MENSAGENS · AO_VIVO ]</div>
        <div className="phx-meta phx-meta--tr">
          <span className="phx-live-dot" />WHATSAPP · {todayLbl}
        </div>
        <div className="phx-meta phx-meta--bl">{shownCount} CONVERSAS HOJE</div>
        <div className="phx-meta phx-meta--br">PEDRO_ROGERIO.DEV</div>

        <div className="phx-grid">
          {/* LEFT: pitch + counter + CTA */}
          <div className="phx-pitch">
            <div className="phx-copy">
            <div className="phx-eyebrow">
              <span className="phx-eyebrow-bar" />
              MENSAGENS · AO VIVO
            </div>
            <h2 className="phx-title">
              Seu celular recebendo<br />
              <em>mais clientes</em> no <em>WhatsApp</em>.
            </h2>
            <p className="phx-sub">
              Cada mensagem dessas é alguém que viu sua página e decidiu te procurar.
              <strong> Sem ads queimando dinheiro. Sem prospecção fria. </strong>
              Só interesse genuíno chegando — <strong>24h por dia</strong>.
            </p>

            </div>

            <div className="phx-actions">
            <div className="phx-counter">
              <div className="phx-counter-lbl">
                <span className="phx-counter-dot" />
                MENSAGENS · HOJE · ATÉ {clock}
              </div>
              <div className="phx-counter-num">
                <span className="phx-counter-int">{shownCount}</span>
                <span className="phx-counter-suf">leads</span>
              </div>
              <div className="phx-counter-trend">
                <span className="phx-counter-arr">↗</span>
                {shownCount} novas conversas
                <span className="phx-counter-bar" />
                {totalUnread} não lidas
              </div>
            </div>

            <div className="phx-cta-row">
              <a
                className="phx-cta-primary"
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon size={16} color="#050505" />
                Quero meu WhatsApp lotado assim
                <span className="phx-cta-arr">→</span>
              </a>
              <a className="phx-cta-ghost" href="#projetos">
                Ver cases reais
                <span className="phx-cta-arr">↓</span>
              </a>
            </div>

            <div className="phx-microstats">
              <div>
                <strong>+47<span>/mês</span></strong>
                <span>LEADS POR CLIENTE</span>
              </div>
              <div>
                <strong>92<span>%</span></strong>
                <span>SÃO QUALIFICADOS</span>
              </div>
              <div>
                <strong>2<span>h</span></strong>
                <span>RESPONDIDA EM</span>
              </div>
            </div>
          </div>
          </div>

          {/* RIGHT: phone with WhatsApp */}
          <div className="phx-phone-stage">
            <FloatingPills shownCount={shownCount} liveTyping={liveTyping} />

            <div className="phx-phone-ring phx-phone-ring--1" />
            <div className="phx-phone-ring phx-phone-ring--2" />

            <div
              className="phx-phone"
              style={{
                transform: `perspective(1400px) rotateY(-9deg) rotateX(4deg) rotateZ(-1.4deg) translateY(${
                  Math.sin(progress * Math.PI * 2) * 4
                }px)`,
              }}
            >
              <div className="phx-phone-side" />
              <div className="phx-phone-screen">
                {/* iOS-style status bar */}
                <div className="phx-status">
                  <span className="phx-status-time">{clock}</span>
                  <span className="phx-status-notch" />
                  <span className="phx-status-icons">
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                      <rect x="0" y="6" width="2" height="3" rx="0.5" fill="currentColor" />
                      <rect x="3.5" y="4" width="2" height="5" rx="0.5" fill="currentColor" />
                      <rect x="7" y="2" width="2" height="7" rx="0.5" fill="currentColor" />
                      <rect x="10.5" y="0" width="2" height="9" rx="0.5" fill="currentColor" />
                    </svg>
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M7 9.5 L1 4 Q7 -1 13 4 Z" fill="currentColor" opacity="0.4" />
                      <path d="M7 9.5 L3.5 6 Q7 3 10.5 6 Z" fill="currentColor" />
                    </svg>
                    <span className="phx-battery"><span /></span>
                  </span>
                </div>

                {/* WhatsApp app header */}
                <div className="phx-wa-head">
                  <div className="phx-wa-head-left">
                    <WALogo size={22} />
                    <div className="phx-wa-head-title">
                      <span>WhatsApp</span>
                      <em>{shownCount} novas</em>
                    </div>
                  </div>
                  <div className="phx-wa-head-icons">
                    <span className="phx-wa-icon-btn" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                        <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="phx-wa-icon-btn" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="6" r="1.6" fill="currentColor" />
                        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
                        <circle cx="12" cy="18" r="1.6" fill="currentColor" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* search */}
                <div className="phx-wa-search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>Pesquisar</span>
                </div>

                {/* tabs */}
                <div className="phx-wa-tabs">
                  <button className="is-active" type="button">
                    Todas <em>{shownCount}</em>
                  </button>
                  <button type="button">
                    Não lidas <em>{totalUnread}</em>
                  </button>
                  <button type="button">Favoritas</button>
                </div>

                {/* feed */}
                <ul className="phx-wa-list">
                  {feed.length === 0 && (
                    <li className="phx-wa-empty">Role para ver as mensagens chegando…</li>
                  )}
                  {feed.map((lead, i) => (
                    <li
                      key={lead.id}
                      className={`phx-wa-row ${i === 0 ? 'is-fresh' : ''}`}
                    >
                      <div className="phx-wa-av-wrap">
                        <div className="phx-wa-av" data-color={(parseInt(lead.id, 10) % 6) + ''}>
                          {initials(lead.name)}
                        </div>
                        {lead.online && <span className="phx-wa-av-online" />}
                      </div>
                      <div className="phx-wa-row-body">
                        <div className="phx-wa-row-top">
                          <span className="phx-wa-name">{lead.name}</span>
                          <span className={`phx-wa-time ${lead.unread > 0 ? 'is-unread' : ''}`}>
                            {lead.time}
                          </span>
                        </div>
                        <div className="phx-wa-row-bot">
                          <span className="phx-wa-preview">
                            {lead.voice && (
                              <svg
                                className="phx-wa-preview-ico"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <rect x="9" y="3" width="6" height="13" rx="3" fill="currentColor" />
                                <path
                                  d="M5 11v1a7 7 0 0 0 14 0v-1M12 19v3"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            )}
                            {lead.photo && (
                              <svg
                                className="phx-wa-preview-ico"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <rect
                                  x="3"
                                  y="5"
                                  width="18"
                                  height="14"
                                  rx="2"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                                <circle cx="9" cy="11" r="2" fill="currentColor" />
                                <path
                                  d="M3 17l5-5 4 4 3-3 6 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                              </svg>
                            )}
                            {lead.preview}
                          </span>
                          <span className="phx-wa-row-meta">
                            {lead.starred && (
                              <svg
                                className="phx-wa-star"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M12 2l2.9 6.95L22 10l-5.5 4.78L18 22l-6-3.7L6 22l1.5-7.22L2 10l7.1-1.05L12 2z" />
                              </svg>
                            )}
                            {lead.unread > 0 && (
                              <span className="phx-wa-badge">{lead.unread}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* WhatsApp bottom bar */}
                <div className="phx-wa-foot">
                  <span className="phx-wa-foot-tab is-active">
                    <WALogo size={14} />
                    Conversas
                  </span>
                  <span className="phx-wa-foot-tab">Atualizações</span>
                  <span className="phx-wa-foot-tab">Comunidades</span>
                  <span className="phx-wa-foot-tab">Ligações</span>
                </div>

                <div className="phx-home-indicator" />
              </div>
            </div>

            <div className="phx-phone-shadow" />
          </div>
        </div>

        <div className="phx-hint">
          <span className="phx-hint-bar" />
          ROLE PARA VER AS MENSAGENS CHEGANDO
        </div>
      </div>
    </section>
  );
}

/* ---------- Floating pills (typing indicators around phone) ---------- */
function FloatingPills({ shownCount, liveTyping }: { shownCount: number; liveTyping: number }) {
  const pills = React.useMemo(
    () => [
      { side: 'tl' as const, name: 'Maria', state: 'digitando…', delay: '0s' },
      { side: 'tr' as const, name: 'Carla', state: 'online', delay: '1.2s' },
      { side: 'bl' as const, name: 'Roberto', state: 'áudio · 0:42', delay: '0.6s' },
      { side: 'br' as const, name: '+ 12', state: 'não lidas', delay: '1.8s' },
    ],
    [],
  );
  return (
    <div className="phx-pills" aria-hidden="true">
      {pills.map((p, i) => (
        <div
          key={i}
          className={`phx-pill phx-pill--${p.side} ${i < liveTyping ? 'is-active' : ''}`}
          style={{ animationDelay: p.delay, opacity: shownCount > i ? 1 : 0.25 }}
        >
          <span className="phx-pill-dot" />
          <span>
            <strong>{p.name}</strong> {p.state}
          </span>
        </div>
      ))}
    </div>
  );
}
