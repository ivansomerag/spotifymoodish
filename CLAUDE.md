# Spotify Moodish (Morning Wellness — Ivan)

Dashboard diario de bienestar emocional y musical retro-futurista (*Analog Emotional OS*), impulsado por el análisis de escucha de Spotify y actualizado periódicamente por **Hela** (`hela@studio.spotify`).

---

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 15.1.9](https://nextjs.org/) (App Router)
- **Librería UI**: [React 19](https://react.dev/) / React DOM 19
- **Lenguaje**: [TypeScript 5](https://www.typescriptlang.org/)
- **Estilos**: Vanilla CSS / CSS-in-JS inline + Google Fonts (`Inter`, `Space Grotesk`, `Share Tech Mono`, `Orbitron`)
- **Gráficos**: WebGL GLSL Shaders en Canvas (`components/ui/shader-background.tsx`)
- **PWA**: Progressive Web App Standalone (`public/manifest.json`, `public/sw.js`)

---

## 🚀 Comandos Rápidos

```bash
# Entorno Node (v20+ en macOS via nvm si aplica)
export PATH="$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -n 1)/bin:/opt/homebrew/bin:$PATH"

# Desarrollo (corre en http://localhost:3000)
npm run dev

# Compilación de producción (TypeScript + empaquetado)
npm run build

# Servidor de producción local
npm run start
```

---

## 📂 Estructura del Proyecto

```text
spotifymoodish/
├── app/
│   ├── layout.tsx         # Root Layout: PWA meta tags, viewport, suppressHydrationWarning
│   ├── page.tsx           # Componente principal: 4 pestañas, dial VU, audio state, estilos inline
│   └── globals.css        # Resets globales básicos
├── components/
│   └── ui/
│       └── shader-background.tsx  # Fondo WebGL interactivo con paleta synthwave plasma
├── public/
│   ├── manifest.json      # Web App Manifest para modo standalone en Chrome
│   ├── sw.js              # Service worker ligero para soporte PWA
│   ├── moodish-logo.png   # Logo principal tocadiscos de vinilo
│   ├── logo.png           # Ícono complementario
│   └── *.svg / *.jpg      # Placeholders adicionales
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración de TypeScript
├── next.config.mjs        # Configuración de Next.js
└── CLAUDE.md              # Documentación centralizada del proyecto
```

---

## 🎨 Sistema de Diseño y Filosofía Visual

### 1. Dark Liquid Glass (Cristal Líquido Oscuro — Cero Blur)
- **Sin desenfoque**: **NO usar** `backdrop-filter: blur(...)` en las tarjetas. El usuario solicitó expresamente que el fondo de plasma WebGL y las líneas fluyan libremente a través de las tarjetas.
- **Translucidez oscura**: Fondo en gradiente oscuro ahumado de alto contraste:
  ```css
  background: linear-gradient(135deg, rgba(16,28,48,0.78) 0%, rgba(8,15,28,0.80) 50%, rgba(3,7,16,0.86) 100%);
  border: 1px solid rgba(0,229,255,0.28);
  box-shadow: 0 10px 36px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.6), 0 0 20px rgba(0,229,255,0.08);
  ```
- **Reflejos especulares**: Reflejo de cristal superior con `inset 0 1px 1px rgba(255,255,255,0.2)` para sensación de vidrio líquido táctil.

### 2. Estética Retro CRT TV y VHS
- **Scanlines fijas (`.crt-scanlines`)**: Trama de líneas raster de 3px con opacidad calibrada (0.85).
- **Barrido catódico (`.crt-beam`)**: Barrido amplio descendente cada 6s–8s con gradiente cian/blanco/magenta.
- **Línea de estática sutil (`.retro-static-line` + `.retro-static-band`)**: Línea fina (2px) con opacidad suave (55%) y banda de ruido de tracking analógico (28%) que emula la sincronía vertical de un televisor analógico vintage.
- **Viñeta CRT (`.crt-vignette`)**: Sombreado radial perimetral para efecto de pantalla de tubo bombada.
- **HUD Corners (`.hud-corner`)**: Marcadores en las 4 esquinas de cada tarjeta (`hud-tl`, `hud-tr`, `hud-bl`, `hud-br`).

### 3. Dial Emocional / VU Meter (Confinamiento Circular)
- El círculo del Mood Score cuenta con un contenedor geométricamente acotado:
  ```tsx
  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
  width: 110, height: 110, borderRadius: "50%", overflow: "hidden"
  ```
- El subtítulo (`mood.sub`) tiene `maxWidth: 90px`, `WebkitLineClamp: 2`, y salto de línea para asegurar que **nunca toque ni se salga del arco circular**.

### 4. PWA Standalone (Instalable en Chrome)
- Configurado con `"display": "standalone"` en `manifest.json` y meta tags en `app/layout.tsx`.
- Al instalarse como app o crear un acceso directo en Chrome marcando *"Abrir como ventana"*, la app corre a pantalla completa **sin barra de direcciones ni controles de navegación del navegador**.
- Incluye botón `⚡ INSTALAR` en la barra OSD superior y tarjeta informativa con modal de ayuda en la pestaña **Profile**.

---

## 📑 Pestañas de la Aplicación

1. **Today (`tab === "today"`)**:
   - Saludo dinámico según hora (`greeting`) y fecha actual.
   - Tarjeta de estado de audio (`Audio State`).
   - Dial Emocional / Medidor VU con Mood Score y gauge de sintonización analógica.
   - Celdas de telemetría: *Valence*, *Energía*, *Dance*.
   - Diagnóstico de flujo emocional (`Emotional Flow`).
   - Ecualizador de firma sonora con barras LED segmentadas (`Sonic Signature`).
2. **Music (`tab === "music"`)**:
   - Reproductor tocadiscos con logo halftone que gira a 33 RPM (animación pausible al hacer clic).
   - Ecualizador dinámico de ondas de audio.
   - Botón directo para reproducir la playlist en Spotify.
   - Bitácora de pistas (*Last 24h Track Log*) con enlaces directos a cada canción en Spotify y tags de vibra.
3. **Wellness (`tab === "wellness"`)**:
   - Protocolos interactivos marcables como completados (`done-card`).
   - Bitácora de reflexión personal (*Journal Prompt*).
   - Cita de inspiración diaria.
4. **Profile (`tab === "profile"`)**:
   - Snapshot del estado emocional actual con avatar de emoji en marco neón.
   - Rejilla de métricas: *Energy*, *Valence*, *Danceability*, *Mood Score*.
   - Mezcla de vibras del día (*Today's Vibe Mix*).
   - Tarjeta de instalación y modo Standalone de Chrome.
   - Tarjeta **HELA AI Assistant**: botón que abre `projects/hela` (asistente de IA local, otro proyecto de este workspace) en pestaña nueva vía `window.open`. Acento violeta, deliberadamente distinto del cyan/verde del resto para no confundirse con el bot **Hela** (el que actualiza mood data, footer de esta misma tab) — mismo nombre, cosas distintas. URL viene de `NEXT_PUBLIC_HELA_URL` (env var); botón se deshabilita si no está seteada. Ver plan completo en `/Users/ivan/.claude/plans/okay-claude-quiero-que-abstract-walrus.md`.

---

## 🔄 Flujo de Trabajo y Colaboración

- **Rama principal**: `main` en `https://github.com/ivansomerag/spotifymoodish.git`.
- **Actualizaciones de Hela**: Un bot/agente externo (`Hela <hela@studio.spotify>`) actualiza periódicamente los datos emocionales, canciones y bitácoras con commits automáticos (`Mood update — ...`).
- **Regla de oro**: **No eliminar ni desfasar los datos dinámicos actualizados por Hela** al realizar ajustes de diseño. Siempre hacer `git fetch` y `git rebase origin/main` antes de realizar push para mantener el historial lineal y limpio.

---

## 📌 Estado Actual

- **Último Commit local**: `15762a8` (*Add HELA AI assistant launcher to Profile tab*) — **committeado pero NO pusheado todavía**, a propósito (repo con deploy automático a Vercel; se retiene el push hasta tener la URL final de HELA).
- **Compilación**: 100% limpia (`npm run build` con 0 errores de TypeScript y linting).
- **Repositorio**: `origin/main` tiene el commit `d6a007b` como último; hay 1 commit local sin pushear (ver Próximos Pasos).

## 🧠 Próximos pasos

> Actualizar esta sección cada vez que se complete una tarea relacionada.

- [ ] **Pendiente (tú)**: correr HELA + Cloudflare Tunnel localmente (ver `projects/hela/DEPLOY.md`) y pasarle a Claude la URL `*.trycloudflare.com`.
- [ ] Con la URL: Claude setea `NEXT_PUBLIC_HELA_URL` en Vercel (Settings → Environment Variables).
- [ ] Claude hace `git push` del commit `15762a8` (botón HELA AI) — retenido hasta este punto.
- [ ] Verificar en producción: sitio deployado en Vercel, tab Profile, botón abre la URL del tunnel, login gate de HELA aparece.
