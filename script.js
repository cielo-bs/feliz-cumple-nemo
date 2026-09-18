/* =========================================================
   🎈 FELIZ CUMPLEAÑOS — CONFIGURACIÓN
   Editá estas líneas para personalizar el mensaje.
   No hace falta tocar nada más abajo de esta sección.
   ========================================================= */
const CONFIG = {
  introTitle: "Feliz Cumpleaños,<br>Nemo",
  introSubtitle: "Atrapá los 9 globos antes de que se escapen y descubrí tu sorpresa ✨",
  finalMessage: "¡Feliz cumple! Te amamos 💕",
  finalSubmessage: "Tu regalo está en MP 🎁",
  finalJoke: "(ahre que siempre regalaban lo mismo 😂)",
  balloonCount: 9,
  // colores pastel de los globos (podés agregar/sacar/cambiar)
  balloonColors: ["#d9c9f2", "#ffb199", "#c3f0e1", "#f6cf72", "#f7b8d0", "#b7d8f7"],
  // mini-sorpresa que aparece cada vez que se revienta un globo
  // (se reparten sorteadas entre los globos: uno por elemento, sin repetir).
  // cada una tiene "emoji" (un emoji posta) o "svg" (un dibujito armado a mano
  // para lo que no existe como emoji). "text" es solo para identificarlos
  // acá en el código, no se muestra en la página.
  // Si agregás más elementos que globos, aumentá balloonCount para que entren todos.
  balloonSurprises: [
    { emoji: "🐠", text: "el pez payaso, obvio" },
    { emoji: "👶", text: "la beba" },
    {
      svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="17" fill="#fff" stroke="#e3d6f0" stroke-width="1.5"/><path d="M30 13 a6 6 0 0 1 6 6 v3 h-12 v-3 a6 6 0 0 1 6 -6 Z" fill="#f7b8d0"/><circle cx="24" cy="30" r="2" fill="#5b4a63"/><circle cx="36" cy="30" r="2" fill="#5b4a63"/><path d="M25 38 Q30 42 35 38" stroke="#5b4a63" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
      text: "la veterinaria"
    },
    { emoji: "📐", text: "la arquitecta" },
    {
      svg: `<svg viewBox="0 0 60 60"><path d="M12 30 Q10 10 30 9 Q50 10 48 29 Q47 16 39 18 Q43 12 34 13 Q38 9 29 10 Q21 6 22 13 Q14 11 16 18 Q11 17 12 30 Z" fill="#a9714a"/><circle cx="30" cy="34" r="16" fill="#ffe0c2"/><path d="M14 30 Q12 12 30 11 Q48 12 46 30 Q45 19 38 21 Q42 15 35 16 Q22 8 24 15 Q16 13 18 19 Q12 19 14 30 Z" fill="#a9714a"/><circle cx="24" cy="35" r="2" fill="#5b4a63"/><circle cx="36" cy="35" r="2" fill="#5b4a63"/><path d="M24 43 Q30 47 36 43" stroke="#5b4a63" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
      text: "el chico del pelo ondulado"
    },
    {
      svg: `<svg viewBox="0 0 60 60"><polygon points="14,14 25,27 9,28" fill="#fff" stroke="#e3d6f0" stroke-width="1.5"/><polygon points="46,14 35,27 51,28" fill="#fff" stroke="#e3d6f0" stroke-width="1.5"/><circle cx="30" cy="34" r="16" fill="#fff" stroke="#e3d6f0" stroke-width="1.5"/><circle cx="24" cy="32" r="2" fill="#5b4a63"/><circle cx="36" cy="32" r="2" fill="#5b4a63"/><ellipse cx="30" cy="40" rx="3" ry="2" fill="#5b4a63"/><path d="M30 42 Q30 46 26 46 M30 42 Q30 46 34 46" stroke="#5b4a63" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`,
      text: "la perrita blanca"
    },
    { emoji: "🥁", text: "la batería" },
    { emoji: "🎂", text: "la torta" },
    { emoji: "🎁", text: "el regalo (posta)" }
  ]
};

/* =========================================================
   A PARTIR DE ACÁ ES LA LÓGICA DEL JUEGO
   ========================================================= */

// ---- referencias del DOM ----
const introTitleEl = document.getElementById("intro-title");
const introSubtitleEl = document.getElementById("intro-subtitle");
const finalMessageEl = document.getElementById("final-message");
const finalSubmessageEl = document.getElementById("final-submessage");
const finalJokeEl = document.getElementById("final-joke");
const timeResultEl = document.getElementById("time-result");
const counterTextEl = document.getElementById("counter-text");
const timerTextEl = document.getElementById("timer-text");
const progressFillEl = document.getElementById("progress-fill");
const balloonFieldEl = document.getElementById("balloon-field");
const startBtn = document.getElementById("start-btn");
const replayBtn = document.getElementById("replay-btn");
const sparklesEl = document.getElementById("sparkles");

let poppedCount = 0;
let audioCtx = null;

// estado del movimiento de los globos
let activeBalloons = [];
let rafId = null;
let timerInterval = null;
let lastFrameTime = null;
let gameStartTime = 0;

// aplica el texto configurado
introTitleEl.innerHTML = CONFIG.introTitle;
introSubtitleEl.textContent = CONFIG.introSubtitle;
finalMessageEl.textContent = CONFIG.finalMessage;
finalSubmessageEl.textContent = CONFIG.finalSubmessage;
finalJokeEl.textContent = CONFIG.finalJoke;
counterTextEl.textContent = `0 / ${CONFIG.balloonCount} globos`;

/* ---------------------------------------------------------
   Utilidades
   --------------------------------------------------------- */
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

/* ---------------------------------------------------------
   Cambiar de pantalla
   --------------------------------------------------------- */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("is-active"));
  document.getElementById(id).classList.add("is-active");
}

/* ---------------------------------------------------------
   Brillitos de fondo (decorativos)
   --------------------------------------------------------- */
function createBackgroundSparkles() {
  const glyphs = ["✨", "💫", "⭐"];
  const total = 18;
  for (let i = 0; i < total; i++) {
    const span = document.createElement("span");
    span.className = "sparkle";
    span.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    span.style.left = `${Math.random() * 100}%`;
    span.style.fontSize = `${10 + Math.random() * 16}px`;
    span.style.animationDuration = `${10 + Math.random() * 12}s`;
    span.style.animationDelay = `${Math.random() * 12}s`;
    sparklesEl.appendChild(span);
  }
}

/* ---------------------------------------------------------
   Globos
   --------------------------------------------------------- */
function balloonSVG(color) {
  return `
    <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="52" rx="42" ry="50" fill="${color}"/>
      <ellipse cx="35" cy="32" rx="12" ry="16" fill="rgba(255,255,255,.35)"/>
      <polygon points="44,100 56,100 50,112" fill="${color}"/>
      <path d="M50 112 C 46 118, 54 122, 50 130" stroke="${color}" stroke-width="2" fill="none" opacity=".6"/>
    </svg>
  `;
}

function stopLoops() {
  if (rafId) cancelAnimationFrame(rafId);
  if (timerInterval) clearInterval(timerInterval);
  rafId = null;
  timerInterval = null;
  lastFrameTime = null;
}

function buildBalloons() {
  stopLoops();
  balloonFieldEl.innerHTML = "";
  poppedCount = 0;
  updateCounter();
  updateTimerDisplay(0);
  timeResultEl.textContent = "";
  activeBalloons = [];

  const fieldRect = balloonFieldEl.getBoundingClientRect();
  const fieldWidth = fieldRect.width;
  const fieldHeight = fieldRect.height;

  const surprises = shuffle(CONFIG.balloonSurprises);

  for (let i = 0; i < CONFIG.balloonCount; i++) {
    const color = CONFIG.balloonColors[i % CONFIG.balloonColors.length];
    const surprise = surprises[i % surprises.length];

    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.innerHTML = `<div class="balloon-inner">${balloonSVG(color)}</div>`;
    balloonFieldEl.appendChild(balloon);

    const size = balloon.offsetWidth || 76;
    const maxX = Math.max(0, fieldWidth - size);
    const maxY = Math.max(0, fieldHeight - size * 1.2);

    const angle = Math.random() * Math.PI * 2;
    const speed = 110 + Math.random() * 60; // px/segundo (rápido a propósito, cuesta agarrarlos)

    const obj = {
      el: balloon,
      inner: balloon.querySelector(".balloon-inner"),
      x: Math.random() * maxX,
      y: Math.random() * maxY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      maxX,
      maxY,
      popped: false,
      surprise
    };

    balloon.style.transform = `translate(${obj.x}px, ${obj.y}px)`;
    balloon.addEventListener("click", () => popBalloon(obj), { once: true });

    activeBalloons.push(obj);
  }

  gameStartTime = performance.now();
  timerInterval = setInterval(() => {
    updateTimerDisplay(performance.now() - gameStartTime);
  }, 200);

  rafId = requestAnimationFrame(animationLoop);
}

function animationLoop(now) {
  if (lastFrameTime === null) {
    lastFrameTime = now;
    rafId = requestAnimationFrame(animationLoop);
    return;
  }

  const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
  lastFrameTime = now;

  activeBalloons.forEach((b) => {
    if (b.popped) return;

    b.x += b.vx * dt;
    b.y += b.vy * dt;

    if (b.x <= 0) {
      b.x = 0;
      b.vx = Math.abs(b.vx);
    } else if (b.x >= b.maxX) {
      b.x = b.maxX;
      b.vx = -Math.abs(b.vx);
    }

    if (b.y <= 0) {
      b.y = 0;
      b.vy = Math.abs(b.vy);
    } else if (b.y >= b.maxY) {
      b.y = b.maxY;
      b.vy = -Math.abs(b.vy);
    }

    b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
  });

  rafId = requestAnimationFrame(animationLoop);
}

// cada globo reventado acelera un poquito a los que quedan (más desafío)
function rampSpeeds() {
  const rampFactor = 1.12;
  const maxSpeed = 280;
  activeBalloons.forEach((b) => {
    if (b.popped) return;
    b.vx *= rampFactor;
    b.vy *= rampFactor;
    const speed = Math.hypot(b.vx, b.vy);
    if (speed > maxSpeed) {
      const s = maxSpeed / speed;
      b.vx *= s;
      b.vy *= s;
    }
  });
}

function popBalloon(obj) {
  if (obj.popped) return;
  obj.popped = true;

  const rect = obj.el.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  obj.el.classList.add("popped");
  obj.inner.classList.add("popped");

  playPopSound();
  confettiBurst(x, y, 16);
  showSurprise(x, y, obj.surprise);

  poppedCount++;
  updateCounter();
  rampSpeeds();

  if (poppedCount >= CONFIG.balloonCount) {
    const elapsedMs = performance.now() - gameStartTime;
    stopLoops();
    setTimeout(() => revealMessage(elapsedMs), 500);
  }
}

function updateCounter() {
  counterTextEl.textContent = `${poppedCount} / ${CONFIG.balloonCount} globos`;
  const pct = (poppedCount / CONFIG.balloonCount) * 100;
  progressFillEl.style.width = `${pct}%`;
}

function updateTimerDisplay(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const mm = pad(Math.floor(totalSeconds / 60));
  const ss = pad(totalSeconds % 60);
  timerTextEl.textContent = `⏱ ${mm}:${ss}`;
}

function revealMessage(elapsedMs) {
  const seconds = (elapsedMs / 1000).toFixed(1);
  timeResultEl.textContent = `Atrapaste los ${CONFIG.balloonCount} globos en ${seconds}s 🎈💨`;
  showScreen("reveal-screen");
  confettiRain(3200);
}

/* ---------------------------------------------------------
   Mini-sorpresa al reventar un globo
   --------------------------------------------------------- */
function showSurprise(x, y, surprise) {
  const el = document.createElement("div");
  el.className = "surprise-pop";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  // solo el dibujito/emoji, sin texto debajo
  el.innerHTML = surprise.svg
    ? `<span class="surprise-icon">${surprise.svg}</span>`
    : `<span class="surprise-emoji">${surprise.emoji}</span>`;

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2900);
}

/* ---------------------------------------------------------
   Sonido "pop" sintetizado (sin archivos de audio)
   --------------------------------------------------------- */
function ensureAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
}

function playPopSound() {
  if (!audioCtx) return;
  const t0 = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(520, t0);
  osc.frequency.exponentialRampToValueAtTime(120, t0 + 0.12);

  gain.gain.setValueAtTime(0.18, t0);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.15);

  osc.connect(gain).connect(audioCtx.destination);
  osc.start(t0);
  osc.stop(t0 + 0.16);
}

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

const confettiColors = ["#d9c9f2", "#ffb199", "#c3f0e1", "#f6cf72", "#f7b8d0", "#b7d8f7", "#ffffff"];

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

function confettiBurst(x, y, count = 20) {
  for (let i = 0; i < count; i++) {
    particles.push(makeParticle(x, y, { burst: true, speed: 2 + Math.random() * 5, maxLife: 55 + Math.random() * 25 }));
  }
  startConfettiLoop();
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
   Eventos
   --------------------------------------------------------- */
startBtn.addEventListener("click", () => {
  ensureAudio();
  showScreen("game-screen");
  buildBalloons();
});

replayBtn.addEventListener("click", () => {
  showScreen("game-screen");
  buildBalloons();
});

createBackgroundSparkles();
