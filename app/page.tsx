export default function WellnessDashboard() {
  const date = "Monday, September 8 · Mexico City · 6:00 AM";
  const mood = { label: "Transitional", emoji: "🌗", sub: "processing & reaching" };
  const insight =
    "Your night moved between Twenty One Pilots' emotional rock and waves of EDM and Latin dance — a pattern of feeling things deeply, then chasing energy to move through them. You're not stuck; you're in motion.";
  const tracks = [
    { name: "Nico and the Niners", artist: "Twenty One Pilots", vibe: "Emotional", color: "#a78bfa", bg: "#1e1333" },
    { name: "FADE AWAY", artist: "San Holo & Tisoki", vibe: "Energetic", color: "#34d399", bg: "#0d2620" },
    { name: "Doesn't Just Happen", artist: "James Blake & Dave", vibe: "Melancholic", color: "#60a5fa", bg: "#0d1a2e" },
    { name: "deja vu", artist: "Olivia Rodrigo", vibe: "Sad", color: "#f472b6", bg: "#2a0f1e" },
    { name: "Manhattan", artist: "Carlita & SOFI TUKKER", vibe: "Dance", color: "#1DB954", bg: "#0d2016" },
    { name: "Te Estoy Correteando", artist: "LATIN MAFIA & Fred again..", vibe: "Upbeat", color: "#fbbf24", bg: "#2a1f00" },
  ];
  const meters = [
    { label: "Energy", value: 62, color: "#1DB954" },
    { label: "Valence", value: 48, color: "#a78bfa" },
    { label: "Danceability", value: 65, color: "#34d399" },
  ];
  const cards = [
    {
      icon: "🏃",
      title: "Run It Out",
      desc: "30-min run at easy pace. Let the EDM playlist carry you — your body knows what to do when the music kicks in.",
      cta: "Set a reminder",
      primary: false,
    },
    {
      icon: "🌬️",
      title: "4-7-8 Breathing",
      desc: "4 cycles before you check your phone. Inhale 4, hold 7, exhale 8. Drops cortisol fast when you're mid-transition.",
      cta: "Start now",
      primary: false,
    },
    {
      icon: "🎧",
      title: "Daily Mood Playlist",
      desc: "Updated this morning based on your listening patterns — transitional tracks that match where you are and lift you forward.",
      cta: "Open in Spotify",
      primary: true,
      link: "https://open.spotify.com/playlist/294GQpveapLix5cOdGWOru",
    },
    {
      icon: "📓",
      title: "Journal Prompt",
      desc: "Five minutes, no filter. See the prompt below.",
      cta: "Read prompt",
      primary: false,
    },
  ];
  const journalPrompt =
    "You listened to Twenty One Pilots four times last night — songs about identity, fear, and choosing to keep going. What are you working through right now that you haven't said out loud yet? Write it down, even if it's messy.";
  const quote = {
    text: "The bravest thing I ever did was continuing my life when I wanted to die.",
    author: "Juliette Lewis",
  };

  return (
    <div
      style={{
        background: "#0d0d0d",
        minHeight: "100vh",
        color: "#f0f0f0",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "0",
        margin: "0",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          padding: "24px 20px 48px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <p style={{ color: "#888", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
            {date}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <span style={{ fontSize: "36px", lineHeight: 1 }}>{mood.emoji}</span>
            <div>
              <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700, color: "#f0f0f0", lineHeight: 1.1 }}>
                {mood.label}
              </h1>
              <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>{mood.sub}</p>
            </div>
          </div>
          <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#ccc", margin: "12px 0 0", borderLeft: "3px solid #1DB954", paddingLeft: "12px" }}>
            {insight}
          </p>
        </div>

        {/* Mood Meters */}
        <div
          style={{
            background: "#161616",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "20px",
            border: "1px solid #222",
          }}
        >
          <p style={{ margin: "0 0 16px", fontSize: "11px", color: "#666", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Sonic Signature
          </p>
          {meters.map((m) => (
            <div key={m.label} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", color: "#aaa" }}>{m.label}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: m.color }}>{m.value}%</span>
              </div>
              <div style={{ background: "#222", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
                <div
                  style={{
                    width: `${m.value}%`,
                    height: "100%",
                    background: m.color,
                    borderRadius: "100px",
                    transition: "width 0.8s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Track Vibes */}
        <div
          style={{
            background: "#161616",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "20px",
            border: "1px solid #222",
          }}
        >
          <p style={{ margin: "0 0 16px", fontSize: "11px", color: "#666", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Last 24h · Key Tracks
          </p>
          {tracks.map((t) => (
            <div
              key={t.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #1e1e1e",
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: 500, color: "#f0f0f0" }}>{t.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#777" }}>{t.artist}</p>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: t.color,
                  background: t.bg,
                  padding: "3px 10px",
                  borderRadius: "100px",
                  whiteSpace: "nowrap",
                  marginLeft: "12px",
                }}
              >
                {t.vibe}
              </span>
            </div>
          ))}
        </div>

        {/* Wellness Cards */}
        <p style={{ margin: "0 0 14px", fontSize: "11px", color: "#666", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Today's Wellness Plan
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
          {cards.map((c) => (
            <div
              key={c.title}
              style={{
                background: c.primary ? "#0d2016" : "#161616",
                borderRadius: "14px",
                padding: "16px",
                border: c.primary ? "1px solid #1DB954" : "1px solid #222",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: "22px", marginBottom: "8px" }}>{c.icon}</span>
              <p style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: 600, color: "#f0f0f0" }}>{c.title}</p>
              <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#888", lineHeight: "1.5", flex: 1 }}>{c.desc}</p>
              {c.primary && c.link ? (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    background: "#1DB954",
                    color: "#000",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "7px 12px",
                    borderRadius: "100px",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  {c.cta}
                </a>
              ) : (
                <span
                  style={{
                    fontSize: "11px",
                    color: "#555",
                    fontWeight: 600,
                  }}
                >
                  {c.cta} →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Journal Prompt */}
        <div
          style={{
            background: "#161616",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "20px",
            border: "1px solid #222",
          }}
        >
          <p style={{ margin: "0 0 10px", fontSize: "11px", color: "#666", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            📓 Journal Prompt
          </p>
          <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.7", color: "#ddd", fontStyle: "italic" }}>
            "{journalPrompt}"
          </p>
        </div>

        {/* Quote */}
        <div
          style={{
            borderLeft: "3px solid #333",
            paddingLeft: "16px",
            marginBottom: "32px",
          }}
        >
          <p style={{ margin: "0 0 6px", fontSize: "14px", lineHeight: "1.6", color: "#999", fontStyle: "italic" }}>
            "{quote.text}"
          </p>
          <p style={{ margin: 0, fontSize: "12px", color: "#555" }}>— {quote.author}</p>
        </div>

        {/* Footer */}
        <p style={{ margin: 0, fontSize: "11px", color: "#444", textAlign: "center" }}>
          Generated by Hela · Spotify Studio · This content was generated using AI.
        </p>
      </div>
    </div>
  );
}
