# 🎈 Feliz Cumpleaños, Nemo

Una landing page cumpleañera con un mini-juego de globos: se tocan/clickean los 12 globos
hasta reventarlos todos y ahí se revela el mensaje final con confeti.

No usa frameworks ni instalaciones: es HTML + CSS + JS puro. Se puede abrir directamente
en el navegador o publicar gratis con GitHub Pages.

## Archivos

- `index.html` — estructura de las 3 pantallas (intro, juego, mensaje final)
- `style.css` — estética pastel/aesthetic, animaciones, responsive
- `script.js` — lógica del juego, confeti y sonido (todo generado en código, sin archivos externos)

## Cómo personalizarlo

Todo lo editable está arriba de todo en `script.js`, en el objeto `CONFIG`:

```js
const CONFIG = {
  introTitle: "Feliz Cumpleaños,<br>Nemo",
  introSubtitle: "Explotá todos los globos para descubrir tu sorpresa ✨",
  finalMessage: "¡Feliz cumple! Te amamos 💕",
  finalSubmessage: "Tu regalo está en MP 🎁",
  balloonCount: 12,
  balloonColors: ["#d9c9f2", "#ffb199", "#c3f0e1", "#f6cf72", "#f7b8d0", "#b7d8f7"]
};
```

No hace falta tocar nada más para cambiar el texto, la cantidad de globos o los colores.

## Probarlo antes de publicar

Simplemente abrí `index.html` con doble click (o "Abrir con" → tu navegador). Funciona
sin conexión, salvo por las tipografías de Google Fonts (si no hay internet, usa una
tipografía de reemplazo, no se rompe nada).

## Publicarlo gratis con GitHub Pages

Ver la guía paso a paso en el chat, o resumido:

1. Creá un repositorio nuevo en GitHub (público).
2. Subí estos 4 archivos (Add file → Upload files).
3. Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / `(root)` → Save.
4. Esperá 1-2 minutos y el link va a aparecer arriba de esa misma página
   (`https://tu-usuario.github.io/nombre-del-repo/`).
