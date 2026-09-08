"use client"

export default function WellnessDashboard() {
  // ── DATA — updated hourly by Hela ─────────────────────────────────────────
  const date = "Sep 8, 2026 · Mexico City · 8:00 PM"
  const mood = { label: "Transitional", emoji: "🌊", sub: "Processing & reaching" }
  const insight = "Your last few hours moved between Agnes Obel's dark introspection and Olivia Rodrigo's melancholy, then pivoted hard into EDM and Latin dance — a classic emotional push-pull. You're processing something, but also actively reaching for energy to move through it."

  const tracks = [
    { name: "what's wrong with me", artist: "Olivia Rodrigo & Robert Smith", vibe: "Sad", color: "#f472b6", bg: "#2d1a26" },
    { name: "Familiar", artist: "Agnes Obel", vibe: "Dark", color: "#a78bfa", bg: "#1e1a2e" },
    { name: "Doesn't Just Happen", artist: "James Blake & Dave", vibe: "Grime", color: "#94a3b8", bg: "#1a1e26" },
    { name: "Manhattan", artist: "Carlita & SOFI TUKKER", vibe: "House", color: "#34d399", bg: "#0d2418" },
    { name: "FADE AWAY", artist: "San Holo & Tisoki", vibe: "EDM", color: "#1DB954", bg: "#0d2016" },
    { name: "Te Estoy Correteando", artist: "LATIN MAFIA & Fred again..", vibe: "Latin", color: "#fb923c", bg: "#2a1a0d" },
  ]

  const meters = [
    { label: "Energy",       value: 58, color: "#1DB954" },
    { label: "Valence",      value: 42, color: "#a78bfa" },
    { label: "Danceability", value: 68, color: "#34d399" },
  ]

  const cards = [
    { icon: "🏃", title: "Zone 2 Run", desc: "A 20–30 min easy-pace run matches the mixed energy in your listening. Not a sprint — let the body settle while the mind untangles.", cta: "Lace up", primary: false, link: null },
    { icon: "🌬️", title: "Box Breathing", desc: "4 sec inhale, 4 hold, 4 exhale, 4 hold. Repeat 6 times. Bridges the emotional and energetic contrast in today's session.", cta: "Start 4 min now", primary: false, link: null },
    { icon: "🎧", title: "Daily Mood Playlist", desc: "Curated to match your transitional state — flows from introspective into momentum-building.", cta: "Open in Spotify", primary: true, link: "https://open.spotify.com/playlist/294GQpveapLix5cOdGWOru" },
    { icon: "📝", title: "Journal 10 min", desc: "Dump the emotional weight before it loops. No structure needed — just open stream of thought from what Agnes Obel and Olivia surfaced.", cta: "Open notes", primary: false, link: null },
  ]

  const journalPrompt = "What feeling kept coming back today that you kept trying to outrun with a faster song? What is it actually about?"
  const quote = { text: "The wound is the place where the Light enters you.", author: "Rumi" }
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', -apple-system, sans-serif; background: #0d0d0d; color: #f0f0f0; }
        .page  { width: 100%; padding: 24px 16px 48px; }
        .inner { max-width: 1100px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 28px; }
        .greeting h1 { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.2; }
        .greeting p  { font-size: 11px; color: #555; margin-top: 5px; }
        .mood-badge  { background: #181818; border: 1px solid #2a2a2a; border-radius: 14px; padding: 10px 14px; text-align: center; flex-shrink: 0; min-width: 100px; }
        .mood-badge .emoji      { font-size: 22px; line-height: 1; }
        .mood-badge .mood-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #1DB954; margin-top: 5px; }
        .mood-badge .mood-sub   { font-size: 9px; color: #555; margin-top: 2px; }
        .insight { font-size: 13px; color: #aaa; line-height: 1.65; border-left: 3px solid #1DB954; padding-left: 12px; margin-bottom: 18px; }
        .slabel { font-size: 9px; text-transform: uppercase; letter-spacing: 1.4px; color: #555; margin-bottom: 10px; font-weight: 700; }
        .card { background: #161616; border: 1px solid #222; border-radius: 14px; padding: 16px 18px; margin-bottom: 14px; }
        .meter-row   { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .meter-label { font-size: 12px; color: #aaa; width: 90px; flex-shrink: 0; }
        .meter-bar   { flex: 1; height: 5px; background: #2a2a2a; border-radius: 100px; overflow: hidden; }
        .meter-fill  { height: 100%; border-radius: 100px; }
        .meter-val   { font-size: 12px; font-weight: 600; width: 34px; text-align: right; flex-shrink: 0; }
        .track-row    { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 9px 0; border-bottom: 1px solid #1e1e1e; }
        .track-row:last-child { border-bottom: none; }
        .track-name   { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .track-artist { font-size: 11px; color: #666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .vibe-tag     { font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 100px; white-space: nowrap; flex-shrink: 0; }
        .w-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
        .w-card { background: #161616; border: 1px solid #222; border-radius: 14px; padding: 14px; display: flex; flex-direction: column; gap: 5px; }
        .w-card.primary { background: #0d2016; border-color: #1DB954; }
        .w-icon  { font-size: 22px; margin-bottom: 3px; }
        .w-title { font-size: 13px; font-weight: 700; }
        .w-desc  { font-size: 11px; color: #777; line-height: 1.5; flex-grow: 1; }
        .w-cta   { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 6px; text-decoration: none; }
        a.w-cta-btn { display: inline-block; background: #1DB954; color: #000; font-size: 11px; font-weight: 700; padding: 7px 12px; border-radius: 100px; text-decoration: none; text-align: center; margin-top: 8px; }
        .j-label  { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #1DB954; margin-bottom: 8px; }
        .j-prompt { font-size: 13px; color: #ddd; line-height: 1.7; font-style: italic; }
        .quote    { border-left: 3px solid #2a2a2a; padding-left: 16px; margin-top: 4px; }
        .quote p  { font-size: 12px; color: #555; line-height: 1.7; font-style: italic; }
        .quote span { font-size: 11px; color: #3a3a3a; display: block; margin-top: 5px; }
        .footer { font-size: 10px; color: #333; text-align: center; margin-top: 24px; }
        .section { margin-bottom: 18px; }
        @media (min-width: 768px) {
          .page { padding: 40px 32px 64px; }
          .greeting h1 { font-size: 30px; }
          .greeting p  { font-size: 13px; }
          .mood-badge  { padding: 12px 20px; min-width: 130px; }
          .mood-badge .emoji      { font-size: 28px; }
          .mood-badge .mood-label { font-size: 10px; }
          .mood-badge .mood-sub   { font-size: 10px; }
          .insight { font-size: 14px; }
          .desktop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
          .track-name { font-size: 14px; }
          .track-artist { font-size: 12px; }
          .w-title { font-size: 14px; }
          .w-desc  { font-size: 12px; }
          .w-icon  { font-size: 26px; }
          .j-prompt { font-size: 14px; }
          .meter-label { font-size: 13px; }
          .meter-val   { font-size: 13px; }
        }
        @media (min-width: 1100px) { .greeting h1 { font-size: 34px; } }
      `}</style>
      <div className="page">
        <div className="inner">
          <div className="header">
            <div className="greeting">
              <h1>Good morning, Ivan <span style={{color:"#1DB954"}}>·</span></h1>
              <p>{date}</p>
            </div>
            <div className="mood-badge">
              <div className="emoji">{mood.emoji}</div>
              <div className="mood-label">{mood.label}</div>
              <div className="mood-sub">{mood.sub}</div>
            </div>
          </div>
          <p className="insight">{insight}</p>
          <div className="desktop-grid">
            <div>
              <div className="section">
                <div className="slabel">Sonic Signature</div>
                <div className="card">
                  {meters.map((m,i) => (
                    <div className="meter-row" key={i}>
                      <span className="meter-label">{m.label}</span>
                      <div className="meter-bar"><div className="meter-fill" style={{width:`${m.value}%`, background:m.color}} /></div>
                      <span className="meter-val" style={{color:m.color}}>{m.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="section">
                <div className="slabel">Last 24h · Key Tracks</div>
                <div className="card" style={{padding:"6px 18px"}}>
                  {tracks.map((t,i) => (
                    <div className="track-row" key={i}>
                      <div style={{overflow:"hidden", flex:1}}>
                        <div className="track-name">{t.name}</div>
                        <div className="track-artist">{t.artist}</div>
                      </div>
                      <span className="vibe-tag" style={{background:t.bg, color:t.color}}>{t.vibe}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="section">
                <div className="slabel">📓 Journal Prompt</div>
                <div className="card">
                  <div className="j-label">Today's Question</div>
                  <p className="j-prompt">"{journalPrompt}"</p>
                </div>
              </div>
            </div>
            <div>
              <div className="section">
                <div className="slabel">Today's Wellness Plan</div>
                <div className="w-grid">
                  {cards.map((c,i) => (
                    <div className={`w-card${c.primary?" primary":""}`} key={i}>
                      <div className="w-icon">{c.icon}</div>
                      <div className="w-title">{c.title}</div>
                      <div className="w-desc">{c.desc}</div>
                      {c.link
                        ? <a href={c.link} target="_blank" rel="noopener noreferrer" className="w-cta-btn">{c.cta}</a>
                        : <span className="w-cta" style={{color:"#444"}}>{c.cta} →</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
              <div className="quote">
                <p>"{quote.text}"</p>
                <span>— {quote.author}</span>
              </div>
            </div>
          </div>
          <p className="footer">Updated hourly by Hela · Spotify Studio · This content was generated using AI.</p>
        </div>
      </div>
    </>
  )
}
