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

  const cards = [
    { icon: "🏃", title: "20-Min Run", desc: "Your danceability is high — that restless energy wants out. Put on something fast and move.", cta: "Start now", primary: true },
    { icon: "🫁", title: "4-7-8 Breathing", desc: "Inhale 4s · hold 7s · exhale 8s. Repeat 4 times. Lowers the emotional static before work.", cta: "5 min", primary: false },
    { icon: "🎵", title: "Daily Mood Playlist", desc: "Updated this morning — starts introspective, lifts toward energy by the end.", cta: "Open on Spotify", primary: false },
    { icon: "☀️", title: "3 Wins from Yesterday", desc: "Write 3 things you did right yesterday. Small counts. Shifts the narrative before it sets.", cta: "5 min", primary: false },
  ]

  const journalPrompt =
    '"What am I trying to outrun by reaching for upbeat music — and what would happen if I sat with the quieter feeling for just five minutes instead?"'

  const quote = {
    text: "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth.",
    author: "Viktor Frankl",
  }
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <main style={{ minHeight: "100vh", padding: "28px 20px 48px", maxWidth: 480, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>
            Good morning, Ivan <span style={{ color: "#1DB954" }}>·</span>
          </h1>
          <p style={{ fontSize: 12, color: "#666", marginTop: 5 }}>{date}</p>
        </div>
        <div style={{ background: "#181818", border: "1px solid #2a2a2a", borderRadius: 14, padding: "10px 16px", textAlign: "center", minWidth: 110 }}>
          <div style={{ fontSize: 24 }}>{mood.emoji}</div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#1DB954", marginTop: 6 }}>{mood.label}</div>
          <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{mood.sub}</div>
        </div>
      </div>

      {/* MOOD ANALYSIS */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.4, color: "#555", marginBottom: 12, fontWeight: 600 }}>Last 24h Listening Analysis</div>
        <div style={{ background: "#181818", border: "1px solid #222", borderRadius: 14, padding: "16px 18px" }}>
          <p style={{ fontSize: 13, color: "#bbb", lineHeight: 1.6, marginBottom: 14 }}>{insight}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tracks.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ overflow: "hidden" }}>
                  <div style={{ fontSize: 12, color: "#ddd", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "#555", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.artist}</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0, background: t.bg, color: t.color }}>{t.vibe}</span>
              </div>
            ))}
          </div>

          {/* METERS */}
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            {meters.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 10, color: "#555", width: 80, flexShrink: 0 }}>{m.label}</span>
                <div style={{ flex: 1, height: 4, background: "#2a2a2a", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${m.value}%`, height: "100%", background: m.color, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 10, color: m.color, width: 32, textAlign: "right", flexShrink: 0 }}>{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WELLNESS CARDS */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.4, color: "#555", marginBottom: 12, fontWeight: 600 }}>Today's Wellness Plan</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {cards.map((c, i) => (
            <div key={i} style={{
              background: c.primary ? "#0f1f14" : "#181818",
              border: `1px solid ${c.primary ? "#1DB954" : "#222"}`,
              borderRadius: 14,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}>
              <div style={{ fontSize: 26 }}>{c.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{c.title}</div>
              <div style={{ fontSize: 11, color: "#777", lineHeight: 1.55, flexGrow: 1 }}>{c.desc}</div>
              <div style={{ fontSize: 10, color: "#1DB954", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginTop: 4 }}>→ {c.cta}</div>
            </div>
          ))}
        </div>
      </div>

      {/* JOURNAL PROMPT */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.4, color: "#555", marginBottom: 12, fontWeight: 600 }}>Journal Prompt</div>
        <div style={{ background: "#181818", border: "1px solid #222", borderRadius: 14, padding: 18 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#1DB954", marginBottom: 10 }}>✏️ Today's Question</div>
          <p style={{ fontSize: 14, color: "#ddd", lineHeight: 1.65, fontStyle: "italic" }}>{journalPrompt}</p>
        </div>
      </div>

      {/* QUOTE */}
      <div style={{ textAlign: "center", padding: "20px 10px 0", borderTop: "1px solid #1e1e1e" }}>
        <p style={{ fontSize: 12, color: "#555", lineHeight: 1.7, fontStyle: "italic" }}>"{quote.text}"</p>
        <span style={{ fontSize: 10, color: "#3a3a3a", display: "block", marginTop: 8 }}>— {quote.author}</span>
      </div>

    </main>
  )
}
