/* =========================================================
   🎈 FELIZ CUMPLEAÑOS — CONFIGURACIÓN
   Editá estas líneas para personalizar el mensaje.
   No hace falta tocar nada más abajo de esta sección.
   ========================================================= */
const CONFIG = {
  introTitle: "Feliz Cumpleaños,<br>Nemo",
  introSubtitle: "Explotá todos los globos para descubrir tu sorpresa ✨",
  finalMessage: "¡Feliz cumple! Te amamos 💕",
  finalSubmessage: "Tu regalo está en MP 🎁",
  balloonCount: 12,
  // colores pastel de los globos (podés agregar/sacar/cambiar)
  balloonColors: ["#d9c9f2", "#ffb199", "#c3f0e1", "#f6cf72", "#f7b8d0", "#b7d8f7"]
};

/* =========================================================
   A PARTIR DE ACÁ ES LA LÓGICA DEL JUEGO
   ========================================================= */

// ---- referencias del DOM ----
const introTitleEl = document.getElementById("intro-title");
const introSubtitleEl = document.getElementById("intro-subtitle");
const finalMessageEl = document.getElementById("final-message");
const finalSubmessageEl = document.getElementById("final-submessage");
const counterTextEl = document.getElementById("counter-text");
const progressFillEl = document.getElementById("progress-fill");
const balloonFieldEl = document.getElementById("balloon-field");
const startBtn = document.getElementById("start-btn");
const replayBtn = document.getElementById("replay-btn");
const sparklesEl = document.getElementById("sparkles");

let poppedCount = 0;
let audioCtx = null;

// aplica el texto configurado
introTitleEl.innerHTML = CONFIG.introTitle;
introSubtitleEl.textContent = CONFIG.introSubtitle;
finalMessageEl.textContent = CONFIG.finalMessage;
finalSubmessageEl.textContent = CONFIG.finalSubmessage;
counterTextEl.textContent = `0 / ${CONFIG.balloonCount} globos`;

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

function buildBalloons() {
  balloonFieldEl.innerHTML = "";
  poppedCount = 0;
  updateCounter();

  for (let i = 0; i < CONFIG.balloonCount; i++) {
    const color = CONFIG.balloonColors[i % CONFIG.balloonColors.length];
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.innerHTML = balloonSVG(color);
    balloon.style.animationDelay = `${Math.random() * 2}s`;
    balloon.style.animationDuration = `${2.6 + Math.random() * 1.4}s`;
    balloon.addEventListener("click", () => popBalloon(balloon), { once: true });
    balloonFieldEl.appendChild(balloon);
  }
}

function popBalloon(balloon) {
  if (balloon.classList.contains("popped")) return;

  const rect = balloon.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  balloon.classList.add("popped");
  playPopSound();
  confettiBurst(x, y, 18);

  poppedCount++;
  updateCounter();

  if (poppedCount >= CONFIG.balloonCount) {
    setTimeout(revealMessage, 500);
  }
}

function updateCounter() {
  counterTextEl.textContent = `${poppedCount} / ${CONFIG.balloonCount} globos`;
  const pct = (poppedCount / CONFIG.balloonCount) * 100;
  progressFillEl.style.width = `${pct}%`;
}

function revealMessage() {
  showScreen("reveal-screen");
  confettiRain(3200);
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
  buildBalloons();
  showScreen("game-screen");
});

replayBtn.addEventListener("click", () => {
  buildBalloons();
  showScreen("game-screen");
});

createBackgroundSparkles();
