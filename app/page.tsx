"use client"
import { useState, useEffect } from "react"
import { ShaderBackground } from "@/components/ui/shader-background"

export default function WellnessDashboard() {
  // ── DATA — updated every 3 hours by Hela ──
  const date = "Thu Sep 10, 2026"
  const mood = { label: "TRANSITIONAL", emoji: "⚡", sub: "Rock edge meets dance floor, heart caught between" }
  const insight = "Twenty One Pilots doubled down this afternoon — RAWFEAR and Center Mass again, plus Feel Alive with ILLENIUM and Bastille punching through the EDM-rock boundary. Olivia Rodrigo's stupid song and Nsqk's live set pulled the current back toward something more fragile. You're not resolving the tension — you're feeding both sides of it at once."

  const tracks = [
    { n: 1, name: "RAWFEAR", artist: "Twenty One Pilots", url: "https://open.spotify.com/track/43ee3gqWBlPKe2MeGJ2S6I", vibe: "ANCHOR", nc: "#fbbf24", nBg: "rgba(245,158,11,0.15)", nBd: "rgba(245,158,11,0.4)", vc: "#fbbf24", vBg: "rgba(245,158,11,0.18)", vBd: "rgba(245,158,11,0.45)" },
    { n: 2, name: "Center Mass", artist: "Twenty One Pilots", url: "https://open.spotify.com/track/2BHSRlGgJwzTPfYvAax28m", vibe: "CORE", nc: "#818cf8", nBg: "rgba(129,140,248,0.15)", nBd: "rgba(129,140,248,0.35)", vc: "#818cf8", vBg: "rgba(129,140,248,0.18)", vBd: "rgba(129,140,248,0.4)" },
    { n: 3, name: "Feel Alive", artist: "ILLENIUM, Bastille, Dabin", url: "https://open.spotify.com/track/1xkkHeokEkhrUmqjh2dkv5", vibe: "RISE", nc: "#14F195", nBg: "rgba(20,241,149,0.15)", nBd: "rgba(20,241,149,0.4)", vc: "#14F195", vBg: "rgba(20,241,149,0.18)", vBd: "rgba(20,241,149,0.45)" },
    { n: 4, name: "stupid song", artist: "Olivia Rodrigo", url: "https://open.spotify.com/track/49j6SvuvWfbEKZKzsHCdLJ", vibe: "ACHE", nc: "#fb7185", nBg: "rgba(250,46,140,0.15)", nBd: "rgba(250,46,140,0.35)", vc: "#fb7185", vBg: "rgba(250,46,140,0.18)", vBd: "rgba(250,46,140,0.4)" },
    { n: 5, name: "NUNCA ESTOY - EN VIVO", artist: "Nsqk", url: "https://open.spotify.com/track/4D2bhzH9qxjZLzeKAR69TY", vibe: "STILL", nc: "#cbd5e1", nBg: "rgba(100,116,139,0.25)", nBd: "rgba(100,116,139,0.4)", vc: "#cbd5e1", vBg: "rgba(30,41,59,0.6)", vBd: "rgba(100,116,139,0.5)" },
    { n: 6, name: "LIGHTS GO OUT - Major Lazer Remix", artist: "John Summit", url: "https://open.spotify.com/track/7MbJthHlLAxVt8fbI28ZGC", vibe: "PEAK", nc: "#00E5FF", nBg: "rgba(0,229,255,0.15)", nBd: "rgba(0,229,255,0.4)", vc: "#00E5FF", vBg: "rgba(0,229,255,0.18)", vBd: "rgba(0,229,255,0.45)" },
  ]

  const meters = [
    { label: "Energy",       value: 65, color: "#14F195", glow: "rgba(20,241,149,0.8)" },
    { label: "Valence",      value: 50, color: "#c084fc", glow: "rgba(192,132,252,0.8)" },
    { label: "Danceability", value: 70, color: "#00E5FF", glow: "rgba(0,229,255,0.8)" },
  ]

  const wellnessItems = [
    { icon: "🏃", title: "Sprint Intervals", desc: "RAWFEAR and Feel Alive have your adrenaline system primed. Four rounds of 30-second sprints with 90-second walking rest. Burn through the rock tension physically before the afternoon sits in.", time: "15 min" },
    { icon: "🌬️", title: "Box Breathing Reset", desc: "You're running high on both rock weight and emotional EDM. 4 counts in, 4 hold, 4 out, 4 hold — four rounds. You'll feel the nervous system shift by round three.", time: "5 min" },
    { icon: "📓", title: "Two-Door Journal", desc: "Your afternoon split between Twenty One Pilots' weight and the danceable Latin session. Write: one door you're pushing through right now, and one door you're circling but not walking into yet.", time: "5 min" },
  ]

  const journalPrompt = "RAWFEAR came back a second time today. What does Twenty One Pilots name for you that keeps pulling you back — and is the fear in that song yours right now, or someone else's?"
  const quote = { text: "The emotion in a song comes from the tension between what you expect and what you get.", author: "Daniel J. Levitin" }
  const playlistUrl = "https://open.spotify.com/playlist/294GQpveapLix5cOdGWOru"
  // ─────────────────────────────────────────────────────────────────────────

  const [tab, setTab] = useState<"today"|"music"|"wellness"|"profile">("today")
  const [done, setDone] = useState<boolean[]>([false, false, false])
  const [greeting, setGreeting] = useState("Good morning")
  const [updatedAt, setUpdatedAt] = useState("")
  const [isPlayingVinyl, setIsPlayingVinyl] = useState<boolean>(true)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isStandalone, setIsStandalone] = useState(false)
  const [showInstallModal, setShowInstallModal] = useState(false)

  useEffect(() => {
    const h = new Date().getHours()
    setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : h < 21 ? "Good evening" : "Good night")
    const now = new Date()
    setUpdatedAt(now.toLocaleTimeString("es-MX", { hour:"2-digit", minute:"2-digit", hour12:true, timeZone:"America/Mexico_City" }))

    if (typeof window !== "undefined") {
      if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
        setIsStandalone(true)
      }

      const handleBeforeInstall = (e: Event) => {
        e.preventDefault()
        setDeferredPrompt(e)
      }
      window.addEventListener('beforeinstallprompt', handleBeforeInstall)

      window.addEventListener('appinstalled', () => {
        setIsStandalone(true)
        setDeferredPrompt(null)
      })

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {})
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      }
    }
  }, [])

  const triggerInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === 'accepted') {
          setDeferredPrompt(null)
          setIsStandalone(true)
        }
      } catch {
        setShowInstallModal(true)
      }
    } else {
      setShowInstallModal(true)
    }
  }

  const toggleDone = (i: number) => {
    setDone(prev => { const n = [...prev]; n[i] = !n[i]; return n })
  }

  const S = {
    page: { background:"transparent", color:"#f1f5f9", minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"stretch", position:"relative" as const } as React.CSSProperties,
    // Translucent liquid shell — darker tone for depth, but moving background still shows through smoothly
    shell: { width:"100%", maxWidth:440, height:"100vh", display:"flex", flexDirection:"column" as const, position:"relative" as const, zIndex:10, borderLeft:"1px solid rgba(0,229,255,0.22)", borderRight:"1px solid rgba(250,46,140,0.22)", background:"rgba(4,7,14,0.32)", overflowY:"hidden" as const, boxShadow:"0 0 120px rgba(0,0,0,0.85), 0 0 40px rgba(0,229,255,0.12)", flexShrink:0 },
    glow: { position:"absolute" as const, top:0, left:0, right:0, height:360, background:"radial-gradient(circle at 50% 0%, rgba(0,229,255,0.16) 0%, rgba(250,46,140,0.1) 45%, rgba(168,85,247,0.08) 70%, transparent 90%)", pointerEvents:"none" as const, zIndex:0 },
    // Dark Liquid Glass cards: darker smoky translucency for high data contrast, specular reflections, NO blur!
    card: { padding:16, borderRadius:20, background:"linear-gradient(135deg, rgba(16,28,48,0.78) 0%, rgba(8,15,28,0.80) 50%, rgba(3,7,16,0.86) 100%)", border:"1px solid rgba(0,229,255,0.28)", boxShadow:"0 10px 36px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.6), 0 0 20px rgba(0,229,255,0.08)", marginBottom:14, position:"relative" as const, zIndex:12 } as React.CSSProperties,
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&family=Share+Tech+Mono&family=Orbitron:wght@600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; background: #03060C; font-family: 'Inter', system-ui, sans-serif; overflow-x: hidden; }
        .fd { font-family: 'Space Grotesk', sans-serif; }
        .mono { font-family: 'Share Tech Mono', monospace; }
        .orb { font-family: 'Orbitron', monospace; }

        /* CRT SCANLINES & TV SCREEN ANIMATIONS */
        .crt-scanlines {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.38) 50%),
                      linear-gradient(90deg, rgba(250, 46, 140, 0.02), rgba(20, 241, 149, 0.02), rgba(0, 229, 255, 0.02));
          background-size: 100% 3px, 4px 100%;
          opacity: 0.9;
        }

        /* WIDE CATHODE RAY WASH BEAM */
        .crt-beam {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 220px;
          pointer-events: none;
          z-index: 2;
          background: linear-gradient(to bottom, transparent, rgba(20, 241, 149, 0.04) 25%, rgba(0, 229, 255, 0.18) 60%, rgba(255, 255, 255, 0.14) 75%, rgba(250, 46, 140, 0.14) 90%, transparent);
          animation: crt-roll 6s linear infinite;
        }

        /* RETRO STATIC MOVING SCANLINE — Subtle analog CRT tracking line */
        .retro-static-line {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          pointer-events: none;
          z-index: 16;
          background: linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.25) 15%, rgba(255, 255, 255, 0.75) 48%, rgba(20, 241, 149, 0.5) 75%, rgba(0, 229, 255, 0.3) 90%, transparent 100%);
          box-shadow: 0 0 8px rgba(0, 229, 255, 0.4), 0 0 16px rgba(20, 241, 149, 0.25);
          opacity: 0.55;
          animation: crt-roll 7s linear infinite;
        }

        /* RETRO STATIC TRACKING NOISE BAND — Soft, delicate analog shimmer */
        .retro-static-band {
          position: fixed;
          top: -8px;
          left: 0;
          right: 0;
          height: 18px;
          pointer-events: none;
          z-index: 16;
          background: repeating-linear-gradient(90deg,
            rgba(255, 255, 255, 0.05) 0px,
            rgba(0, 229, 255, 0.09) 2px,
            transparent 4px,
            rgba(20, 241, 149, 0.07) 6px,
            transparent 9px
          );
          opacity: 0.28;
          animation: crt-roll 7s linear infinite;
        }

        /* SECONDARY SUBTLE STATIC GLITCH LINE */
        .retro-static-line-secondary {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 1.5px;
          pointer-events: none;
          z-index: 16;
          background: linear-gradient(90deg, transparent 0%, rgba(250, 46, 140, 0.25) 20%, rgba(255, 255, 255, 0.55) 50%, rgba(0, 229, 255, 0.35) 80%, transparent 100%);
          box-shadow: 0 0 6px rgba(250, 46, 140, 0.35);
          opacity: 0.35;
          animation: crt-roll-secondary 11s linear infinite;
        }

        .crt-vignette {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          background: radial-gradient(circle at 50% 50%, transparent 62%, rgba(3, 6, 12, 0.5) 85%, rgba(0, 0, 0, 0.88) 100%);
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.8);
        }

        @keyframes crt-roll {
          0% { transform: translateY(-220px); }
          100% { transform: translateY(105vh); }
        }

        @keyframes crt-roll-secondary {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(105vh); }
        }

        @keyframes crt-flicker {
          0% { opacity: 0.985; }
          48% { opacity: 1; }
          50% { opacity: 0.97; }
          52% { opacity: 1; }
          85% { opacity: 0.99; }
          87% { opacity: 0.975; }
          100% { opacity: 1; }
        }
        .crt-screen-alive {
          animation: crt-flicker 0.2s infinite;
        }

        /* VINYL RECORD LOGO ANIMATION */
        .vinyl-spin {
          animation: vinyl-spin 12s linear infinite;
          transform-origin: center center;
        }
        .vinyl-paused {
          animation-play-state: paused !important;
        }
        @keyframes vinyl-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* NEON GLOWS & RETRO POP STYLING */
        .neon-text-title {
          text-shadow: 0 0 8px rgba(0,229,255,0.85), 0 0 20px rgba(0,229,255,0.45), -1.5px 0 rgba(250,46,140,0.8), 1.5px 0 rgba(0,229,255,0.8);
        }
        .neon-text-green {
          text-shadow: 0 0 8px rgba(20,241,149,0.85), 0 0 18px rgba(20,241,149,0.4);
        }
        .neon-text-cyan {
          text-shadow: 0 0 8px rgba(0,229,255,0.85), 0 0 18px rgba(0,229,255,0.4);
        }
        .neon-text-pink {
          text-shadow: 0 0 8px rgba(250,46,140,0.85), 0 0 18px rgba(250,46,140,0.4);
        }

        /* HUD BRACKETS */
        .hud-corner {
          position: absolute;
          width: 8px;
          height: 8px;
          pointer-events: none;
        }
        .hud-tl { top: -1px; left: -1px; border-top: 2px solid #00E5FF; border-left: 2px solid #00E5FF; border-top-left-radius: 4px; }
        .hud-tr { top: -1px; right: -1px; border-top: 2px solid #FA2E8C; border-right: 2px solid #FA2E8C; border-top-right-radius: 4px; }
        .hud-bl { bottom: -1px; left: -1px; border-bottom: 2px solid #FA2E8C; border-left: 2px solid #FA2E8C; border-bottom-left-radius: 4px; }
        .hud-br { bottom: -1px; right: -1px; border-bottom: 2px solid #00E5FF; border-right: 2px solid #00E5FF; border-bottom-right-radius: 4px; }

        @keyframes ping  { 75%,100% { transform:scale(2); opacity:0; } }
        @keyframes pulse { 0%,100%  { opacity:1; } 50% { opacity:.45; } }
        @keyframes spin  { to { transform:rotate(360deg); } }
        .ping  { animation: ping  1.2s cubic-bezier(0,0,.2,1) infinite; }
        .pulse { animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite; }
        .spin  { animation: spin  8s linear infinite; }

        .tab-btn { background:none; border:none; cursor:pointer; display:flex; flex-direction:column; align-items:center; padding:8px 16px; border-radius:16px; gap:3px; transition:all .2s; }
        .tab-btn.active { background:rgba(0,229,255,0.18); border:1px solid rgba(0,229,255,0.45); box-shadow:0 0 14px rgba(0,229,255,0.25); }
        .tab-btn:not(.active) { border:1px solid transparent; }
        .done-card { transition: all .25s; cursor:pointer; }
        .done-card.done { background: rgba(20,241,149,0.22) !important; border-color: rgba(20,241,149,0.6) !important; box-shadow: 0 0 20px rgba(20,241,149,0.25) !important; }

        @media (min-width:768px) {
          html, body { height: 100%; overflow: hidden; }
        }
        @media (min-width:1024px) {
          .app-shell {
            max-width: 1200px !important;
            width: 100% !important;
            border: 1px solid rgba(0,229,255,0.28) !important;
            border-radius: 28px !important;
            background: rgba(4,7,14,0.28) !important;
            box-shadow: 0 20px 80px rgba(0,0,0,0.7), 0 0 40px rgba(0,229,255,0.14), inset 0 1px 0 rgba(255,255,255,0.15) !important;
            margin: 20px 0 !important;
            height: calc(100vh - 40px) !important;
          }
          .app-nav {
            padding: 8px 28px 20px !important;
            padding-bottom: max(20px, env(safe-area-inset-bottom)) !important;
          }
          .app-nav > div {
            justify-content: center !important;
            gap: 12px;
            max-width: 440px;
            margin: 0 auto;
          }
          .app-content { padding: 0 28px 28px !important; }
          .content-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
            gap: 18px;
            align-items: start;
          }
          .grid-span-all { grid-column: 1 / -1; }
        }
        .shader-bg { position:fixed; inset:0; z-index:0; pointer-events:none; }
        ::-webkit-scrollbar { width:0; }
      `}</style>

      <div style={S.page}>
        {/* WebGL Plasma Background (Synthwave neon palette) */}
        <ShaderBackground className="shader-bg" />

        {/* CRT Scanlines and Cathode Ray sweep */}
        <div className="crt-scanlines" />
        <div className="crt-beam" />
        {/* Retro Static Moving Lines */}
        <div className="retro-static-band" />
        <div className="retro-static-line" />
        <div className="retro-static-line-secondary" />
        <div className="crt-vignette" />

        <div className="app-shell crt-screen-alive" style={S.shell}>
          <div style={S.glow}/>

          {/* ── RETRO TV OSD TOP STATUS BAR ── */}
          <div style={{position:"sticky",top:0,zIndex:20,padding:"6px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(4,8,16,0.95)",borderBottom:"1px solid rgba(0,229,255,0.18)",fontSize:9,letterSpacing:"0.12em",flexShrink:0}} className="mono">
            <div style={{display:"flex",alignItems:"center",gap:8,color:"#14F195"}}>
              <span style={{color:"#FA2E8C",fontWeight:700}}>● REC</span>
              <span style={{color:"#475569"}}>|</span>
              <span>CH 04 · AV-1</span>
              <span style={{color:"#475569"}}>|</span>
              <span style={{color:"#00E5FF"}}>NTSC 60Hz</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,color:"#94a3b8"}}>
              <button
                onClick={triggerInstall}
                style={{
                  background: isStandalone ? "rgba(20,241,149,0.15)" : "rgba(0,229,255,0.15)",
                  border: isStandalone ? "1px solid rgba(20,241,149,0.4)" : "1px solid rgba(0,229,255,0.4)",
                  borderRadius: 4,
                  padding: "1px 6px",
                  color: isStandalone ? "#14F195" : "#00E5FF",
                  cursor: "pointer",
                  fontSize: 8.5,
                  letterSpacing: "0.08em",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  fontFamily: "inherit"
                }}
                title={isStandalone ? "Corriendo en ventana Standalone" : "Instalar como App en Chrome (sin barra de navegador)"}
              >
                <span>{isStandalone ? "✓" : "⚡"}</span>
                <span>{isStandalone ? "STANDALONE" : "INSTALAR"}</span>
              </button>
              <span>STEREO HI-FI</span>
              <span style={{color:"#14F195",fontWeight:700}} className="pulse">PLAY ▶</span>
            </div>
          </div>

          {/* ── HEADER WITH VINYL LOGO BESIDE MOODISH ── */}
          <header style={{position:"sticky",top:0,zIndex:20,padding:"14px 20px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(5,9,18,0.97)",borderBottom:"1px solid rgba(0,229,255,0.22)",boxShadow:"0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              {/* Halftone Vinyl Record Player Logo with Neon Glow Ring & Turntable Stylus */}
              <div
                onClick={() => setIsPlayingVinyl(!isPlayingVinyl)}
                title="Click to toggle vinyl spin"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, #06101E 40%, #000 100%)",
                  border: "2px solid #00E5FF",
                  boxShadow: "0 0 16px rgba(0,229,255,0.7), 0 0 25px rgba(250,46,140,0.35), inset 0 0 8px rgba(0,229,255,0.4)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <img
                  src="/moodish-logo.png"
                  alt="Moodish Vinyl Turntable Logo"
                  className={`vinyl-spin ${!isPlayingVinyl ? "vinyl-paused" : ""}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Center Spindle neon pin */}
                <div style={{
                  position: "absolute",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#FA2E8C",
                  boxShadow: "0 0 6px #FA2E8C",
                  pointerEvents: "none",
                }} />
              </div>

              {/* Moodish Retro Pop Neon Wordmark in Cyan & Green */}
              <div style={{display:"flex",flexDirection:"column"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span className="fd neon-text-title" style={{fontWeight:900,fontSize:20,color:"#fff",letterSpacing:"0.04em",textTransform:"uppercase"}}>Moodish</span>
                  <span className="mono" style={{fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:4,background:"rgba(250,46,140,0.18)",color:"#ff70a6",border:"1px solid rgba(250,46,140,0.45)",letterSpacing:"0.1em",boxShadow:"0 0 12px rgba(250,46,140,0.25)"}}>
                    SYNTH·89
                  </span>
                </div>
                <span className="mono" style={{fontSize:9,color:"#00E5FF",letterSpacing:"0.12em",marginTop:1}}>
                  ANALOG EMOTIONAL OS
                </span>
              </div>
            </div>

            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:999,background:"rgba(20,241,149,0.12)",border:"1px solid rgba(20,241,149,0.45)",boxShadow:"0 0 12px rgba(20,241,149,0.25)"}}>
                <span className="ping" style={{width:6,height:6,borderRadius:"50%",background:"#14F195",display:"inline-block"}}/>
                <span style={{width:6,height:6,borderRadius:"50%",background:"#14F195",display:"inline-block",marginLeft:-12}}/>
                <span className="mono neon-text-green" style={{fontSize:10,color:"#14F195",fontWeight:700,letterSpacing:"0.06em"}}>CRT·LIVE</span>
              </div>
              <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#00E5FF,#FA2E8C,#14F195)",padding:1.5,position:"relative",boxShadow:"0 0 14px rgba(250,46,140,0.4)"}}>
                <div style={{width:"100%",height:"100%",borderRadius:"50%",background:"#050A14",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#00E5FF"}} className="fd">IV</div>
                <span style={{position:"absolute",bottom:0,right:0,width:8,height:8,background:"#14F195",border:"2px solid #050A14",borderRadius:"50%",boxShadow:"0 0 8px #14F195"}}/>
              </div>
            </div>
          </header>

          {/* ── GREETING & STATUS BANNER (with latest hourly data) ── */}
          <section style={{position:"relative",zIndex:12,padding:"18px 20px 10px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <h1 className="fd" style={{fontSize:22,fontWeight:900,color:"#fff",display:"flex",alignItems:"center",gap:8,letterSpacing:"-0.01em"}}>
                  {greeting}, Ivan
                  <span style={{width:8,height:8,borderRadius:"50%",background:"#00E5FF",boxShadow:"0 0 10px #00E5FF",display:"inline-block"}}/>
                </h1>
                <p className="mono" style={{fontSize:11,color:"#7dd3fc",marginTop:3,letterSpacing:"0.04em"}}>{date}</p>
                {updatedAt && <p className="mono" style={{fontSize:10,color:"#64748b",marginTop:2}}>Updated {updatedAt}</p>}
              </div>
            </div>

            {/* Liquid Glass State Card (No blur, crystal clear) */}
            <div style={{
              marginTop: 12,
              padding: "12px 16px",
              borderRadius: 16,
              border: "1px solid rgba(0,229,255,0.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(90deg, rgba(14,24,42,0.80), rgba(6,28,24,0.76))",
              boxShadow: "0 6px 24px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)",
              position: "relative",
              overflow: "hidden",
              zIndex: 12
            }}>
              <div className="hud-corner hud-tl" />
              <div className="hud-corner hud-tr" />
              <div className="hud-corner hud-bl" />
              <div className="hud-corner hud-br" />

              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:34,height:34,borderRadius:10,background:"rgba(0,229,255,0.15)",border:"1px solid rgba(0,229,255,0.45)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 12px rgba(0,229,255,0.3)"}}>
                  <svg style={{width:16,height:16,stroke:"#00E5FF",fill:"none"}} viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/></svg>
                </div>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span className="mono neon-text-cyan" style={{fontSize:12,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.08em",color:"#00E5FF"}}>{mood.label}</span>
                    <span className="pulse" style={{width:6,height:6,borderRadius:"50%",background:"#14F195",boxShadow:"0 0 6px #14F195",display:"inline-block"}}/>
                  </div>
                  <p style={{fontSize:11,color:"#cbd5e1",marginTop:1}}>{mood.sub}</p>
                </div>
              </div>
              <span className="mono" style={{fontSize:9,padding:"3px 8px",borderRadius:6,background:"rgba(20,241,149,0.15)",border:"1px solid rgba(20,241,149,0.4)",color:"#14F195",letterSpacing:"0.1em",boxShadow:"0 0 10px rgba(20,241,149,0.2)"}}>AUDIO·STATE</span>
            </div>
          </section>

          {/* ── SCROLLABLE CONTENT (LIQUID GLASS CARDS — NO BLUR) ── */}
          <div className="app-content" style={{flex:1,overflowY:"auto",overflowX:"hidden",padding:"0 20px 10px",position:"relative",zIndex:12,WebkitOverflowScrolling:"touch"} as React.CSSProperties}>

            {/* TODAY TAB */}
            {tab === "today" && (
              <div className="content-grid">
                {/* Dial Emocional - Liquid Glass Synth Gauge */}
                <div style={{...S.card}}>
                  <div className="hud-corner hud-tl" />
                  <div className="hud-corner hud-tr" />
                  <div className="hud-corner hud-bl" />
                  <div className="hud-corner hud-br" />

                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <svg className="spin" style={{width:14,height:14,stroke:"#00E5FF",fill:"none"}} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeDasharray="28 10" strokeWidth="2"/></svg>
                      <span className="mono" style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"#7dd3fc"}}>Dial Emocional // VU Meter</span>
                    </div>
                    <span className="mono" style={{fontSize:9,padding:"2px 8px",borderRadius:999,background:"rgba(0,229,255,0.15)",color:"#00E5FF",border:"1px solid rgba(0,229,255,0.4)",boxShadow:"0 0 10px rgba(0,229,255,0.25)"}}>CALIBRATED</span>
                  </div>

                  {/* Retro Synth Radial Dial with Neon Gradient */}
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",position:"relative",margin:"12px 0 6px"}}>
                    <svg style={{width:180,height:180}} viewBox="0 0 180 180">
                      <defs>
                        <linearGradient id="neonSynthGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FA2E8C" />
                          <stop offset="50%" stopColor="#00E5FF" />
                          <stop offset="100%" stopColor="#14F195" />
                        </linearGradient>
                        <filter id="neonGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3.5" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Outer calibration tick marks */}
                      {Array.from({ length: 32 }).map((_, i) => {
                        const angle = (i * 360) / 32
                        const rad = (angle * Math.PI) / 180
                        const r1 = 82
                        const r2 = i % 4 === 0 ? 74 : 77
                        const x1 = 90 + r1 * Math.cos(rad)
                        const y1 = 90 + r1 * Math.sin(rad)
                        const x2 = 90 + r2 * Math.cos(rad)
                        const y2 = 90 + r2 * Math.sin(rad)
                        const isHot = i < 18
                        return (
                          <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={isHot ? (i % 4 === 0 ? "#FA2E8C" : "#00E5FF") : "rgba(255,255,255,0.18)"}
                            strokeWidth={i % 4 === 0 ? "2" : "1"}
                          />
                        )
                      })}

                      {/* Background Track */}
                      <circle cx="90" cy="90" fill="transparent" r="66" strokeWidth="8" stroke="rgba(255,255,255,0.08)"/>

                      {/* Glowing Neon Active Progress Arc */}
                      <circle
                        cx="90"
                        cy="90"
                        fill="transparent"
                        r="66"
                        strokeWidth="8"
                        stroke="url(#neonSynthGrad)"
                        strokeLinecap="round"
                        strokeDasharray="415"
                        strokeDashoffset="115"
                        filter="url(#neonGlowEffect)"
                        style={{transform:"rotate(-90deg)",transformOrigin:"50% 50%"}}
                      />
                    </svg>

                    {/* Center Dial Readout — strictly enclosed within the inner circle */}
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 110,
                      height: 110,
                      borderRadius: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "0 6px",
                      overflow: "hidden",
                      pointerEvents: "none",
                      boxSizing: "border-box"
                    }}>
                      <span className="orb neon-text-title" style={{
                        fontSize: 30,
                        fontWeight: 900,
                        color: "#fff",
                        letterSpacing: "-0.02em",
                        lineHeight: 1
                      }}>
                        {meters[0].value + meters[2].value}
                      </span>
                      <span className="mono" style={{
                        fontSize: 8.5,
                        textTransform: "uppercase",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        color: "#00E5FF",
                        marginTop: 3,
                        lineHeight: 1
                      }}>
                        MOOD SCORE
                      </span>
                      <span style={{
                        fontSize: 9,
                        color: "#94a3b8",
                        marginTop: 3,
                        lineHeight: 1.2,
                        maxWidth: 90,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        wordBreak: "break-word"
                      }}>
                        {mood.sub}
                      </span>
                    </div>
                  </div>

                  {/* Retro Tuning Gauge */}
                  <div style={{marginTop:8,paddingTop:10,borderTop:"1px solid rgba(255,255,255,0.08)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:5}}>
                      <span className="mono" style={{color:"#94a3b8"}}>TUNING // INTENSIDAD</span>
                      <span className="mono neon-text-green" style={{fontWeight:700,color:"#14F195"}}>{meters[0].value}%</span>
                    </div>
                    <div style={{height:7,background:"rgba(15,23,42,0.8)",borderRadius:999,overflow:"hidden",padding:1,border:"1px solid rgba(0,229,255,0.3)"}}>
                      <div style={{height:"100%",width:`${meters[0].value}%`,background:"linear-gradient(90deg,#FA2E8C,#00E5FF,#14F195)",boxShadow:"0 0 10px #00E5FF",borderRadius:999}}/>
                    </div>
                    <div className="mono" style={{display:"flex",justifyContent:"space-between",fontSize:9,textTransform:"uppercase",color:"#64748b",marginTop:5,letterSpacing:"0.08em"}}>
                      <span>[CALMA]</span><span style={{color:"#00E5FF"}}>[FLUJO]</span><span style={{color:"#FA2E8C"}}>[EUFORIA]</span>
                    </div>
                  </div>

                  {/* Triple telemetry cells in Dark Liquid Glass */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:14}}>
                    {[
                      {l:"Valence",v:`${meters[1].value}%`,c:"#14F195",glow:"rgba(20,241,149,0.3)"},
                      {l:"Energía",v:`${meters[0].value}%`,c:"#00E5FF",glow:"rgba(0,229,255,0.3)"},
                      {l:"Dance",v:`${meters[2].value}%`,c:"#FA2E8C",glow:"rgba(250,46,140,0.3)"}
                    ].map((b,i)=>(
                      <div key={i} style={{padding:"9px 6px",borderRadius:12,background:"rgba(4,9,18,0.76)",border:`1px solid ${b.c}44`,boxShadow:`0 0 12px ${b.glow}, inset 0 1px 1px rgba(255,255,255,0.2)`,textAlign:"center"}}>
                        <span className="mono" style={{display:"block",fontSize:9,textTransform:"uppercase",color:"#94a3b8",letterSpacing:"0.08em"}}>{b.l}</span>
                        <span className="orb" style={{display:"block",fontSize:16,fontWeight:800,color:b.c,marginTop:2}}>{b.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emotional Flow - Liquid Glass */}
                <div style={{...S.card,border:"1px solid rgba(0,229,255,0.28)"}}>
                  <div className="hud-corner hud-tl" />
                  <div className="hud-corner hud-tr" />
                  <div className="hud-corner hud-bl" />
                  <div className="hud-corner hud-br" />

                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                    <span className="mono neon-text-cyan" style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.08em",padding:"3px 8px",borderRadius:999,background:"rgba(0,229,255,0.15)",color:"#00E5FF",border:"1px solid rgba(0,229,255,0.4)"}}>EMOTIONAL FLOW</span>
                    <span className="mono" style={{fontSize:10,color:"#14F195"}}>T-60 MIN</span>
                  </div>
                  <p style={{fontSize:13,color:"#e2e8f0",lineHeight:1.7}}>{insight}</p>
                </div>

                {/* Sonic Signature - Liquid Glass VU Equalizer */}
                <div style={{...S.card,border:"1px solid rgba(20,241,149,0.28)"}}>
                  <div className="hud-corner hud-tl" />
                  <div className="hud-corner hud-tr" />
                  <div className="hud-corner hud-bl" />
                  <div className="hud-corner hud-br" />

                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{width:6,height:6,borderRadius:"50%",background:"#00E5FF",boxShadow:"0 0 8px #00E5FF",display:"inline-block"}}/>
                      <span className="mono neon-text-green" style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.08em",color:"#14F195"}}>SONIC SIGNATURE // EQUALIZER</span>
                    </div>
                    <span className="mono" style={{fontSize:9,color:"#94a3b8"}}>dB PEAK</span>
                  </div>

                  {meters.map((m,i)=>{
                    const totalSegments = 16
                    const activeCount = Math.round((m.value / 100) * totalSegments)
                    return (
                      <div key={i} style={{marginBottom:i<meters.length-1?16:0}}>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:6,fontWeight:600}}>
                          <span className="mono" style={{color:"#e2e8f0",display:"flex",alignItems:"center",gap:6}}>
                            <span style={{width:6,height:6,borderRadius:"50%",background:m.color,boxShadow:`0 0 6px ${m.color}`,display:"inline-block"}}/>
                            {m.label}
                          </span>
                          <span className="mono" style={{fontWeight:800,color:m.color}}>{m.value}%</span>
                        </div>

                        {/* Segmented LED Blocks */}
                        <div style={{display:"flex",gap:3,alignItems:"center",background:"rgba(4,9,18,0.6)",padding:"4px 6px",borderRadius:8,border:"1px solid rgba(255,255,255,0.08)"}}>
                          {Array.from({length:totalSegments}).map((_,segIdx)=>{
                            const isActive = segIdx < activeCount
                            const segColor = segIdx < 9 ? "#14F195" : segIdx < 12 ? "#FBBF24" : "#FA2E8C"
                            return (
                              <div
                                key={segIdx}
                                style={{
                                  flex: 1,
                                  height: 10,
                                  borderRadius: 2,
                                  background: isActive ? segColor : "rgba(255,255,255,0.06)",
                                  boxShadow: isActive ? `0 0 6px ${segColor}` : "none",
                                  transition: "all 0.2s"
                                }}
                              />
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* MUSIC TAB */}
            {tab === "music" && (
              <div className="content-grid">
                {/* Vinyl Player Card featuring the uploaded logo graphic */}
                <div style={{...S.card,border:"1px solid rgba(0,229,255,0.35)",background:"linear-gradient(180deg,rgba(10,22,38,0.80),rgba(4,10,20,0.86))",position:"relative",overflow:"hidden",marginBottom:14}}>
                  <div className="hud-corner hud-tl" />
                  <div className="hud-corner hud-tr" />
                  <div className="hud-corner hud-bl" />
                  <div className="hud-corner hud-br" />

                  <div style={{position:"absolute",right:-20,top:-20,width:140,height:140,background:"rgba(0,229,255,0.12)",borderRadius:"50%",filter:"blur(36px)"}}/>
                  
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                    <span className="mono neon-text-cyan" style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.08em",padding:"3px 8px",borderRadius:999,background:"rgba(0,229,255,0.15)",color:"#00E5FF",border:"1px solid rgba(0,229,255,0.4)"}}>
                      STEREO VINYL DECK
                    </span>
                    <span className="mono" style={{fontSize:10,color:"#14F195",fontWeight:700}}>33 RPM · HI-FI</span>
                  </div>

                  {/* Vinyl Player Component with uploaded Halftone Vinyl Artwork */}
                  <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
                    <div
                      onClick={() => setIsPlayingVinyl(!isPlayingVinyl)}
                      style={{
                        width: 84,
                        height: 84,
                        borderRadius: "50%",
                        background: "#000",
                        border: "2px solid #00E5FF",
                        boxShadow: "0 0 20px rgba(0,229,255,0.6), 0 0 25px rgba(250,46,140,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        position: "relative",
                        cursor: "pointer",
                        overflow: "hidden"
                      }}
                    >
                      <img
                        src="/moodish-logo.png"
                        alt="Moodish Vinyl Deck"
                        className={`vinyl-spin ${!isPlayingVinyl ? "vinyl-paused" : ""}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <div style={{position:"absolute",width:8,height:8,borderRadius:"50%",background:"#FA2E8C",boxShadow:"0 0 8px #FA2E8C"}}/>
                    </div>

                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span className="mono" style={{fontSize:9,color:"#14F195",fontWeight:700}}>NOW SPINNING</span>
                        <span className="pulse" style={{width:5,height:5,borderRadius:"50%",background:"#14F195",display:"inline-block"}}/>
                      </div>
                      <h3 className="fd" style={{fontSize:16,fontWeight:800,color:"#fff",lineHeight:1.2,marginTop:2}}>Daily Mood Playlist</h3>
                      <p className="mono" style={{fontSize:11,color:"#00E5FF",fontWeight:600,marginTop:2}}>Curated hourly by Hela</p>
                      <p style={{fontSize:11,color:"#94a3b8",marginTop:3,lineHeight:1.4}}>Flows from introspective indie into EDM momentum.</p>
                    </div>
                  </div>

                  {/* Audio Equalizer wave bars */}
                  <div style={{display:"flex",alignItems:"flex-end",gap:3,height:22,marginBottom:14,padding:"0 4px"}}>
                    {[12,18,8,22,14,20,16,10,22,18,12,16,20,14,22,12,18,10,20,14].map((h,idx)=>(
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: isPlayingVinyl ? `${h}px` : "4px",
                          background: idx % 3 === 0 ? "#FA2E8C" : idx % 2 === 0 ? "#00E5FF" : "#14F195",
                          borderRadius: 2,
                          boxShadow: isPlayingVinyl ? `0 0 6px ${idx % 3 === 0 ? "#FA2E8C" : "#00E5FF"}` : "none",
                          transition: "height 0.2s"
                        }}
                      />
                    ))}
                  </div>

                  <a href={playlistUrl} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:"12px",borderRadius:14,background:"linear-gradient(90deg,#1DB954,#14F195)",color:"#000",fontWeight:800,fontSize:12,textTransform:"uppercase",letterSpacing:"0.08em",textDecoration:"none",boxShadow:"0 4px 20px rgba(29,185,84,0.4)"}} className="mono">
                    <svg style={{width:16,height:16,fill:"currentColor"}} viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.308c-.216.354-.678.468-1.032.253-2.827-1.728-6.386-2.119-10.579-1.162-.404.093-.807-.156-.899-.56-.093-.404.156-.807.56-.899 4.595-1.049 8.528-.611 11.697 1.336.354.215.468.678.253 1.032zm1.464-3.261c-.272.443-.853.585-1.296.313-3.235-1.988-8.169-2.564-11.996-1.401-.497.151-1.026-.134-1.177-.63-.151-.497.134-1.026.63-1.177 4.375-1.328 9.805-.688 13.526 1.601.443.272.585.853.313 1.294zm.126-3.414c-3.879-2.303-10.283-2.516-13.993-1.389-.594.181-1.229-.158-1.41-.752-.181-.594.158-1.229.752-1.41 4.267-1.296 11.329-1.044 15.795 1.608.535.318.708 1.011.39 1.546-.318.535-1.011.708-1.546.39z"/></svg>
                    Play in Spotify
                  </a>
                </div>

                {/* Key tracks styled with retro audio cassette / track list vibes with direct Spotify links */}
                <div style={{...S.card,padding:"10px 16px"}}>
                  <div className="hud-corner hud-tl" />
                  <div className="hud-corner hud-tr" />
                  <div className="hud-corner hud-bl" />
                  <div className="hud-corner hud-br" />

                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",margin:"6px 0 8px"}}>
                    <span className="mono neon-text-cyan" style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.08em",color:"#00E5FF"}}>LAST 24H · TRACK LOG</span>
                    <span className="mono" style={{fontSize:9,color:"#64748b"}}>SIDE A / SIDE B</span>
                  </div>

                  {tracks.map((t,i)=>(
                    <div key={t.n} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 0",borderBottom:i<tracks.length-1?"1px solid rgba(255,255,255,0.06)":"none"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <span className="mono" style={{fontSize:11,fontWeight:800,width:28,height:28,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid",backgroundColor:t.nBg,borderColor:t.nBd,color:t.nc,flexShrink:0,boxShadow:`0 0 8px ${t.nc}33`}}>
                          {String(t.n).padStart(2,"0")}
                        </span>
                        <div>
                          <a href={t.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                            <p style={{fontSize:13,fontWeight:700,color:"#fff",transition:"color .15s"}} onMouseEnter={e=>(e.currentTarget.style.color="#00E5FF")} onMouseLeave={e=>(e.currentTarget.style.color="#fff")}>{t.name}</p>
                            <p className="mono" style={{fontSize:10,color:"#94a3b8",marginTop:1}}>{t.artist}</p>
                          </a>
                        </div>
                      </div>
                      <span className="mono" style={{fontSize:9,fontWeight:800,padding:"3px 8px",borderRadius:999,border:"1px solid",backgroundColor:t.vBg,borderColor:t.vBd,color:t.vc,flexShrink:0,marginLeft:8,boxShadow:`0 0 6px ${t.vc}33`}}>
                        {t.vibe}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WELLNESS TAB (LIQUID GLASS) */}
            {tab === "wellness" && (
              <div className="content-grid">
                <p className="grid-span-all mono neon-text-green" style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.08em",color:"#14F195",marginBottom:12}}>
                  TAP TO MARK AS DONE // PROTOCOLS
                </p>

                {wellnessItems.map((c,i)=>(
                  <div key={i} onClick={()=>toggleDone(i)} className={`done-card${done[i]?" done":""}`} style={{...S.card,cursor:"pointer",border:done[i]?"1px solid rgba(20,241,149,0.6)":"1px solid rgba(0,229,255,0.25)",background:done[i]?"rgba(20,241,149,0.24)":"linear-gradient(135deg, rgba(16,28,48,0.78) 0%, rgba(8,15,28,0.80) 50%, rgba(3,7,16,0.86) 100%)",position:"relative",overflow:"hidden"}}>
                    <div className="hud-corner hud-tl" />
                    <div className="hud-corner hud-tr" />
                    <div className="hud-corner hud-bl" />
                    <div className="hud-corner hud-br" />

                    {done[i] && <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#14F195,#00E5FF,#FA2E8C)"}}/>}
                    
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
                      <div style={{display:"flex",alignItems:"flex-start",gap:12,flex:1}}>
                        <div style={{width:42,height:42,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,background:done[i]?"rgba(20,241,149,0.2)":i===0?"rgba(20,241,149,0.16)":i===1?"rgba(0,229,255,0.16)":"rgba(250,46,140,0.16)",border:`1px solid ${done[i]?"rgba(20,241,149,0.5)":i===0?"rgba(20,241,149,0.4)":i===1?"rgba(0,229,255,0.4)":"rgba(250,46,140,0.4)"}`,boxShadow:done[i]?"0 0 14px rgba(20,241,149,0.4)":"none"}}>
                          {done[i] ? "✅" : c.icon}
                        </div>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                            <h3 className="fd" style={{fontSize:14,fontWeight:800,color:done[i]?"#14F195":"#fff"}}>{c.title}</h3>
                            <span className="mono" style={{fontSize:9,color:"#7dd3fc",padding:"1px 6px",borderRadius:4,background:"rgba(0,229,255,0.1)",border:"1px solid rgba(0,229,255,0.25)"}}>{c.time}</span>
                          </div>
                          <p style={{fontSize:12,color:done[i]?"#a7f3d0":"#94a3b8",lineHeight:1.5}}>{c.desc}</p>
                        </div>
                      </div>
                      <div style={{width:24,height:24,borderRadius:"50%",border:`2px solid ${done[i]?"#14F195":"rgba(0,229,255,0.4)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:done[i]?"rgba(20,241,149,0.2)":"transparent",marginTop:2,boxShadow:done[i]?"0 0 10px #14F195":"none"}}>
                        {done[i] && <svg style={{width:14,height:14,stroke:"#14F195",fill:"none"}} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/></svg>}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Journal prompt in Dark Liquid Glass */}
                <div style={{...S.card,border:"1px solid rgba(250,46,140,0.25)",marginTop:4}}>
                  <div className="hud-corner hud-tl" />
                  <div className="hud-corner hud-tr" />
                  <div className="hud-corner hud-bl" />
                  <div className="hud-corner hud-br" />

                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                    <span className="mono neon-text-pink" style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.08em",color:"#FA2E8C"}}>📓 JOURNAL PROMPT</span>
                    <span className="mono" style={{fontSize:9,padding:"2px 6px",borderRadius:4,background:"rgba(250,46,140,0.15)",color:"#ff70a6",border:"1px solid rgba(250,46,140,0.3)"}}>HOY</span>
                  </div>
                  <p style={{fontSize:13,color:"#e2e8f0",lineHeight:1.7,fontStyle:"italic"}}>"{journalPrompt}"</p>
                </div>

                {/* Quote in Dark Liquid Glass */}
                <div style={{padding:"14px 16px",borderRadius:14,borderLeft:"3px solid #00E5FF",background:"linear-gradient(135deg, rgba(14,24,42,0.82) 0%, rgba(6,12,24,0.86) 100%)",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 6px 24px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.2)",marginTop:12,position:"relative",zIndex:12}}>
                  <p style={{fontSize:12,color:"#cbd5e1",fontStyle:"italic",lineHeight:1.6}}>"{quote.text}"</p>
                  <span className="mono" style={{display:"block",fontSize:10,color:"#00E5FF",marginTop:4}}>— {quote.author}</span>
                </div>
              </div>
            )}

            {/* PROFILE TAB (DARK LIQUID GLASS) */}
            {tab === "profile" && (
              <div className="content-grid">
                {/* Current mood snapshot */}
                <div style={{...S.card,border:"1px solid rgba(0,229,255,0.3)",marginBottom:14}}>
                  <div className="hud-corner hud-tl" />
                  <div className="hud-corner hud-tr" />
                  <div className="hud-corner hud-bl" />
                  <div className="hud-corner hud-br" />

                  <p className="mono neon-text-cyan" style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.08em",color:"#00E5FF",marginBottom:12}}>CURRENT MOOD SNAPSHOT</p>
                  <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
                    <div style={{width:58,height:58,borderRadius:16,background:"rgba(5,10,20,0.78)",border:"2px solid #00E5FF",boxShadow:"0 0 16px rgba(0,229,255,0.35), inset 0 1px 1px rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30}}>{mood.emoji}</div>
                    <div>
                      <p className="fd neon-text-green" style={{fontSize:20,fontWeight:900,color:"#14F195",letterSpacing:"-0.01em"}}>{mood.label}</p>
                      <p style={{fontSize:12,color:"#cbd5e1",marginTop:2}}>{mood.sub}</p>
                      <p className="mono" style={{fontSize:10,color:"#64748b",marginTop:3}}>{date}</p>
                    </div>
                  </div>
                  <p style={{fontSize:13,color:"#cbd5e1",lineHeight:1.65}}>{insight}</p>
                </div>

                {/* Stats grid */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                  {[
                    {label:"Energy",    value:`${meters[0].value}%`, color:"#14F195", icon:"⚡", glow:"rgba(20,241,149,0.35)"},
                    {label:"Valence",   value:`${meters[1].value}%`, color:"#c084fc", icon:"💜", glow:"rgba(192,132,252,0.35)"},
                    {label:"Danceability", value:`${meters[2].value}%`, color:"#00E5FF", icon:"🎧", glow:"rgba(0,229,255,0.35)"},
                    {label:"Mood Score",value:`${meters[0].value+meters[2].value}`, color:"#FA2E8C", icon:"🌊", glow:"rgba(250,46,140,0.35)"},
                  ].map((s,i)=>(
                    <div key={i} style={{...S.card,marginBottom:0,textAlign:"center",padding:14,border:`1px solid ${s.color}44`,boxShadow:`0 0 16px ${s.glow}, inset 0 1px 1px rgba(255,255,255,0.2)`}}>
                      <span style={{fontSize:22}}>{s.icon}</span>
                      <p className="orb" style={{fontSize:24,fontWeight:900,color:s.color,marginTop:6,textShadow:`0 0 10px ${s.color}`}}>{s.value}</p>
                      <p className="mono" style={{fontSize:10,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.08em",marginTop:2}}>{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Top vibe tags */}
                <div style={{...S.card}}>
                  <div className="hud-corner hud-tl" />
                  <div className="hud-corner hud-tr" />
                  <div className="hud-corner hud-bl" />
                  <div className="hud-corner hud-br" />

                  <p className="mono neon-text-pink" style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.08em",color:"#FA2E8C",marginBottom:10}}>TODAY'S VIBE MIX</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {tracks.map(t=>(
                      <span key={t.n} className="mono" style={{fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:999,border:"1px solid",backgroundColor:t.vBg,borderColor:t.vBd,color:t.vc,boxShadow:`0 0 8px ${t.vc}33`}}>{t.vibe}</span>
                    ))}
                  </div>
                </div>

                {/* Standalone PWA / Chrome Shortcut card */}
                <div style={{...S.card,marginTop:12,border:"1px solid rgba(0,229,255,0.35)",background:"linear-gradient(135deg, rgba(14,24,42,0.84) 0%, rgba(6,12,24,0.88) 100%)"}}>
                  <div className="hud-corner hud-tl" />
                  <div className="hud-corner hud-tr" />
                  <div className="hud-corner hud-bl" />
                  <div className="hud-corner hud-br" />

                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:14}}>⚡</span>
                      <span className="mono neon-text-cyan" style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.08em",color:"#00E5FF"}}>MODO APP STANDALONE</span>
                    </div>
                    <span className="mono" style={{fontSize:9,padding:"2px 6px",borderRadius:4,background:isStandalone?"rgba(20,241,149,0.15)":"rgba(0,229,255,0.15)",color:isStandalone?"#14F195":"#00E5FF",border:isStandalone?"1px solid rgba(20,241,149,0.3)":"1px solid rgba(0,229,255,0.3)"}}>
                      {isStandalone ? "INSTALADA" : "CHROME / PWA"}
                    </span>
                  </div>

                  <p style={{fontSize:12,color:"#cbd5e1",lineHeight:1.6}}>
                    Instala Moodish en Chrome para abrirla como una aplicación independiente en pantalla completa sin barra de direcciones ni pestañas.
                  </p>

                  <button
                    onClick={triggerInstall}
                    style={{
                      width:"100%",
                      marginTop:12,
                      padding:"10px 14px",
                      borderRadius:12,
                      background:"linear-gradient(90deg, rgba(0,229,255,0.22), rgba(20,241,149,0.22))",
                      border:"1px solid rgba(0,229,255,0.45)",
                      color:"#fff",
                      cursor:"pointer",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      gap:8,
                      fontSize:12,
                      fontWeight:700,
                      boxShadow:"0 0 16px rgba(0,229,255,0.2)"
                    }}
                  >
                    <span style={{color:"#14F195"}}>⚡</span>
                    <span className="mono">{isStandalone ? "ABRIR COMO APP INDEPENDIENTE" : "INSTALAR EN CHROME / CREAR ACCESO"}</span>
                  </button>
                </div>

                <p className="grid-span-all mono" style={{textAlign:"center",fontSize:10,color:"#475569",marginTop:16}}>Updated hourly by Hela · Spotify Studio · Neuro-OS 1989</p>
              </div>
            )}
          </div>

          {/* ── BOTTOM TAB BAR (DARK LIQUID GLASS — NO BLUR) ── */}
          <nav className="app-nav" style={{position:"sticky",bottom:0,zIndex:20,padding:"8px 16px 16px",background:"linear-gradient(to top, rgba(3,5,10,0.98) 75%, transparent)",flexShrink:0}}>
            <div style={{background:"rgba(6,12,22,0.82)",border:"1px solid rgba(0,229,255,0.3)",borderRadius:24,padding:6,display:"flex",alignItems:"center",justifyContent:"space-around",boxShadow:"0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(0,229,255,0.15), inset 0 1px 1px rgba(255,255,255,0.25)"}}>
              {([
                { id:"today",    label:"Today",    path:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                { id:"music",   label:"Music",    path:"M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" },
                { id:"wellness",label:"Wellness", path:"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
                { id:"profile", label:"Profile",  path:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
              ] as const).map(t=>(
                <button key={t.id} onClick={()=>setTab(t.id)} className={`tab-btn${tab===t.id?" active":""}`}>
                  <svg style={{width:20,height:20,stroke:tab===t.id?"#00E5FF":"#64748b",filter:tab===t.id?"drop-shadow(0 0 6px #00E5FF)":"none",fill:"none",transition:"stroke .2s"}} viewBox="0 0 24 24">
                    <path d={t.path} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                  <span className="mono" style={{fontSize:9,fontWeight:800,letterSpacing:"0.08em",textTransform:"uppercase",color:tab===t.id?"#00E5FF":"#64748b",transition:"color .2s"}}>{t.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* INSTALL HELP MODAL */}
          {showInstallModal && (
            <div
              onClick={()=>setShowInstallModal(false)}
              style={{
                position:"fixed",
                inset:0,
                zIndex:100,
                background:"rgba(2,4,8,0.85)",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                padding:20
              }}
            >
              <div
                onClick={e=>e.stopPropagation()}
                style={{
                  maxWidth:380,
                  width:"100%",
                  background:"linear-gradient(135deg, rgba(14,24,42,0.96), rgba(6,12,24,0.98))",
                  border:"1px solid rgba(0,229,255,0.45)",
                  borderRadius:20,
                  padding:22,
                  boxShadow:"0 0 40px rgba(0,229,255,0.25)",
                  position:"relative"
                }}
              >
                <div className="hud-corner hud-tl" />
                <div className="hud-corner hud-tr" />
                <div className="hud-corner hud-bl" />
                <div className="hud-corner hud-br" />

                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                  <span className="mono neon-text-cyan" style={{fontSize:11,fontWeight:800,color:"#00E5FF",letterSpacing:"0.08em"}}>CÓMO INSTALAR EN CHROME</span>
                  <button onClick={()=>setShowInstallModal(false)} style={{background:"none",border:"none",color:"#94a3b8",fontSize:18,cursor:"pointer"}}>✕</button>
                </div>

                <div style={{fontSize:12,color:"#cbd5e1",lineHeight:1.7}}>
                  <p style={{marginBottom:10}}>Para disfrutar Moodish a pantalla completa sin barra de navegación:</p>
                  <div style={{background:"rgba(0,0,0,0.4)",padding:12,borderRadius:10,border:"1px solid rgba(255,255,255,0.08)",marginBottom:12}}>
                    <p className="mono" style={{color:"#14F195",fontSize:11,fontWeight:700,marginBottom:4}}>OPCIÓN 1 (Barra de direcciones):</p>
                    <p>Haz clic en el ícono de <strong>Instalar</strong> <span style={{color:"#00E5FF"}}>(computadora con flecha 📥)</span> a la derecha en la barra de URL de Chrome.</p>
                  </div>
                  <div style={{background:"rgba(0,0,0,0.4)",padding:12,borderRadius:10,border:"1px solid rgba(255,255,255,0.08)"}}>
                    <p className="mono" style={{color:"#FA2E8C",fontSize:11,fontWeight:700,marginBottom:4}}>OPCIÓN 2 (Menú ⋮ de Chrome):</p>
                    <p>1. Clic en los <strong>3 puntos (⋮)</strong> arriba a la derecha de Chrome.</p>
                    <p>2. Ve a <strong>"Guardar y compartir"</strong> → <strong>"Instalar Moodish"</strong> (o "Crear acceso directo" marcando <em>"Abrir como ventana"</em>).</p>
                  </div>
                </div>

                <button
                  onClick={()=>setShowInstallModal(false)}
                  style={{
                    width:"100%",
                    marginTop:16,
                    padding:10,
                    borderRadius:10,
                    background:"rgba(0,229,255,0.18)",
                    border:"1px solid rgba(0,229,255,0.45)",
                    color:"#00E5FF",
                    fontWeight:700,
                    cursor:"pointer"
                  }}
                  className="mono"
                >
                  ENTENDIDO
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
