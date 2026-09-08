"use client"

export default function WellnessDashboard() {
  // ── DATA (updated daily by Hela routine) ──────────────────────────────────
  const date = "Monday, September 8 · Mexico City · 6:00 AM"
  const mood = { label: "Transitional", emoji: "🌗", sub: "seeking energy" }
  const insight =
    "You've been oscillating between introspection and energy-seeking. Heavy Twenty One Pilots and James Blake signal you're processing something inward — but you keep reaching for Bruno Mars, ABBA, and dance tracks. That push-pull is the story of your morning."

  const tracks = [
    { name: "Doesn't Just Happen", artist: "James Blake & Dave", vibe: "Melancholic", color: "#a78bfa", bg: "#1e1530" },
    { name: "deja vu", artist: "Olivia Rodrigo", vibe: "Sad", color: "#818cf8", bg: "#1a1a30" },
    { name: "Intentions / RAWFEAR", artist: "Twenty One Pilots", vibe: "Emotional", color: "#818cf8", bg: "#1a1a30" },
    { name: "I Just Might (Austin Millz Remix)", artist: "Bruno Mars", vibe: "Upbeat", color: "#4ade80", bg: "#1e2a14" },
    { name: "Manhattan", artist: "Carlita & SOFI TUKKER", vibe: "Dance", color: "#fbbf24", bg: "#1e1a10" },
    { name: "Got Away", artist: "Subtronics & ILLENIUM", vibe: "Energetic", color: "#fb923c", bg: "#2a1e10" },
  ]

  const meters = [
    { label: "Energy", value: 58, color: "#1DB954" },
    { label: "Valence", value: 44, color: "#a78bfa" },
    { label: "Danceability", value: 67, color: "#fbbf24" },
  ]

  const playlistUrl = "https://open.spotify.com/playlist/294GQpveapLix5cOdGWOru"

  const cards = [
    { icon: "🏃", title: "20-Min Run", desc: "Your danceability is high — that restless energy wants out. Put on something fast and move.", cta: "Start now", primary: true, link: null },
    { icon: "🫁", title: "4-7-8 Breathing", desc: "Inhale 4s · hold 7s · exhale 8s. Repeat 4 times. Lowers the emotional static before work.", cta: "5 min", primary: false, link: null },
    { icon: "🎵", title: "Daily Mood Playlist", desc: "Updated this morning — starts introspective, lifts toward energy by the end.", cta: "Open on Spotify", primary: false, link: playlistUrl },
    { icon: "☀️", title: "3 Wins from Yesterday", desc: "Write 3 things you did right yesterday. Small counts. Shifts the narrative before it sets.", cta: "5 min", primary: false, link: null },
  ]

  const journalPrompt =
    '"What am I trying to outrun by reaching for upbeat music — and what would happen if I sat with the quieter feeling for just five minutes instead?"'

  const quote = {
    text: "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth.",
    author: "Viktor Frankl",
  }
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', sans-serif;
          background: #0d0d0d;
          color: #f0f0f0;
          min-height: 100vh;
        }

        .page {
          width: 100%;
          min-height: 100vh;
          padding: 24px 16px 48px;
        }

        .inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* HEADER */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
          gap: 12px;
        }

        .greeting h1 {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .greeting p {
          font-size: 11px;
          color: #555;
          margin-top: 5px;
        }

        .mood-badge {
          background: #181818;
          border: 1px solid #2a2a2a;
          border-radius: 14px;
          padding: 10px 14px;
          text-align: center;
          flex-shrink: 0;
          min-width: 100px;
        }

        .mood-badge .emoji { font-size: 22px; line-height: 1; }
        .mood-badge .mood-label {
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1.2px;
          color: #1DB954; margin-top: 5px;
        }
        .mood-badge .mood-sub { font-size: 9px; color: #555; margin-top: 2px; }

        /* SECTION LABEL */
        .section-label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1.4px;
          color: #555;
          margin-bottom: 10px;
          font-weight: 700;
        }

        /* CARDS */
        .card {
          background: #181818;
          border: 1px solid #222;
          border-radius: 14px;
          padding: 16px;
        }

        /* MOOD SECTION */
        .mood-insight {
          font-size: 12px;
          color: #999;
          line-height: 1.65;
          margin-bottom: 14px;
        }

        .track-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 7px;
        }

        .track-name { font-size: 12px; color: #ddd; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .track-artist { font-size: 10px; color: #555; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .vibe-tag {
          font-size: 9px; font-weight: 700;
          padding: 3px 9px; border-radius: 20px;
          white-space: nowrap; flex-shrink: 0;
          letter-spacing: 0.3px;
        }

        .meter-row {
          display: flex; align-items: center; gap: 10px; margin-top: 8px;
        }
        .meter-label { font-size: 10px; color: #555; width: 80px; flex-shrink: 0; }
        .meter-bar { flex: 1; height: 4px; background: #2a2a2a; border-radius: 4px; overflow: hidden; }
        .meter-fill { height: 100%; border-radius: 4px; }
        .meter-value { font-size: 10px; width: 30px; text-align: right; flex-shrink: 0; }

        /* WELLNESS CARDS GRID */
        .wellness-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .wellness-card {
          background: #181818;
          border: 1px solid #222;
          border-radius: 14px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          transition: border-color 0.2s;
        }

        .wellness-card.primary {
          background: #0f1f14;
          border-color: #1DB954;
        }

        .wellness-card .w-icon { font-size: 24px; margin-bottom: 3px; }
        .wellness-card .w-title { font-size: 13px; font-weight: 700; }
        .wellness-card .w-desc { font-size: 11px; color: #777; line-height: 1.5; flex-grow: 1; }
        .wellness-card .w-cta { font-size: 9px; color: #1DB954; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 6px; }

        /* JOURNAL */
        .journal-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #1DB954; margin-bottom: 8px; }
        .journal-prompt { font-size: 13px; color: #ddd; line-height: 1.65; font-style: italic; }

        /* QUOTE */
        .quote { text-align: center; padding: 20px 10px 0; border-top: 1px solid #1e1e1e; margin-top: 4px; }
        .quote p { font-size: 11px; color: #555; line-height: 1.7; font-style: italic; }
        .quote span { font-size: 10px; color: #3a3a3a; display: block; margin-top: 6px; }

        .section { margin-bottom: 18px; }
        .green { color: #1DB954; }

        /* ── DESKTOP LAYOUT ── */
        @media (min-width: 768px) {
          .page { padding: 40px 32px 64px; }

          .greeting h1 { font-size: 30px; }
          .greeting p { font-size: 13px; }
          .mood-badge { padding: 12px 20px; min-width: 130px; }
          .mood-badge .emoji { font-size: 28px; }
          .mood-badge .mood-label { font-size: 10px; }
          .mood-badge .mood-sub { font-size: 10px; }

          .desktop-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            align-items: start;
          }

          .desktop-left {}
          .desktop-right {}

          .wellness-grid {
            grid-template-columns: 1fr 1fr;
          }

          .wellness-card .w-title { font-size: 14px; }
          .wellness-card .w-desc { font-size: 12px; }
          .wellness-card .w-icon { font-size: 28px; }

          .mood-insight { font-size: 13px; }
          .track-name { font-size: 13px; }
          .track-artist { font-size: 11px; }
          .journal-prompt { font-size: 14px; }
          .quote p { font-size: 12px; }
          .section-label { font-size: 10px; }
        }

        @media (min-width: 1100px) {
          .greeting h1 { font-size: 34px; }
        }
      `}</style>

      <div className="page">
        <div className="inner">

          {/* HEADER */}
          <div className="header">
            <div className="greeting">
              <h1>Good morning, Ivan <span className="green">·</span></h1>
              <p>{date}</p>
            </div>
            <div className="mood-badge">
              <div className="emoji">{mood.emoji}</div>
              <div className="mood-label">{mood.label}</div>
              <div className="mood-sub">{mood.sub}</div>
            </div>
          </div>

          {/* DESKTOP: two-column grid / MOBILE: single column */}
          <div className="desktop-grid">

            {/* LEFT COL — Mood Analysis */}
            <div className="desktop-left">
              <div className="section">
                <div className="section-label">Last 24h Listening Analysis</div>
                <div className="card">
                  <p className="mood-insight">{insight}</p>

                  {tracks.map((t, i) => (
                    <div className="track-row" key={i}>
                      <div style={{ overflow: "hidden", flex: 1 }}>
                        <div className="track-name">{t.name}</div>
                        <div className="track-artist">{t.artist}</div>
                      </div>
                      <span className="vibe-tag" style={{ background: t.bg, color: t.color }}>{t.vibe}</span>
                    </div>
                  ))}

                  <div style={{ marginTop: 14 }}>
                    {meters.map((m, i) => (
                      <div className="meter-row" key={i}>
                        <span className="meter-label">{m.label}</span>
                        <div className="meter-bar">
                          <div className="meter-fill" style={{ width: `${m.value}%`, background: m.color }} />
                        </div>
                        <span className="meter-value" style={{ color: m.color }}>{m.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Journal — shown below analysis on both mobile and desktop left col */}
              <div className="section">
                <div className="section-label">Journal Prompt</div>
                <div className="card">
                  <div className="journal-label">✏️ Today's Question</div>
                  <p className="journal-prompt">{journalPrompt}</p>
                </div>
              </div>
            </div>

            {/* RIGHT COL — Wellness Plan + Quote */}
            <div className="desktop-right">
              <div className="section">
                <div className="section-label">Today's Wellness Plan</div>
                <div className="wellness-grid">
                  {cards.map((c, i) => (
                    <div className={`wellness-card${c.primary ? " primary" : ""}`} key={i}>
                      <div className="w-icon">{c.icon}</div>
                      <div className="w-title">{c.title}</div>
                      <div className="w-desc">{c.desc}</div>
                      {c.link
                        ? <a href={c.link} target="_blank" rel="noopener noreferrer" className="w-cta" style={{ textDecoration: "none" }}>→ {c.cta}</a>
                        : <div className="w-cta">→ {c.cta}</div>
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
        </div>
      </div>
    </>
  )
}
