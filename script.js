/* =========================================================
   🔮 LAS ERAS DE NEMO — CONFIGURACIÓN
   Editá los textos acá. No hace falta tocar nada más abajo.
   ========================================================= */

// Lo que dice la bruja al principio, una línea a la vez
// (se va escribiendo letra por letra; tocando la pantalla se avanza)
const WITCH_INTRO_LINES = [
  "Ehh... vos debés ser Nemo... sentate, sentate, no tengas miedo, que yo no muerdo... a menos que la carta lo pida.",
  "Dejame estas manos quietas un segundo... no hace falta que me cuentes nada, ¿eh? El tarot ya sabe. El tarot siempre sabe.",
  "Vení... dejame adivinar tu pasado. Carta por carta, todo lo que fuiste y lo que el universo todavía no te perdonó...",
  "Ay, m'ija... esta primera ya me está hablando fuerte. Vamos a ver qué tenemos acá..."
];

// Las cartas de la tirada, en orden
const CARDS = [
  {
    image: "cartas/emo.jpg",
    reading:
      "Ay nena... ¿y ese jopo que te tapa medio ojo? Dejame adivinar... esta carta me habla de una época MUY oscura. Y cuando digo oscura, digo TODO negro: la ropa, el delineador, el alma.\n\n" +
      "Te veo con un delineador que rendía cuentas directamente a Avril Lavigne, escribiendo poesía en un cuaderno que vos misma titulaste 'TRAGIC' — con mayúsculas, porque el sufrimiento merece destacarse. Un murciélago lloraba a tu lado. Había cadenas tiradas por el piso y alfileres de gancho usados como accesorio de moda, no como imperdibles comunes y corrientes.\n\n" +
      "Nadie te entendía. El mundo era cruel. Y la única que realmente comprendía tu dolor tenía una corbata sobre una remera y le cantaba 'complicated' a la vida entera.\n\n" +
      "Esta carta te condena para siempre: hoy podés ser lo que sea, pero el día que suene 'Complicated' en cualquier lado, te vas a saber la letra entera sin pensarlo... y en algún rincón muy en el fondo, todavía vas a querer ponerte delineador hasta las cejas y llorar en una plaza a las 2 de la mañana. 🦇🖤"
  },
  {
    image: "cartas/veterinaria.jpg",
    reading:
      "Veo una bata blanca... veo una etapa TAN específica en la que sabías cosas que ningún humano normal debería saber, tipo cuántos estómagos tiene una vaca o por qué un hámster no puede comer chocolate. Estabas ahí, plena, iluminada, juzgando en silencio a cualquiera que no supiera cuidar bien a su mascota.\n\n" +
      "Y un día, así como llegó, se fue. La dejaste tirada de un día para el otro, sin mensaje de despedida ni nada — como quien corta por WhatsApp y bloquea directamente. Fin de la era. O eso creíste vos.\n\n" +
      "Porque acá está el giro de guion: no importa cuántos años pasen, cuántas carreras nuevas empieces, cuánto crezcas como persona — para el universo, vos sos y vas a ser POR SIEMPRE 'la que sabía de animales'. Te va a llegar un mensaje un domingo a las 23hs que diga 'Nemo, urgente, mi erizo tiene como una costrita rara en la pata, ¿vos qué me decís?' — y ahí vas a estar, googleando erizos a las 23:03, preguntándote hace cuánto dejaste la facultad y por qué seguís siendo la veterinaria oficial y no remunerada de todo tu círculo íntimo. Que así sea. 🦔⚕️"
  },
  {
    image: "cartas/arquitecta.jpg",
    reading:
      "Veo una nueva carrera... será...? Dejame concentrarme... veo un estetoscopio, veo una jaula, veo a alguien preguntándote por un hámster otra vez...\n\n" +
      "No, esperá, me estoy confundiendo con la carta anterior. A ver de nuevo... ahí está: planos, escuadras, un casco blanco. ARQUITECTURA. Como quien cambia de canal en la mitad de la novela.\n\n" +
      "Esta carta te regala el poder de mirar cualquier edificio de la calle y opinar 'está mal hecho' con total autoridad. 🏗️📐"
  },
  {
    image: "cartas/esposos.jpg",
    reading:
      "Uy... esperá... veo a un chico. Cara de bueno, mirada noble... un tal... ¿Leito? ¿Leito qué? Dejame enfocar bien la carta...\n\n" +
      "Sí... sí, Leito. Y esta no es de esas cartas que pasan rápido, eh. Este se queda. Se queda un buen rato. Se queda tanto tiempo que un día...\n\n" +
      "¡Ahhh, se casan! Qué lindo, qué lindo es el amor cuando es de verdad. Guardate esta carta, Nemo, que esta es de las buenas. 💍✨"
  },
  {
    image: "cartas/bebe.jpg",
    reading:
      "Y ahora... ahora vamos a dar vuelta la página, querida. Ya no te voy a hablar del pasado — esta carta me tira directo al futuro.\n\n" +
      "Veo... veo biberones. Veo pañales, muchos pañales, una montaña de pañales. Veo noches sin dormir y una canción de cuna que vas a cantar tan mal que ni el bebé la va a poder criticar, porque todavía no dice ni una palabra.\n\n" +
      "Veo un cuartito lleno de cosas chiquitas, ropa que no te vas a poder resistir a comprar, y un amor tan grande que no te va a entrar en el pecho.\n\n" +
      "Se viene una personita nueva a tu vida, Nemo. Y esta carta no miente: va a cambiar todo. Para mejor. 👶🍼"
  }
];

