"use client"

export default function WellnessDashboard() {
  // ── DATA — updated hourly by Hela ─────────────────────────────────────────
  const date = "Sep 8, 2026 · Mexico City · 8:00 PM"
  const mood = { label: "TRANSITIONAL", emoji: "🌊", sub: "Processing & reaching" }
  const insight = "Your last few hours moved between Agnes Obel's dark introspection and Olivia Rodrigo's melancholy, then pivoted hard into EDM and Latin dance — a classic emotional push-pull. You're processing something, but also actively reaching for energy to move through it."

  const tracks = [
    { n: 1,  name: "what's wrong with me",  artist: "Olivia Rodrigo & Robert Smith", vibe: "Sad",   vibeColor: "text-rose-400",   vibeBg: "bg-rose-500/15 border-rose-500/30",   numColor: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
    { n: 2,  name: "Familiar",              artist: "Agnes Obel",                    vibe: "Dark",  vibeColor: "text-indigo-400", vibeBg: "bg-indigo-500/15 border-indigo-500/30", numColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { n: 3,  name: "Doesn't Just Happen",   artist: "James Blake & Dave",            vibe: "Grime", vibeColor: "text-slate-300",  vibeBg: "bg-slate-800 border-slate-700/60",      numColor: "text-slate-300 bg-slate-700/30 border-slate-600/30" },
    { n: 4,  name: "Manhattan",             artist: "Carlita & SOFI TUKKER",         vibe: "House", vibeColor: "text-teal-300",   vibeBg: "bg-teal-500/15 border-teal-500/30",     numColor: "text-teal-300 bg-teal-500/10 border-teal-500/20" },
    { n: 5,  name: "FADE AWAY",             artist: "San Holo & Tisoki",             vibe: "EDM",   vibeColor: "text-cyan-300",   vibeBg: "bg-cyan-500/15 border-cyan-500/30",     numColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20" },
    { n: 6,  name: "Te Estoy Correteando",  artist: "LATIN MAFIA & Fred again..",    vibe: "Latin", vibeColor: "text-amber-400",  vibeBg: "bg-amber-500/15 border-amber-500/30",   numColor: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  ]

  const meters = [
    { label: "Energy",       value: 58, color: "bg-teal-400",   glow: "0 0 8px #14F195", textColor: "text-teal-300",   dotColor: "bg-teal-400" },
    { label: "Valence",      value: 42, color: "bg-purple-400", glow: "0 0 8px #c084fc", textColor: "text-purple-300", dotColor: "bg-purple-400" },
    { label: "Danceability", value: 68, color: "bg-cyan-400",   glow: "0 0 8px #22d3ee", textColor: "text-cyan-300",   dotColor: "bg-cyan-400" },
  ]

  const wellnessCards = [
    { icon: "🏃‍♂️", title: "Zone 2 Run",     desc: "A 20–30 min easy-pace run matches the mixed energy in your listening. Not a sprint — let the body settle while the mind untangles.", cta: "LACE UP", time: "20–30 min", iconBg: "bg-amber-500/10 border-amber-500/20" },
    { icon: "🍃",   title: "Box Breathing",  desc: "4 sec inhale, 4 hold, 4 exhale, 4 hold. Repeat 6 times. Bridges the emotional and energetic contrast in today's session.",           cta: "START 4 MIN NOW", time: "4 min",     iconBg: "bg-cyan-500/10 border-cyan-500/20" },
    { icon: "📝",   title: "Journal 10 min", desc: "Dump the emotional weight before it loops. No structure needed — just open stream of thought from what Agnes Obel and Olivia surfaced.", cta: "OPEN NOTES", time: "10 min",    iconBg: "bg-purple-500/10 border-purple-500/20" },
  ]

  const journalPrompt = "What feeling kept coming back today that you kept trying to outrun with a faster song? What is it actually about?"
  const quote = { text: "The wound is the place where the Light enters you.", author: "Rumi" }
  const playlistUrl = "https://open.spotify.com/playlist/294GQpveapLix5cOdGWOru"
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; background-color: #080C14; font-family: 'Inter', system-ui, sans-serif; }
        .font-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .glow-conic { background: radial-gradient(circle at 50% 0%, rgba(20,241,149,0.12) 0%, rgba(10,14,23,0) 70%); }
        .dial-track { stroke: rgba(255,255,255,0.08); }
        .dial-progress { stroke-dasharray: 440; stroke-dashoffset: 120; stroke-linecap: round; transform: rotate(-90deg); transform-origin: 50% 50%; }
        @keyframes ping { 75%,100% { transform: scale(2); opacity: 0; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .5; } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .ping { animation: ping 1s cubic-bezier(0,0,0.2,1) infinite; }
        .pulse { animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
        .spin-slow { animation: spin-slow 8s linear infinite; }
        @media (min-width: 768px) {
          .desktop-sidebar-left { display: block !important; }
        }
      `}</style>

      <div style={{background:"#080C14",color:"#f1f5f9",minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"flex-start"}}>
        {/* Desktop sidebar glow */}
        <div style={{flex:1,minHeight:"100vh",background:"radial-gradient(ellipse at right, rgba(20,241,149,0.03) 0%, transparent 60%)",display:"none"}} className="desktop-sidebar-left"/>
        <div style={{width:"100%",maxWidth:430,minHeight:"100vh",paddingBottom:112,display:"flex",flexDirection:"column",position:"relative",borderLeft:"1px solid rgba(148,163,184,0.1)",borderRight:"1px solid rgba(148,163,184,0.1)",background:"#0A0E17",overflow:"hidden",boxShadow:"0 0 80px rgba(0,0,0,0.8)"}}>

          <div className="glow-conic" style={{position:"absolute",top:0,left:0,right:0,height:384,pointerEvents:"none",zIndex:0}}/>

          {/* HEADER */}
          <header style={{position:"relative",zIndex:10,padding:"16px 20px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,borderRadius:12,background:"rgba(20,241,149,0.1)",border:"1px solid rgba(20,241,149,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"#2dd4bf"}}>
                <svg style={{width:16,height:16}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span className="font-display" style={{fontWeight:600,letterSpacing:"0.05em",fontSize:16,color:"#fff"}}>Moodish</span>
                <span style={{fontSize:10,textTransform:"uppercase",fontFamily:"monospace",letterSpacing:"0.1em",padding:"2px 6px",borderRadius:4,background:"rgba(20,241,149,0.1)",color:"#2dd4bf",border:"1px solid rgba(20,241,149,0.2)"}}>NEURO·OS</span>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:999,background:"rgba(30,41,59,0.6)",border:"1px solid rgba(71,85,105,0.5)"}}>
                <span className="ping" style={{width:8,height:8,borderRadius:"50%",background:"#34d399",display:"inline-block"}}/>
                <span style={{width:8,height:8,borderRadius:"50%",background:"#34d399",display:"inline-block",marginLeft:-14}}/>
                <span style={{fontSize:11,color:"#cbd5e1",fontWeight:500}}>Synced</span>
              </div>
              <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,rgba(20,241,149,0.4),rgba(0,229,255,0.2),rgba(168,85,247,0.4))",padding:1,position:"relative"}}>
                <div style={{width:"100%",height:"100%",borderRadius:"50%",background:"#06090F",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:"#2dd4bf"}}>IV</div>
                <span style={{position:"absolute",bottom:0,right:0,width:10,height:10,background:"#34d399",border:"2px solid #06090F",borderRadius:"50%"}}/>
              </div>
            </div>
          </header>

          {/* GREETING */}
          <section style={{position:"relative",zIndex:10,padding:"24px 20px 16px"}}>
            <h1 style={{fontSize:24,fontWeight:700,letterSpacing:"-0.025em",color:"#fff",display:"flex",alignItems:"center",gap:8}}>
              Good morning, Ivan
              <span style={{width:10,height:10,borderRadius:"50%",background:"#2dd4bf",boxShadow:"0 0 8px #2dd4bf",display:"inline-block"}}/>
            </h1>
            <p style={{fontSize:12,color:"#94a3b8",marginTop:4,fontWeight:500}}>{date}</p>
            <div style={{marginTop:16,padding:"14px",borderRadius:16,border:"1px solid rgba(20,241,149,0.2)",display:"flex",alignItems:"center",justifyContent:"space-between",background:"linear-gradient(90deg,rgba(20,24,36,0.9),rgba(20,24,36,0.6),rgba(5,30,20,0.2))"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:32,height:32,borderRadius:12,background:"rgba(20,241,149,0.15)",border:"1px solid rgba(45,212,191,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"#5eead4"}}>
                  <svg style={{width:16,height:16}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/></svg>
                </div>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#5eead4"}}>{mood.label}</span>
                    <span className="pulse" style={{width:6,height:6,borderRadius:"50%",background:"#2dd4bf",display:"inline-block"}}/>
                  </div>
                  <p style={{fontSize:12,color:"#cbd5e1"}}>{mood.sub}</p>
                </div>
              </div>
              <span style={{padding:"2px 8px",borderRadius:6,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",fontSize:10,fontFamily:"monospace",letterSpacing:"0.1em",color:"#cbd5e1"}}>LIVE STATE</span>
            </div>
          </section>

          {/* EMOTIONAL DIAL */}
          <section style={{position:"relative",zIndex:10,padding:"8px 20px",display:"flex",flexDirection:"column",gap:16}}>
            <div style={{padding:20,borderRadius:24,background:"rgba(16,20,26,0.8)",border:"1px solid rgba(30,41,59,0.8)",position:"relative",overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,0.3)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <svg className="spin-slow" style={{width:16,height:16,color:"#22d3ee"}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeDasharray="28 10" strokeWidth="2"/></svg>
                  <span style={{fontSize:12,textTransform:"uppercase",fontWeight:700,letterSpacing:"0.05em",color:"#cbd5e1"}}>Dial Emocional</span>
                </div>
                <span style={{fontSize:10,fontFamily:"monospace",fontWeight:600,padding:"2px 8px",borderRadius:999,background:"rgba(34,211,238,0.1)",color:"#22d3ee",border:"1px solid rgba(34,211,238,0.3)"}}>EN VIVO · LIVE</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",margin:"12px 0",position:"relative"}}>
                <svg style={{width:192,height:192}} viewBox="0 0 160 160">
                  <circle className="dial-track" cx="80" cy="80" fill="transparent" r="70" strokeWidth="10"/>
                  <circle className="dial-progress" cx="80" cy="80" fill="transparent" r="70" stroke="#00E5FF" strokeLinecap="round" strokeWidth="10"/>
                </svg>
                <div style={{position:"absolute",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"}}>
                  <span style={{fontSize:36,fontWeight:800,color:"#fff",letterSpacing:"-0.025em"}}>118</span>
                  <span style={{fontSize:10,textTransform:"uppercase",fontWeight:700,letterSpacing:"0.1em",color:"#22d3ee",marginTop:2}}>BPM ACTIVO</span>
                  <span style={{fontSize:12,color:"#cbd5e1",fontWeight:500,marginTop:4}}>Vibra Positiva</span>
                </div>
              </div>
              <div style={{marginTop:8,paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.05)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,marginBottom:6}}>
                  <span style={{color:"#94a3b8",display:"flex",alignItems:"center",gap:6}}>
                    <svg style={{width:14,height:14,color:"#2dd4bf"}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                    Intensidad Anímica
                  </span>
                  <span style={{fontFamily:"monospace",fontWeight:700,color:"#2dd4bf"}}>72%</span>
                </div>
                <div style={{height:8,width:"100%",background:"#1e293b",borderRadius:999,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:999,width:"72%",background:"linear-gradient(90deg,#14F195,#00E5FF,#10B981)",boxShadow:"0 0 10px #2dd4bf"}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,textTransform:"uppercase",letterSpacing:"0.05em",color:"#475569",marginTop:6}}>
                  <span>Calma</span><span>Flujo</span><span>Euforia</span>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:16}}>
                {[{l:"Valencia",v:"82%",c:"#2dd4bf"},{l:"Energía",v:"Alta",c:"#22d3ee"},{l:"Acústica",v:"24%",c:"#e2e8f0"}].map((b,i)=>(
                  <div key={i} style={{padding:10,borderRadius:16,background:"rgba(6,9,15,0.6)",border:"1px solid rgba(255,255,255,0.04)",textAlign:"center"}}>
                    <span style={{display:"block",fontSize:10,textTransform:"uppercase",color:"#94a3b8",letterSpacing:"0.05em"}}>{b.l}</span>
                    <span style={{display:"block",fontSize:14,fontWeight:700,color:b.c,marginTop:2}}>{b.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotional Flow */}
            <article style={{padding:20,borderRadius:24,background:"rgba(16,20,26,0.9)",border:"1px solid rgba(20,241,149,0.2)",boxShadow:"0 8px 32px rgba(0,0,0,0.3)",position:"relative",overflow:"hidden"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 10px",borderRadius:999,background:"rgba(20,241,149,0.1)",color:"#5eead4",border:"1px solid rgba(20,241,149,0.3)"}}>EMOTIONAL FLOW</span>
                <span style={{fontSize:12,color:"#94a3b8",fontWeight:500}}>Last 4 hours</span>
              </div>
              <p style={{fontSize:14,color:"#e2e8f0",lineHeight:1.6}}>{insight}</p>
            </article>
          </section>

          {/* SONIC SIGNATURE */}
          <section style={{position:"relative",zIndex:10,padding:"16px 20px 8px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{width:8,height:8,borderRadius:"50%",background:"#2dd4bf",boxShadow:"0 0 6px #14F195",display:"inline-block"}}/>
                <h2 style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#cbd5e1"}}>SONIC SIGNATURE</h2>
              </div>
              <span style={{fontSize:10,fontFamily:"monospace",letterSpacing:"0.1em",color:"#64748b",textTransform:"uppercase"}}>REAL-TIME TELEMETRY</span>
            </div>
            <div style={{padding:16,borderRadius:24,background:"rgba(16,20,26,0.7)",border:"1px solid rgba(30,41,59,0.8)",display:"flex",flexDirection:"column",gap:16}}>
              {meters.map((m,i)=>(
                <div key={i}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,marginBottom:6,fontWeight:500}}>
                    <span style={{display:"flex",alignItems:"center",gap:8,color:"#e2e8f0"}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:m.dotColor.replace("bg-",""),display:"inline-block",backgroundColor:i===0?"#2dd4bf":i===1?"#c084fc":"#22d3ee"}}/>
                      {m.label}
                    </span>
                    <span style={{fontFamily:"monospace",fontWeight:700,color:i===0?"#2dd4bf":i===1?"#d8b4fe":"#67e8f9"}}>{m.value}%</span>
                  </div>
                  <div style={{height:8,width:"100%",background:"#0f172a",borderRadius:999,overflow:"hidden",padding:1}}>
                    <div style={{height:"100%",borderRadius:999,width:`${m.value}%`,background:i===0?"#2dd4bf":i===1?"#c084fc":"#22d3ee",boxShadow:`0 0 8px ${i===0?"#14F195":i===1?"#c084fc":"#22d3ee"}`}}/>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DAILY MOOD PLAYLIST */}
          <section style={{position:"relative",zIndex:10,padding:"16px 20px 8px"}}>
            <div style={{padding:20,borderRadius:24,border:"1px solid rgba(20,241,149,0.25)",position:"relative",overflow:"hidden",background:"linear-gradient(180deg,#141A24,#10141A,#0A0E17)"}}>
              <div style={{position:"absolute",right:-40,top:-40,width:160,height:160,background:"rgba(20,241,149,0.1)",borderRadius:"50%",filter:"blur(48px)",pointerEvents:"none"}}/>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",padding:"2px 10px",borderRadius:999,background:"rgba(16,185,129,0.15)",color:"#6ee7b7",border:"1px solid rgba(16,185,129,0.3)"}}>MOOD MATCH</span>
                <span style={{fontSize:12,color:"#94a3b8"}}>15 canciones</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:16,margin:"8px 0"}}>
                <div style={{width:80,height:80,borderRadius:16,background:"linear-gradient(135deg,#0c2a3a,#0d3328,#071a10)",border:"1px solid rgba(20,241,149,0.4)",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg className="pulse" style={{width:40,height:40,color:"rgba(94,234,212,0.8)"}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeDasharray="4 2" strokeWidth="1.5"/>
                    <path d="M12 8v8m-4-6v4m8-5v6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                  <div style={{position:"absolute",bottom:4,right:4,width:24,height:24,background:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.3)"}}>
                    <svg style={{width:12,height:12,color:"#0f172a",fill:"currentColor",marginLeft:2}} viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <div>
                  <h3 style={{fontSize:16,fontWeight:700,color:"#fff",lineHeight:1.2}}>Daily Mood Playlist</h3>
                  <p style={{fontSize:12,fontWeight:600,color:"#2dd4bf",marginTop:2}}>Updated hourly by Hela</p>
                  <p style={{fontSize:12,color:"#94a3b8",marginTop:4,lineHeight:1.4}}>Curated to match your transitional state — flows from introspective into momentum-building.</p>
                </div>
              </div>
              <a href={playlistUrl} target="_blank" rel="noopener noreferrer" style={{marginTop:16,width:"100%",padding:"14px 16px",borderRadius:16,background:"#1DB954",color:"#000",fontWeight:700,fontSize:12,textTransform:"uppercase",letterSpacing:"0.05em",display:"flex",alignItems:"center",justifyContent:"center",gap:8,textDecoration:"none",boxShadow:"0 4px 20px rgba(29,185,84,0.3)"}}>
                <svg style={{width:16,height:16,fill:"currentColor"}} viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.308c-.216.354-.678.468-1.032.253-2.827-1.728-6.386-2.119-10.579-1.162-.404.093-.807-.156-.899-.56-.093-.404.156-.807.56-.899 4.595-1.049 8.528-.611 11.697 1.336.354.215.468.678.253 1.032zm1.464-3.261c-.272.443-.853.585-1.296.313-3.235-1.988-8.169-2.564-11.996-1.401-.497.151-1.026-.134-1.177-.63-.151-.497.134-1.026.63-1.177 4.375-1.328 9.805-.688 13.526 1.601.443.272.585.853.313 1.294zm.126-3.414c-3.879-2.303-10.283-2.516-13.993-1.389-.594.181-1.229-.158-1.41-.752-.181-.594.158-1.229.752-1.41 4.267-1.296 11.329-1.044 15.795 1.608.535.318.708 1.011.39 1.546-.318.535-1.011.708-1.546.39z"/></svg>
                Open in Spotify
              </a>
            </div>
          </section>

          {/* KEY TRACKS */}
          <section style={{position:"relative",zIndex:10,padding:"20px 20px 12px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{width:8,height:8,borderRadius:"50%",background:"#c084fc",display:"inline-block"}}/>
                <h2 style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#cbd5e1"}}>LAST 24H · KEY TRACKS</h2>
              </div>
              <span style={{fontSize:10,fontFamily:"monospace",color:"#64748b"}}>6 Tracks Logged</span>
            </div>
            <div style={{borderRadius:24,background:"rgba(16,20,26,0.8)",border:"1px solid rgba(30,41,59,0.9)",overflow:"hidden"}}>
              {tracks.map((t,i)=>(
                <div key={t.n} style={{padding:"14px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:i<tracks.length-1?"1px solid rgba(255,255,255,0.04)":"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <span style={{fontSize:12,fontFamily:"monospace",fontWeight:700,width:28,height:28,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid",backgroundColor:i===0?"rgba(239,68,68,0.1)":i===1?"rgba(99,102,241,0.1)":i===2?"rgba(100,116,139,0.3)":i===3?"rgba(20,241,149,0.1)":i===4?"rgba(34,211,238,0.1)":"rgba(245,158,11,0.1)",borderColor:i===0?"rgba(239,68,68,0.2)":i===1?"rgba(99,102,241,0.2)":i===2?"rgba(100,116,139,0.3)":i===3?"rgba(20,241,149,0.2)":i===4?"rgba(34,211,238,0.2)":"rgba(245,158,11,0.2)",color:i===0?"#fb7185":i===1?"#818cf8":i===2?"#cbd5e1":i===3?"#2dd4bf":i===4?"#22d3ee":"#fbbf24"}}>
                      {String(t.n).padStart(2,"0")}
                    </span>
                    <div>
                      <p style={{fontSize:12,fontWeight:700,color:"#fff",letterSpacing:"-0.01em"}}>{t.name}</p>
                      <p style={{fontSize:11,color:"#64748b",marginTop:2}}>{t.artist}</p>
                    </div>
                  </div>
                  <span style={{padding:"4px 10px",borderRadius:999,fontSize:10,fontWeight:600,letterSpacing:"0.025em",border:"1px solid",backgroundColor:i===0?"rgba(239,68,68,0.15)":i===1?"rgba(99,102,241,0.15)":i===2?"#1e293b":i===3?"rgba(20,241,149,0.15)":i===4?"rgba(34,211,238,0.15)":"rgba(245,158,11,0.15)",borderColor:i===0?"rgba(239,68,68,0.3)":i===1?"rgba(99,102,241,0.3)":i===2?"rgba(100,116,139,0.6)":i===3?"rgba(20,241,149,0.3)":i===4?"rgba(34,211,238,0.3)":"rgba(245,158,11,0.3)",color:i===0?"#fb7185":i===1?"#818cf8":i===2?"#cbd5e1":i===3?"#2dd4bf":i===4?"#22d3ee":"#fbbf24"}}>{t.vibe}</span>
                </div>
              ))}
            </div>
          </section>

          {/* WELLNESS PLAN */}
          <section style={{position:"relative",zIndex:10,padding:"20px 20px 8px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{width:8,height:8,borderRadius:"50%",background:"#34d399",display:"inline-block"}}/>
                <h2 style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#cbd5e1"}}>TODAY'S WELLNESS PLAN</h2>
              </div>
              <span style={{fontSize:10,fontFamily:"monospace",letterSpacing:"0.05em",color:"#64748b",textTransform:"uppercase"}}>ADAPTIVE STEPS</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {wellnessCards.map((c,i)=>(
                <div key={i} style={{padding:16,borderRadius:24,background:"rgba(16,20,26,0.8)",border:"1px solid rgba(30,41,59,0.8)"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                    <div style={{width:36,height:36,borderRadius:12,border:"1px solid",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,backgroundColor:i===0?"rgba(245,158,11,0.1)":i===1?"rgba(34,211,238,0.1)":"rgba(168,85,247,0.1)",borderColor:i===0?"rgba(245,158,11,0.2)":i===1?"rgba(34,211,238,0.2)":"rgba(168,85,247,0.2)"}}>{c.icon}</div>
                    <span style={{fontSize:10,fontFamily:"monospace",color:"#64748b",padding:"2px 8px",borderRadius:6,background:"rgba(255,255,255,0.04)"}}>{c.time}</span>
                  </div>
                  <h3 style={{fontSize:14,fontWeight:700,color:"#fff",marginTop:4}}>{c.title}</h3>
                  <p style={{fontSize:12,color:"#94a3b8",marginTop:4,lineHeight:1.6}}>{c.desc}</p>
                  <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:12,fontWeight:700,color:"#2dd4bf",marginTop:12,letterSpacing:"0.05em"}}>{c.cta} <span style={{fontSize:14}}>→</span></span>
                </div>
              ))}
            </div>
          </section>

          {/* REFLECTION */}
          <section style={{position:"relative",zIndex:10,padding:"16px 20px 24px",display:"flex",flexDirection:"column",gap:12}}>
            <div style={{padding:16,borderRadius:16,background:"rgba(16,20,26,0.4)",borderLeft:"2px solid #22d3ee",color:"#94a3b8",fontSize:12,fontStyle:"italic"}}>
              <p>"{quote.text}"</p>
              <span style={{display:"block",marginTop:4,fontFamily:"monospace",fontSize:10,color:"#475569",fontStyle:"normal"}}>— {quote.author}</span>
            </div>
            <div style={{padding:20,borderRadius:24,background:"rgba(16,20,26,0.9)",border:"1px solid rgba(20,241,149,0.3)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"center",gap:6,color:"#cbd5e1",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em"}}>
                  <span>📓</span> JOURNAL PROMPT
                </div>
                <span style={{fontSize:10,fontFamily:"monospace",fontWeight:600,padding:"2px 8px",borderRadius:4,background:"rgba(20,241,149,0.1)",color:"#2dd4bf",border:"1px solid rgba(20,241,149,0.2)"}}>TODAY'S QUESTION</span>
              </div>
              <blockquote style={{fontSize:12,color:"#e2e8f0",lineHeight:1.7,fontStyle:"italic",margin:"8px 0"}}>"{journalPrompt}"</blockquote>
              <div style={{marginTop:14,width:"100%",padding:"10px 16px",borderRadius:12,background:"rgba(6,9,15,0.8)",border:"1px solid rgba(255,255,255,0.1)",fontSize:12,fontWeight:600,color:"#e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                Write response in private journal →
              </div>
            </div>
            <p style={{textAlign:"center",fontSize:10,color:"#334155",paddingTop:8}}>Updated hourly by Hela · Spotify Studio · This content was generated using AI.</p>
          </section>

          {/* BOTTOM NAV */}
          <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,zIndex:50,padding:"8px 16px 16px",background:"linear-gradient(to top,#06090F,rgba(6,9,15,0.95),transparent)"}}>
            <div style={{background:"rgba(16,20,26,0.95)",border:"1px solid rgba(71,85,105,0.5)",borderRadius:24,padding:6,display:"flex",alignItems:"center",justifyContent:"space-around",boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}}>
              {[
                {label:"TODAY",active:true, path:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
                {label:"SONIC",active:false,path:"M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"},
                {label:"WELLNESS",active:false,path:"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"},
                {label:"PROFILE",active:false,path:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"},
              ].map((tab,i)=>(
                <a key={i} href={`#${tab.label.toLowerCase()}`} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 12px",borderRadius:16,textDecoration:"none",transition:"all 0.2s",background:tab.active?"rgba(20,241,149,0.1)":"transparent",border:tab.active?"1px solid rgba(20,241,149,0.2)":"1px solid transparent",color:tab.active?"#2dd4bf":"#64748b"}}>
                  <svg style={{width:20,height:20}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d={tab.path} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </svg>
                  <span style={{fontSize:10,fontWeight:700,marginTop:4,letterSpacing:"0.05em"}}>{tab.label}</span>
                </a>
              ))}
            </div>
          </nav>

        </div>
      </div>
    </>
  )
}
