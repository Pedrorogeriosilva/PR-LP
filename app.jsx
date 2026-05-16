/* Main App */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "neon": "#c6ff00",
  "headline": "default",
  "finalPhrase": "presenca",
  "showCursor": true,
  "showWAFloat": true,
  "showLoader": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  // Apply neon color dynamically
  React.useEffect(() => {
    document.documentElement.style.setProperty('--neon', tweaks.neon);
    const c = tweaks.neon;
    // derive helpers
    const hex2rgb = (h) => {
      const n = h.replace('#','');
      const v = n.length === 3 ? n.split('').map(c => c+c).join('') : n;
      return [parseInt(v.slice(0,2),16), parseInt(v.slice(2,4),16), parseInt(v.slice(4,6),16)];
    };
    try {
      const [r,g,b] = hex2rgb(c);
      document.documentElement.style.setProperty('--neon-dim', `rgba(${r},${g},${b},0.35)`);
      document.documentElement.style.setProperty('--neon-soft', `rgba(${r},${g},${b},0.08)`);
    } catch(e){}
  }, [tweaks.neon]);

  return (
    <React.Fragment>
      {tweaks.showLoader && <Loader />}
      {tweaks.showCursor && <Cursor />}
      <Nav />
      <main>
        <Hero />
        <Emerge />
        <Ticker />
        <Projects />
        <Services />
        <Process />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      {tweaks.showWAFloat && <WhatsAppFloat />}

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Cor de destaque">
            <window.TweakColor label="Neon" value={tweaks.neon}
              options={['#c6ff00', '#39ff14', '#00ff9d', '#a3ff00', '#d4ff00', '#ff3d3d']}
              onChange={(v) => setTweak('neon', v)}/>
          </window.TweakSection>
          <window.TweakSection label="Elementos visuais">
            <window.TweakToggle label="Cursor customizado" value={tweaks.showCursor} onChange={(v) => setTweak('showCursor', v)}/>
            <window.TweakToggle label="WhatsApp flutuante" value={tweaks.showWAFloat} onChange={(v) => setTweak('showWAFloat', v)}/>
            <window.TweakToggle label="Loader cinematográfico" value={tweaks.showLoader} onChange={(v) => setTweak('showLoader', v)}/>
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