const FINAL = {
  message: "¡Feliz cumpleaños! Veo una vida brillante, con muchas eras más ✨",
  submessage: "Tu regalo está en MP 🎁",
  joke: "(ahre que siempre regalaban lo mismo 😂)"
};

/* =========================================================
   A PARTIR DE ACÁ ES LA LÓGICA. No hace falta tocar esto
   para cambiar textos, colores o cartas.
   ========================================================= */

// ---- referencias del DOM ----
const witchScreen = document.getElementById("witch-screen");
const readingScreen = document.getElementById("reading-screen");
const finalScreen = document.getElementById("final-screen");

const witchTextEl = document.getElementById("witch-text");
const witchHintEl = document.getElementById("witch-hint");

const progressDotsEl = document.getElementById("progress-dots");
const tarotCardEl = document.getElementById("tarot-card");
const tarotFrontImg = document.getElementById("tarot-front-img");
const cardHintEl = document.getElementById("card-hint");
const readingDialogueEl = document.getElementById("reading-dialogue");
const readingTextEl = document.getElementById("reading-text");
const readingHintEl = document.getElementById("reading-hint");

const finalMessageEl = document.getElementById("final-message");
const finalSubmessageEl = document.getElementById("final-submessage");
const finalJokeEl = document.getElementById("final-joke");
const replayBtn = document.getElementById("replay-btn");
const starsEl = document.getElementById("stars");

finalMessageEl.textContent = FINAL.message;
finalSubmessageEl.textContent = FINAL.submessage;
finalJokeEl.textContent = FINAL.joke;

/* ---------------------------------------------------------
   Motor de "máquina de escribir"
   --------------------------------------------------------- */
const typingState = { active: false, skip: false };

function typeText(el, text, speed = 20) {
  return new Promise((resolve) => {
    el.textContent = "";
    let i = 0;
    typingState.active = true;
    typingState.skip = false;

    function step() {
      if (typingState.skip) {
        el.textContent = text;
        typingState.active = false;
        resolve();
        return;
      }
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(step, speed);
      } else {
        typingState.active = false;
        resolve();
      }
    }
    step();
  });
}

function requestSkipOrAdvance(onAdvance) {
  if (typingState.active) {
    typingState.skip = true;
  } else {
    onAdvance();
  }
}

/* ---------------------------------------------------------
   Cambiar de pantalla
   --------------------------------------------------------- */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("is-active"));
  document.getElementById(id).classList.add("is-active");
}

/* ---------------------------------------------------------
   Estrellitas de fondo (decorativas)
   --------------------------------------------------------- */
function createStars() {
  starsEl.innerHTML = "";
  const glyphs = ["✨", "⭐", "🌙"];
  const total = 16;
  for (let i = 0; i < total; i++) {
    const span = document.createElement("span");
    span.className = "star";
    span.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    span.style.left = `${Math.random() * 100}%`;
    span.style.fontSize = `${9 + Math.random() * 14}px`;
    span.style.animationDuration = `${11 + Math.random() * 13}s`;
    span.style.animationDelay = `${Math.random() * 12}s`;
    starsEl.appendChild(span);
  }
}

/* ---------------------------------------------------------
   PANTALLA 1 — La bruja (intro con diálogo tocable)
   --------------------------------------------------------- */
let witchLineIndex = 0;

function startWitchIntro() {
  witchLineIndex = 0;
  witchHintEl.classList.remove("is-visible");
  playWitchLine();
}

async function playWitchLine() {
  witchHintEl.classList.remove("is-visible");
  const line = WITCH_INTRO_LINES[witchLineIndex];
  await typeText(witchTextEl, line, 20);
  witchHintEl.classList.add("is-visible");
}

function advanceWitchIntro() {
  requestSkipOrAdvance(() => {
    witchLineIndex++;
    if (witchLineIndex < WITCH_INTRO_LINES.length) {
      playWitchLine();
    } else {
      startReading();
    }
  });
}

witchScreen.addEventListener("click", advanceWitchIntro);

