"use client"
import { useState } from "react"

export default function WellnessDashboard() {
  // ── DATA — updated hourly by Hela ─────────────────────────────────────────
  const date = "Sep 8, 2026 · Mexico City · 8:00 PM"
  const mood = { label: "TRANSITIONAL", emoji: "🌊", sub: "Processing & reaching" }
  const insight = "Your last few hours moved between Agnes Obel's dark introspection and Olivia Rodrigo's melancholy, then pivoted hard into EDM and Latin dance — a classic emotional push-pull. You're processing something, but also actively reaching for energy to move through it."

  const tracks = [
    { n: 1, name: "what's wrong with me",  artist: "Olivia Rodrigo & Robert Smith", vibe: "Sad",   nc: "#fb7185", nBg: "rgba(239,68,68,0.1)",    nBd: "rgba(239,68,68,0.2)",    vc: "#fb7185", vBg: "rgba(239,68,68,0.15)",   vBd: "rgba(239,68,68,0.3)" },
    { n: 2, name: "Familiar",              artist: "Agnes Obel",                    vibe: "Dark",  nc: "#818cf8", nBg: "rgba(99,102,241,0.1)",   nBd: "rgba(99,102,241,0.2)",   vc: "#818cf8", vBg: "rgba(99,102,241,0.15)",  vBd: "rgba(99,102,241,0.3)" },
    { n: 3, name: "Doesn't Just Happen",   artist: "James Blake & Dave",            vibe: "Grime", nc: "#cbd5e1", nBg: "rgba(100,116,139,0.3)",  nBd: "rgba(100,116,139,0.3)",  vc: "#cbd5e1", vBg: "#1e293b",               vBd: "rgba(100,116,139,0.6)" },
    { n: 4, name: "Manhattan",             artist: "Carlita & SOFI TUKKER",         vibe: "House", nc: "#2dd4bf", nBg: "rgba(20,241,149,0.1)",   nBd: "rgba(20,241,149,0.2)",   vc: "#2dd4bf", vBg: "rgba(20,241,149,0.15)",  vBd: "rgba(20,241,149,0.3)" },
    { n: 5, name: "FADE AWAY",             artist: "San Holo & Tisoki",             vibe: "EDM",   nc: "#22d3ee", nBg: "rgba(34,211,238,0.1)",   nBd: "rgba(34,211,238,0.2)",   vc: "#22d3ee", vBg: "rgba(34,211,238,0.15)",  vBd: "rgba(34,211,238,0.3)" },
    { n: 6, name: "Te Estoy Correteando",  artist: "LATIN MAFIA & Fred again..",    vibe: "Latin", nc: "#fbbf24", nBg: "rgba(245,158,11,0.1)",   nBd: "rgba(245,158,11,0.2)",   vc: "#fbbf24", vBg: "rgba(245,158,11,0.15)",  vBd: "rgba(245,158,11,0.3)" },
  ]

  const meters = [
    { label: "Energy",       value: 58, color: "#2dd4bf", glow: "#14F195" },
    { label: "Valence",      value: 42, color: "#c084fc", glow: "#c084fc" },
    { label: "Danceability", value: 68, color: "#22d3ee", glow: "#22d3ee" },
  ]

  const wellnessItems = [
    { icon: "🏃‍♂️", title: "Zone 2 Run",      desc: "20–30 min easy pace. Let the body settle while the mind untangles.", time: "20–30 min" },
    { icon: "🍃",   title: "Box Breathing",   desc: "4 sec inhale · 4 hold · 4 exhale · 4 hold. Repeat 6 times.", time: "4 min" },
    { icon: "📝",   title: "Journal 10 min",  desc: "Open stream of thought. What are you carrying that you haven't said out loud?", time: "10 min" },
  ]

  const journalPrompt = "What feeling kept coming back today that you kept trying to outrun with a faster song? What is it actually about?"
  const quote = { text: "The wound is the place where the Light enters you.", author: "Rumi" }
  const playlistUrl = "https://open.spotify.com/playlist/294GQpveapLix5cOdGWOru"
  // ─────────────────────────────────────────────────────────────────────────

  const [tab, setTab] = useState<"today"|"music"|"wellness"|"profile">("today")
  const [done, setDone] = useState<boolean[]>([false, false, false])

  const toggleDone = (i: number) => {
    setDone(prev => { const n = [...prev]; n[i] = !n[i]; return n })
  }

  const S = {
    page: { background:"#080C14", color:"#f1f5f9", minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"stretch" } as React.CSSProperties,
    shell: { width:"100%", maxWidth:430, height:"100vh", display:"flex", flexDirection:"column" as const, position:"relative" as const, borderLeft:"1px solid rgba(148,163,184,0.1)", borderRight:"1px solid rgba(148,163,184,0.1)", background:"#0A0E17", overflowY:"hidden" as const, boxShadow:"0 0 80px rgba(0,0,0,0.8)", flexShrink:0 },
    glow: { position:"absolute" as const, top:0, left:0, right:0, height:320, background:"radial-gradient(circle at 50% 0%, rgba(20,241,149,0.1) 0%, transparent 70%)", pointerEvents:"none" as const, zIndex:0 },
    card: { padding:16, borderRadius:20, background:"rgba(16,20,26,0.85)", border:"1px solid rgba(30,41,59,0.9)", marginBottom:12 } as React.CSSProperties,
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; background: #080C14; font-family: 'Inter', system-ui, sans-serif; }
        .fd { font-family: 'Space Grotesk', sans-serif; }
        @keyframes ping  { 75%,100% { transform:scale(2); opacity:0; } }
        @keyframes pulse { 0%,100%  { opacity:1; } 50% { opacity:.5; } }
        @keyframes spin  { to { transform:rotate(360deg); } }
        .ping  { animation: ping  1s cubic-bezier(0,0,.2,1) infinite; }
        .pulse { animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite; }
        .spin  { animation: spin  8s linear infinite; }
        .tab-btn { background:none; border:none; cursor:pointer; display:flex; flex-direction:column; align-items:center; padding:8px 16px; border-radius:16px; gap:3px; transition:all .15s; }
        .tab-btn.active { background:rgba(20,241,149,0.1); border:1px solid rgba(20,241,149,0.25); }
        .tab-btn:not(.active) { border:1px solid transparent; }
        .done-card { transition: background .25s, border-color .25s; cursor:pointer; }
        .done-card.done { background: rgba(20,241,149,0.08) !important; border-color: rgba(20,241,149,0.4) !important; }
        @media (min-width:768px) {
          .sidebar { display:block !important; }
          /* On desktop, page fills full viewport height */
          html, body { height: 100%; overflow: hidden; }
        }
        ::-webkit-scrollbar { width:0; }
      `}</style>

      <div style={S.page}>
        <div className="sidebar" style={{flex:1,display:"none",background:"radial-gradient(ellipse at left,rgba(20,241,149,0.03),transparent 60%)"}}/>
        <div style={S.shell}>
          <div style={S.glow}/>

          {/* ── HEADER ── */}
          <header style={{position:"relative",zIndex:10,padding:"14px 20px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:30,height:30,borderRadius:10,background:"rgba(20,241,149,0.1)",border:"1px solid rgba(20,241,149,0.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg style={{width:14,height:14,stroke:"#2dd4bf",fill:"none"}} viewBox="0 0 24 24"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
              </div>
              <span className="fd" style={{fontWeight:700,fontSize:15,color:"#fff",letterSpacing:"0.03em"}}>Moodish</span>
              <span style={{fontSize:9,fontFamily:"monospace",padding:"2px 5px",borderRadius:4,background:"rgba(20,241,149,0.1)",color:"#2dd4bf",border:"1px solid rgba(20,241,149,0.2)",letterSpacing:"0.08em"}}>NEURO·OS</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{display:"flex",alignItems:"center",gap:5,padding:"3px 8px",borderRadius:999,background:"rgba(30,41,59,0.7)",border:"1px solid rgba(71,85,105,0.4)"}}>
                <span className="ping" style={{width:6,height:6,borderRadius:"50%",background:"#34d399",display:"inline-block"}}/>
                <span style={{width:6,height:6,borderRadius:"50%",background:"#34d399",display:"inline-block",marginLeft:-11}}/>
                <span style={{fontSize:10,color:"#cbd5e1",fontWeight:500}}>Synced</span>
              </div>
              <div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,rgba(20,241,149,0.5),rgba(0,229,255,0.3),rgba(168,85,247,0.5))",padding:1,position:"relative"}}>
                <div style={{width:"100%",height:"100%",borderRadius:"50%",background:"#06090F",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#2dd4bf"}}>IV</div>
                <span style={{position:"absolute",bottom:0,right:0,width:8,height:8,background:"#34d399",border:"2px solid #06090F",borderRadius:"50%"}}/>
              </div>
            </div>
          </header>

          {/* ── GREETING ── */}
          <section style={{position:"relative",zIndex:10,padding:"20px 20px 12px"}}>
            <h1 style={{fontSize:22,fontWeight:800,color:"#fff",display:"flex",alignItems:"center",gap:8,letterSpacing:"-0.02em"}}>
              Good morning, Ivan
              <span style={{width:8,height:8,borderRadius:"50%",background:"#2dd4bf",boxShadow:"0 0 8px #2dd4bf",display:"inline-block"}}/>
            </h1>
            <p style={{fontSize:11,color:"#64748b",marginTop:3}}>{date}</p>
            <div style={{marginTop:12,padding:"12px 14px",borderRadius:14,border:"1px solid rgba(20,241,149,0.2)",display:"flex",alignItems:"center",justifyContent:"space-between",background:"linear-gradient(90deg,rgba(20,24,36,0.9),rgba(5,30,20,0.2))"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:30,height:30,borderRadius:10,background:"rgba(20,241,149,0.12)",border:"1px solid rgba(45,212,191,0.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg style={{width:14,height:14,stroke:"#5eead4",fill:"none"}} viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/></svg>
                </div>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#5eead4"}}>{mood.label}</span>
                    <span className="pulse" style={{width:5,height:5,borderRadius:"50%",background:"#2dd4bf",display:"inline-block"}}/>
                  </div>
                  <p style={{fontSize:11,color:"#94a3b8"}}>{mood.sub}</p>
                </div>
              </div>
              <span style={{fontSize:9,fontFamily:"monospace",padding:"2px 7px",borderRadius:5,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",color:"#94a3b8",letterSpacing:"0.08em"}}>LIVE STATE</span>
            </div>
          </section>

          {/* ── SCROLLABLE CONTENT ── */}
          <div style={{flex:1,overflowY:"auto",overflowX:"hidden",padding:"0 20px 8px",position:"relative",zIndex:10,WebkitOverflowScrolling:"touch"} as React.CSSProperties}>

            {/* TODAY TAB */}
            {tab === "today" && (
              <div>
                {/* Dial */}
                <div style={{...S.card, marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <svg className="spin" style={{width:14,height:14,stroke:"#22d3ee",fill:"none"}} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeDasharray="28 10" strokeWidth="2"/></svg>
                      <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#94a3b8"}}>Dial Emocional</span>
                    </div>
                    <span style={{fontSize:9,fontFamily:"monospace",padding:"2px 7px",borderRadius:999,background:"rgba(34,211,238,0.1)",color:"#22d3ee",border:"1px solid rgba(34,211,238,0.3)"}}>EN VIVO</span>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",position:"relative",margin:"8px 0"}}>
                    <svg style={{width:160,height:160}} viewBox="0 0 160 160">
                      <circle cx="80" cy="80" fill="transparent" r="70" strokeWidth="10" stroke="rgba(255,255,255,0.07)"/>
                      <circle cx="80" cy="80" fill="transparent" r="70" strokeWidth="10" stroke="#00E5FF" strokeLinecap="round" strokeDasharray="440" strokeDashoffset="120" style={{transform:"rotate(-90deg)",transformOrigin:"50% 50%"}}/>
                    </svg>
                    <div style={{position:"absolute",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",top:"50%",transform:"translateY(-50%)"}}>
                      <span style={{fontSize:32,fontWeight:800,color:"#fff"}}>{meters[0].value + meters[2].value}</span>
                      <span style={{fontSize:9,textTransform:"uppercase",fontWeight:700,letterSpacing:"0.1em",color:"#22d3ee",marginTop:1}}>MOOD SCORE</span>
                      <span style={{fontSize:10,color:"#94a3b8",marginTop:3}}>{mood.sub}</span>
                    </div>
                  </div>
                  <div style={{marginTop:8,paddingTop:10,borderTop:"1px solid rgba(255,255,255,0.05)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:5}}>
                      <span style={{color:"#64748b"}}>Intensidad Anímica</span>
                      <span style={{fontFamily:"monospace",fontWeight:700,color:"#2dd4bf"}}>{meters[0].value}%</span>
                    </div>
                    <div style={{height:6,background:"#1e293b",borderRadius:999,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${meters[0].value}%`,background:"linear-gradient(90deg,#14F195,#00E5FF)",boxShadow:"0 0 8px #2dd4bf",borderRadius:999}}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:9,textTransform:"uppercase",color:"#334155",marginTop:5,letterSpacing:"0.06em"}}>
                      <span>Calma</span><span>Flujo</span><span>Euforia</span>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:12}}>
                    {[{l:"Valence",v:`${meters[1].value}%`,c:"#2dd4bf"},{l:"Energía",v:`${meters[0].value}%`,c:"#22d3ee"},{l:"Dance",v:`${meters[2].value}%`,c:"#a78bfa"}].map((b,i)=>(
                      <div key={i} style={{padding:"8px 6px",borderRadius:12,background:"rgba(6,9,15,0.7)",border:"1px solid rgba(255,255,255,0.04)",textAlign:"center"}}>
                        <span style={{display:"block",fontSize:9,textTransform:"uppercase",color:"#475569",letterSpacing:"0.06em"}}>{b.l}</span>
                        <span style={{display:"block",fontSize:15,fontWeight:700,color:b.c,marginTop:2}}>{b.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emotional Flow */}
                <div style={{...S.card,border:"1px solid rgba(20,241,149,0.2)"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                    <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",padding:"3px 8px",borderRadius:999,background:"rgba(20,241,149,0.1)",color:"#5eead4",border:"1px solid rgba(20,241,149,0.25)"}}>EMOTIONAL FLOW</span>
                    <span style={{fontSize:10,color:"#475569"}}>Last hour</span>
                  </div>
                  <p style={{fontSize:13,color:"#e2e8f0",lineHeight:1.65}}>{insight}</p>
                </div>

                {/* Sonic Bars */}
                <div style={S.card}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{width:6,height:6,borderRadius:"50%",background:"#2dd4bf",boxShadow:"0 0 5px #14F195",display:"inline-block"}}/>
                      <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#94a3b8"}}>SONIC SIGNATURE</span>
                    </div>
                  </div>
                  {meters.map((m,i)=>(
                    <div key={i} style={{marginBottom:i<meters.length-1?14:0}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:5,fontWeight:500}}>
                        <span style={{color:"#e2e8f0",display:"flex",alignItems:"center",gap:6}}>
                          <span style={{width:6,height:6,borderRadius:"50%",background:m.color,display:"inline-block"}}/>
                          {m.label}
                        </span>
                        <span style={{fontFamily:"monospace",fontWeight:700,color:m.color}}>{m.value}%</span>
                      </div>
                      <div style={{height:6,background:"#0f172a",borderRadius:999,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${m.value}%`,background:m.color,boxShadow:`0 0 6px ${m.glow}`,borderRadius:999}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MUSIC TAB */}
            {tab === "music" && (
              <div>
                {/* Playlist card */}
                <div style={{...S.card,border:"1px solid rgba(20,241,149,0.25)",background:"linear-gradient(180deg,#141A24,#10141A)",position:"relative",overflow:"hidden",marginBottom:12}}>
                  <div style={{position:"absolute",right:-30,top:-30,width:120,height:120,background:"rgba(20,241,149,0.08)",borderRadius:"50%",filter:"blur(32px)"}}/>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                    <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",padding:"2px 8px",borderRadius:999,background:"rgba(16,185,129,0.15)",color:"#6ee7b7",border:"1px solid rgba(16,185,129,0.3)"}}>MOOD MATCH</span>
                    <span style={{fontSize:10,color:"#475569"}}>15 tracks</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
                    <div style={{width:72,height:72,borderRadius:14,background:"linear-gradient(135deg,#0c2a3a,#0d3328)",border:"1px solid rgba(20,241,149,0.35)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,position:"relative"}}>
                      <svg className="pulse" style={{width:32,height:32,stroke:"rgba(94,234,212,0.8)",fill:"none"}} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeDasharray="4 2" strokeWidth="1.5"/>
                        <path d="M12 8v8m-4-6v4m8-5v6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                      </svg>
                      <div style={{position:"absolute",bottom:3,right:3,width:20,height:20,background:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <svg style={{width:10,height:10,fill:"#0f172a",marginLeft:2}} viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    <div>
                      <h3 style={{fontSize:15,fontWeight:700,color:"#fff",lineHeight:1.2}}>Daily Mood Playlist</h3>
                      <p style={{fontSize:11,color:"#2dd4bf",fontWeight:600,marginTop:2}}>Updated hourly by Hela</p>
                      <p style={{fontSize:11,color:"#64748b",marginTop:3,lineHeight:1.4}}>Flows from introspective into momentum-building.</p>
                    </div>
                  </div>
                  <a href={playlistUrl} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:"12px",borderRadius:14,background:"#1DB954",color:"#000",fontWeight:700,fontSize:12,textTransform:"uppercase",letterSpacing:"0.06em",textDecoration:"none",boxShadow:"0 4px 16px rgba(29,185,84,0.3)"}}>
                    <svg style={{width:14,height:14,fill:"currentColor"}} viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.308c-.216.354-.678.468-1.032.253-2.827-1.728-6.386-2.119-10.579-1.162-.404.093-.807-.156-.899-.56-.093-.404.156-.807.56-.899 4.595-1.049 8.528-.611 11.697 1.336.354.215.468.678.253 1.032zm1.464-3.261c-.272.443-.853.585-1.296.313-3.235-1.988-8.169-2.564-11.996-1.401-.497.151-1.026-.134-1.177-.63-.151-.497.134-1.026.63-1.177 4.375-1.328 9.805-.688 13.526 1.601.443.272.585.853.313 1.294zm.126-3.414c-3.879-2.303-10.283-2.516-13.993-1.389-.594.181-1.229-.158-1.41-.752-.181-.594.158-1.229.752-1.41 4.267-1.296 11.329-1.044 15.795 1.608.535.318.708 1.011.39 1.546-.318.535-1.011.708-1.546.39z"/></svg>
                    Open in Spotify
                  </a>
                </div>

                {/* Mood summary */}
                <div style={{...S.card,border:"1px solid rgba(20,241,149,0.15)",marginBottom:12}}>
                  <p style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#475569",marginBottom:10}}>MOOD ANALYSIS</p>
                  <p style={{fontSize:13,color:"#e2e8f0",lineHeight:1.65,marginBottom:14}}>{insight}</p>
                  {meters.map((m,i)=>(
                    <div key={i} style={{marginBottom:i<meters.length-1?10:0}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4}}>
                        <span style={{color:"#94a3b8"}}>{m.label}</span>
                        <span style={{fontFamily:"monospace",fontWeight:700,color:m.color}}>{m.value}%</span>
                      </div>
                      <div style={{height:5,background:"#0f172a",borderRadius:999,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${m.value}%`,background:m.color,borderRadius:999}}/>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key tracks */}
                <div style={{...S.card,padding:"8px 16px"}}>
                  <p style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#475569",margin:"8px 0 4px"}}>LAST 24H · KEY TRACKS</p>
                  {tracks.map((t,i)=>(
                    <div key={t.n} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 0",borderBottom:i<tracks.length-1?"1px solid rgba(255,255,255,0.04)":"none"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <span style={{fontSize:11,fontFamily:"monospace",fontWeight:700,width:26,height:26,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid",backgroundColor:t.nBg,borderColor:t.nBd,color:t.nc,flexShrink:0}}>{String(t.n).padStart(2,"0")}</span>
                        <div>
                          <p style={{fontSize:12,fontWeight:700,color:"#fff"}}>{t.name}</p>
                          <p style={{fontSize:10,color:"#64748b",marginTop:1}}>{t.artist}</p>
                        </div>
                      </div>
                      <span style={{fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:999,border:"1px solid",backgroundColor:t.vBg,borderColor:t.vBd,color:t.vc,flexShrink:0,marginLeft:8}}>{t.vibe}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WELLNESS TAB */}
            {tab === "wellness" && (
              <div>
                <p style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#475569",marginBottom:12}}>TAP TO MARK AS DONE</p>
                {wellnessItems.map((c,i)=>(
                  <div key={i} onClick={()=>toggleDone(i)} className={`done-card${done[i]?" done":""}`} style={{...S.card,cursor:"pointer",border:done[i]?"1px solid rgba(20,241,149,0.4)":"1px solid rgba(30,41,59,0.9)",background:done[i]?"rgba(20,241,149,0.07)":"rgba(16,20,26,0.85)",position:"relative",overflow:"hidden"}}>
                    {done[i] && <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#14F195,#00E5FF)"}}/>}
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
                      <div style={{display:"flex",alignItems:"flex-start",gap:12,flex:1}}>
                        <div style={{width:40,height:40,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,background:done[i]?"rgba(20,241,149,0.12)":i===0?"rgba(245,158,11,0.1)":i===1?"rgba(34,211,238,0.1)":"rgba(168,85,247,0.1)",border:`1px solid ${done[i]?"rgba(20,241,149,0.3)":i===0?"rgba(245,158,11,0.2)":i===1?"rgba(34,211,238,0.2)":"rgba(168,85,247,0.2)"}`}}>
                          {done[i] ? "✅" : c.icon}
                        </div>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                            <h3 style={{fontSize:14,fontWeight:700,color:done[i]?"#2dd4bf":"#fff"}}>{c.title}</h3>
                            <span style={{fontSize:9,fontFamily:"monospace",color:"#475569",padding:"1px 6px",borderRadius:4,background:"rgba(255,255,255,0.04)"}}>{c.time}</span>
                          </div>
                          <p style={{fontSize:12,color:done[i]?"#5eead4":"#94a3b8",lineHeight:1.5}}>{c.desc}</p>
                        </div>
                      </div>
                      <div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${done[i]?"#2dd4bf":"rgba(71,85,105,0.5)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:done[i]?"rgba(20,241,149,0.15)":"transparent",marginTop:2}}>
                        {done[i] && <svg style={{width:12,height:12,stroke:"#2dd4bf",fill:"none"}} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/></svg>}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Journal prompt */}
                <div style={{...S.card,border:"1px solid rgba(20,241,149,0.2)",marginTop:4}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                    <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#5eead4"}}>📓 JOURNAL PROMPT</span>
                    <span style={{fontSize:9,fontFamily:"monospace",padding:"2px 6px",borderRadius:4,background:"rgba(20,241,149,0.1)",color:"#2dd4bf",border:"1px solid rgba(20,241,149,0.2)"}}>HOY</span>
                  </div>
                  <p style={{fontSize:13,color:"#e2e8f0",lineHeight:1.7,fontStyle:"italic"}}>"{journalPrompt}"</p>
                </div>

                {/* Quote */}
                <div style={{padding:"14px 16px",borderRadius:14,borderLeft:"2px solid #22d3ee",background:"rgba(16,20,26,0.4)",marginTop:12}}>
                  <p style={{fontSize:12,color:"#64748b",fontStyle:"italic",lineHeight:1.6}}>"{quote.text}"</p>
                  <span style={{display:"block",fontSize:10,color:"#334155",marginTop:4,fontFamily:"monospace"}}>— {quote.author}</span>
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {tab === "profile" && (
              <div>
                {/* Current mood summary */}
                <div style={{...S.card,border:"1px solid rgba(20,241,149,0.2)",marginBottom:12}}>
                  <p style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#475569",marginBottom:12}}>CURRENT MOOD SNAPSHOT</p>
                  <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
                    <div style={{width:56,height:56,borderRadius:16,background:"rgba(16,20,26,0.9)",border:"1px solid rgba(20,241,149,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>{mood.emoji}</div>
                    <div>
                      <p style={{fontSize:18,fontWeight:800,color:"#2dd4bf",letterSpacing:"-0.01em"}}>{mood.label}</p>
                      <p style={{fontSize:12,color:"#94a3b8",marginTop:2}}>{mood.sub}</p>
                      <p style={{fontSize:10,color:"#475569",marginTop:3,fontFamily:"monospace"}}>{date}</p>
                    </div>
                  </div>
                  <p style={{fontSize:13,color:"#cbd5e1",lineHeight:1.65}}>{insight}</p>
                </div>

                {/* Stats grid */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  {[
                    {label:"Energy",    value:`${meters[0].value}%`, color:"#2dd4bf", icon:"⚡"},
                    {label:"Valence",   value:`${meters[1].value}%`, color:"#c084fc", icon:"💜"},
                    {label:"Danceability", value:`${meters[2].value}%`, color:"#22d3ee", icon:"🎧"},
                    {label:"Mood Score",value:`${meters[0].value+meters[2].value}`, color:"#fbbf24", icon:"🌊"},
                  ].map((s,i)=>(
                    <div key={i} style={{...S.card,marginBottom:0,textAlign:"center",padding:14}}>
                      <span style={{fontSize:20}}>{s.icon}</span>
                      <p style={{fontSize:22,fontWeight:800,color:s.color,marginTop:6,letterSpacing:"-0.02em"}}>{s.value}</p>
                      <p style={{fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:"0.06em",marginTop:2}}>{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Top vibe tags */}
                <div style={S.card}>
                  <p style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#475569",marginBottom:10}}>TODAY'S VIBE MIX</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {tracks.map(t=>(
                      <span key={t.n} style={{fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:999,border:"1px solid",backgroundColor:t.vBg,borderColor:t.vBd,color:t.vc}}>{t.vibe}</span>
                    ))}
                  </div>
                </div>

                <p style={{textAlign:"center",fontSize:10,color:"#1e293b",marginTop:16}}>Updated hourly by Hela · Spotify Studio · This content was generated using AI.</p>
              </div>
            )}
          </div>

          {/* ── BOTTOM TAB BAR ── */}
          <nav style={{position:"relative",zIndex:50,padding:"8px 16px 16px",background:"linear-gradient(to top,#06090F 80%,transparent)",flexShrink:0}}>
            <div style={{background:"rgba(10,14,23,0.97)",border:"1px solid rgba(71,85,105,0.4)",borderRadius:22,padding:6,display:"flex",alignItems:"center",justifyContent:"space-around",boxShadow:"0 -4px 32px rgba(0,0,0,0.6)"}}>
              {([
                { id:"today",    label:"Today",    path:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                { id:"music",   label:"Music",    path:"M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" },
                { id:"wellness",label:"Wellness", path:"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
                { id:"profile", label:"Profile",  path:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
              ] as const).map(t=>(
                <button key={t.id} onClick={()=>setTab(t.id)} className={`tab-btn${tab===t.id?" active":""}`}>
                  <svg style={{width:20,height:20,stroke:tab===t.id?"#2dd4bf":"#475569",fill:"none",transition:"stroke .15s"}} viewBox="0 0 24 24">
                    <path d={t.path} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                  <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:tab===t.id?"#2dd4bf":"#475569",transition:"color .15s"}}>{t.label}</span>
                </button>
              ))}
            </div>
          </nav>

        </div>
        <div className="sidebar" style={{flex:1,display:"none",background:"radial-gradient(ellipse at right,rgba(20,241,149,0.03),transparent 60%)"}}/>
      </div>
    </>
  )
}
