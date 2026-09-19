# 🔮 Las Eras de Nemo

Una experiencia interactiva de tarot para el cumpleaños de Nemo: una bruja gitana
mezcla las cartas, después se van revelando 5 cartas (una por una, tocando la
pantalla) con una "lectura" para cada una, y al final aparece el mensaje de
cumpleaños con confeti.

No usa frameworks ni instalaciones: es HTML + CSS + JS puro. Se puede abrir
directamente en el navegador o publicar gratis con GitHub Pages.

Es 100% interactiva: no avanza sola ni es un video. Cada pantalla espera que
la persona toque/clickee para seguir. Y cada vez que alguien entra (o recarga
la página), arranca de cero desde el principio — no queda guardado que ya la
"terminó".

## Archivos

- `index.html` — estructura de las 3 pantallas (la bruja / la tirada / mensaje final)
- `style.css` — estética mística (dorado, violeta oscuro, estrellitas), las manos
  animadas que mezclan las cartas, la animación de flip de las cartas, etc.
- `script.js` — toda la lógica: el efecto de texto que se va escribiendo solo,
  el avance entre pantallas, el confeti y los sonidos (generados en código,
  sin archivos de audio externos)
- `cartas/` — las imágenes de las cartas (¡esta carpeta también hay que subirla
  a GitHub, no son solo los 4 archivos de código!)
  - `dorso.jpg` — el diseño del reverso, se usa para todas las cartas boca abajo
  - `emo.jpg`, `veterinaria.jpg`, `arquitecta.jpg`, `esposos.jpg`, `bebe.jpg` — el
    frente de cada carta, en el orden en que se muestran

## Cómo personalizarlo

Todo el texto está arriba de todo en `script.js`:

```js
const WITCH_INTRO_LINES = [
  // las frases que dice la bruja antes de mostrar las cartas
];

const CARDS = [
  { image: "cartas/emo.jpg", reading: "el texto de la lectura de esa carta" },
  { image: "cartas/veterinaria.jpg", reading: "..." },
  { image: "cartas/arquitecta.jpg", reading: "..." },
  { image: "cartas/esposos.jpg", reading: "..." },
  { image: "cartas/bebe.jpg", reading: "..." },
];

const FINAL = {
  message: "¡Feliz cumpleaños! Veo una vida brillante, con muchas eras más ✨",
  submessage: "Tu regalo está en MP 🎁",
  joke: "(ahre que siempre regalaban lo mismo 😂)",
};
```

Para cambiar el orden de las cartas, el texto de cada lectura, o el mensaje
final, solo hay que editar esas partes — no hace falta tocar nada del resto
del archivo. Si querés reemplazar alguna imagen de carta, guardá la nueva foto
con el mismo nombre dentro de `cartas/` (o cambiá el nombre en `image` de
`CARDS` para que apunte a la nueva).

## Probarlo antes de publicar

Abrí `index.html` con doble click (o "Abrir con" → tu navegador). Funciona sin
conexión, salvo por las tipografías de Google Fonts (si no hay internet, usa
una tipografía de reemplazo, no se rompe nada).

## Publicarlo gratis con GitHub Pages

1. Creá un repositorio nuevo en GitHub (público).
2. Subí `index.html`, `style.css` y `script.js` (Add file → Upload files,
   arrastrando los 3 archivos).
3. Después subí la carpeta `cartas` completa con sus 6 imágenes adentro — si
   arrastrás la carpeta entera al mismo cuadro de "Upload files", GitHub la
   sube respetando la subcarpeta automáticamente (no hace falta crearla a mano).
4. Confirmá el commit ("Commit changes").
5. Andá a Settings → Pages → Source: "Deploy from a branch" → Branch: `main`
   / `(root)` → Save.
6. Esperá 1-2 minutos y el link va a aparecer arriba de esa misma página
   (`https://tu-usuario.github.io/nombre-del-repo/`).

Importante: si en algún momento actualizás algún archivo y el cambio no se ve
reflejado, probá en una ventana de incógnito o borrando la caché — a veces
tarda un rato en actualizarse el link publicado.