/* ---------------------------------------------------------
   PANTALLA 2 — La tirada de cartas
   --------------------------------------------------------- */
let cardIndex = 0;
// fases: 'back' (esperando que toque la carta), 'flipping', 'reading' (leyendo el texto)
let cardPhase = "back";

function buildProgressDots() {
  progressDotsEl.innerHTML = "";
  CARDS.forEach(() => {
    const dot = document.createElement("div");
    dot.className = "dot";
    progressDotsEl.appendChild(dot);
  });
}

function updateProgressDots() {
  const dots = progressDotsEl.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("done", i < cardIndex);
    dot.classList.toggle("current", i === cardIndex);
  });
}

function startReading() {
  cardIndex = 0;
  buildProgressDots();
  showScreen("reading-screen");
  setupCurrentCard();
}

function setupCurrentCard() {
  cardPhase = "back";
  updateProgressDots();
  tarotCardEl.classList.remove("flipped");
  tarotFrontImg.src = CARDS[cardIndex].image;
  readingDialogueEl.classList.add("is-hidden");
  readingTextEl.textContent = "";
  readingHintEl.classList.remove("is-visible");
  cardHintEl.classList.add("is-visible");
}

async function flipCurrentCard() {
  cardPhase = "flipping";
  cardHintEl.classList.remove("is-visible");
  tarotCardEl.classList.add("flipped");
  playFlipSound();
  // esperamos a que termine la animación 3D antes de mostrar el texto
  await wait(500);
  readingDialogueEl.classList.remove("is-hidden");
  cardPhase = "reading";
  await typeText(readingTextEl, CARDS[cardIndex].reading, 16);
  readingHintEl.classList.add("is-visible");
}

function advanceReadingScreen() {
  if (cardPhase === "back") {
    flipCurrentCard();
    return;
  }
  if (cardPhase === "reading") {
    requestSkipOrAdvance(() => {
      cardIndex++;
      if (cardIndex < CARDS.length) {
        setupCurrentCard();
      } else {
        showFinal();
      }
    });
  }
}

readingScreen.addEventListener("click", advanceReadingScreen);

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ---------------------------------------------------------
   PANTALLA 3 — Mensaje final
   --------------------------------------------------------- */
function showFinal() {
  showScreen("final-screen");
  confettiRain(3400);
}

replayBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showScreen("witch-screen");
  startWitchIntro();
});

/* ---------------------------------------------------------
   Sonido "flip" sintetizado (sin archivos de audio)
   --------------------------------------------------------- */
let audioCtx = null;
function ensureAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
}

function playFlipSound() {
  if (!audioCtx) return;
  const t0 = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(300, t0);
  osc.frequency.exponentialRampToValueAtTime(500, t0 + 0.15);

  gain.gain.setValueAtTime(0.15, t0);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.2);

  osc.connect(gain).connect(audioCtx.destination);
  osc.start(t0);
  osc.stop(t0 + 0.22);
}

document.body.addEventListener("click", ensureAudio, { once: true });

/* ---------------------------------------------------------
   Confeti (canvas, sin librerías externas)
   --------------------------------------------------------- */
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let confettiRunning = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const confettiColors = ["#e0b559", "#f6d789", "#cbb9d8", "#8a6fb0", "#f3e9d8", "#c9455c"];

function makeParticle(x, y, opts = {}) {
  const angle = opts.angle ?? Math.random() * Math.PI * 2;
  const speed = opts.speed ?? 2 + Math.random() * 4;
  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - (opts.burst ? 2 : 0),
    size: 5 + Math.random() * 6,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 12,
    life: 0,
    maxLife: opts.maxLife ?? 90 + Math.random() * 40,
    gravity: opts.gravity ?? 0.12
  };
}

function confettiRain(durationMs = 3000) {
  const start = performance.now();
  startConfettiLoop();
  function spawn(now) {
    if (now - start > durationMs) return;
    for (let i = 0; i < 3; i++) {
      particles.push(
        makeParticle(Math.random() * canvas.width, -20, {
          angle: Math.PI / 2,
          speed: 1 + Math.random() * 2,
          gravity: 0.06,
          maxLife: 260
        })
      );
    }
    requestAnimationFrame(spawn);
  }
  requestAnimationFrame(spawn);
}

function startConfettiLoop() {
  if (confettiRunning) return;
  confettiRunning = true;
  requestAnimationFrame(confettiTick);
}

function confettiTick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.life++;
    p.vy += p.gravity;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotSpeed;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  });

  particles = particles.filter((p) => p.life < p.maxLife && p.y < canvas.height + 40);

  if (particles.length > 0) {
    requestAnimationFrame(confettiTick);
  } else {
    confettiRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/* ---------------------------------------------------------
   Arranque — siempre empieza de cero
   --------------------------------------------------------- */
createStars();
showScreen("witch-screen");
startWitchIntro();
