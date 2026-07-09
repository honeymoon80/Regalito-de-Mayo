/* =============================================
   SCRIPT.JS — Regalo de Amor (SOLO SECCIÓN 1)
   CON MÚSICA
   ============================================= */
'use strict';

// ╔══════════════════════════════════════════════╗
// ║  ⚙️  CONFIGURACIÓN — EDITA AQUÍ              ║
// ╚══════════════════════════════════════════════╝

// ── Pantalla inicial ─────────────────────────
const CLICS_NECESARIOS = 20;
const TITULO_CARTA_INICIAL = "💌 Tengo algo especial para ti 💌";
const SUBTITULO_CARTA_INICIAL = "Aprieta la carta para abrirlo... 💝";
const MENSAJE_APERTURA = "¡Para ti, mi amor! 💖";

// ── Mini carrusel automático (pantalla inicial) ─
const TOTAL_FOTOS_CARRUSEL_AUTO = 6;
const FRASES_CARRUSEL_AUTO = [
  '💗You're my universe💗',
  '❤️Te AMO❤️',
  '🌸you're PERFECT🌸',
  '💗My life forever💗',
  '💓my gorgeous girl💓',
  '💐Together forever💐',
];

// ── Sección 1 — Carrusel de amor ─────────────
const TOTAL_SLIDES_CARRUSEL = 10;
const FRASES_AMOR_CARRUSEL = [
  'tii AMOO mushote mi princeshita bella:3💗',
  'eresh mi bellíshima luceshita de miel🥺💗✨',
  'kontigo SIEMPRE woa sel muii FELISH😸💗💞',
  'MI sueñito hesho realidad y mi realidad hesha sueñito^v^💓💤',
  'SIEMPRE estaré bem juntito a ti FOREVER:)💗🌟',
  'eresh toditita mi razhón de SER my gud baby🥺💗💐',
  'SIEMPRE serásh toditito mi mundito entero🫶💗💞',
  'eresh mi másh bellíshima MOTIVACIÓN HEHE:D🎉💓✨️',
  'te ADORO kon mushísima PASIÓN!!(≧▽≦)💗💞',
  'I love you very much FOREVER my gorgeous girl:)❤️✨️'
];

// ── Menú (tarjetas) ── SOLO SECCIÓN 1 ────────
const MENU_OPCIONES = [
  { img:'assets/menu/menu1.webp', emoji:'💌', titulo:'Carrusel de Amor', seccion:1 },
];

// ── Modal final al completar ──────────────────
const MENSAJE_FINAL_REGALO = '🎉 ¡Has completado el regalo! 🎉\n\nMushash GRASHASH pol leersh mi bella kartita dedikadita a TI y pol disfrutash de mi regalito!!! TENKIUSSH SO MUCH pol sel SIEMPRE mi bellíshima y gloriosha DIOSITA PERFECTA k tqnto AMOO y ADORO mushísisisimo y kon toditito mi KORAZONSHITO de MIEL pol TI HEHE🥹💗🌸✨️';
const IMAGEN_FINAL_REGALO  = 'assets/final/regalo_completo.webp';

// ── Playlist (música) ─────────────────────────
const PLAYLIST_REGALO = [
  { name:'Nuestra Canción 1 ♪', src:'assets/songs/song1.mp3' },
  { name:'Nuestra Canción 2 ♪', src:'assets/songs/song2.mp3' },
  { name:'Nuestra Canción 3 ♪', src:'assets/songs/song3.mp3' },
  { name:'Nuestra Canción 4 ♪', src:'assets/songs/song4.mp3' },
  { name:'Nuestra Canción 5 ♪', src:'assets/songs/song5.mp3' },
];

// Palabras para partículas de clic
const PARTICLE_WORDS = [
  'Te amo 💗','Mi amor 💕','Eres perfecta 🌸','Para siempre 💖','Mi vida ✨',
  'Siempre tú 💝','Mi todo 🌷','Para ti 💞',
];
const EMOJI_PARTICLES = ['💗','💕','💖','🌸','✨','💝','🌷','⭐','💫','🎀','💞','🌺'];
const TRANSITIONS_LIST = [
  {i:'trans-fade-in',   o:'trans-fade-out'},
  {i:'trans-sright-in', o:'trans-sright-out'},
  {i:'trans-sleft-in',  o:'trans-sleft-out'},
  {i:'trans-zoom-in',   o:'trans-zoom-out'},
  {i:'trans-blur-in',   o:'trans-blur-out'},
  {i:'trans-flip-in',   o:'trans-flip-out'},
  {i:'trans-rot-in',    o:'trans-rot-out'},
  {i:'trans-sup-in',    o:'trans-sup-out'},
  {i:'trans-glitch-in', o:'trans-glitch-out'},
];

// ════════════════════════════════════════════
// ESTADO GLOBAL
// ════════════════════════════════════════════
let giftClicks   = 0;
let particlePool = [];
const MAX_PARTICLES = 50;

let globalSongIdx  = 0;
let globalPlaying  = false;
let gpMinimized    = false;

let sec1Slide        = 0;
let sec1TransIdx     = 0;
let sec1Transitioning= false;
let sec1SlidesViewed = new Set();

let progress = { sec1: false };

// DOM refs
const introScreen   = document.getElementById('introScreen');
const introCard     = document.getElementById('introCard');
const mainApp       = document.getElementById('mainApp');
const confettiCont  = document.getElementById('confettiContainer');
const globalNotif   = document.getElementById('globalNotif');
const globalAudio   = document.getElementById('globalAudio');
const gpPanel       = document.getElementById('gpPanel');
const gpToggleBtn   = document.getElementById('gpToggleBtn');
const gpPlayBtn     = document.getElementById('gpPlayBtn');
const gpPrevBtn     = document.getElementById('gpPrevBtn');
const gpNextBtn     = document.getElementById('gpNextBtn');
const gpSongName    = document.getElementById('gpSongName');
const gpSongNum     = document.getElementById('gpSongNum');
const gpCurTime     = document.getElementById('gpCurTime');
const gpTotalTime   = document.getElementById('gpTotalTime');
const gpProgressFill  = document.getElementById('gpProgressFill');
const gpProgressThumb = document.getElementById('gpProgressThumb');
const gpProgressTrack = document.getElementById('gpProgressTrack');
const gpVolSlider   = document.getElementById('gpVolSlider');
const gpBarInner    = document.getElementById('gpBarInner');
const gpLabel       = document.getElementById('gpLabel');
const gpPct         = document.getElementById('gpPct');
const menuGrid      = document.getElementById('menuGrid');

// ════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  const titleEl = document.getElementById('introTitle');
  const subEl   = document.getElementById('introSubtitle');
  if (titleEl) titleEl.textContent = TITULO_CARTA_INICIAL;
  if (subEl)   subEl.textContent   = SUBTITULO_CARTA_INICIAL;

  buildAutoCarousel();
  startIntroHearts();

  const handleGiftClick = () => openGiftClick();
  introCard.addEventListener('click',      handleGiftClick);
  introCard.addEventListener('touchstart', handleGiftClick, {passive:true});

  document.addEventListener('click', e => {
    if (!mainApp || mainApp.classList.contains('hidden')) return;
    if (e.target.closest('button,input,select,textarea,.menu-card')) return;
    spawnParticles(e.clientX, e.clientY, 6, false);
  });
  document.addEventListener('touchstart', e => {
    if (!mainApp || mainApp.classList.contains('hidden')) return;
    if (e.target.closest('button,input,select,textarea,.menu-card')) return;
    spawnParticles(e.touches[0].clientX, e.touches[0].clientY, 6, false);
  }, {passive:true});

  // Música global
  globalAudio.volume = 0.7;
  if (PLAYLIST_REGALO.length) loadGlobalSong(0, false);
  gpPlayBtn.addEventListener('click', e => { e.stopPropagation(); toggleGlobalPlay(); });
  gpPrevBtn.addEventListener('click', e => { e.stopPropagation(); changeGlobalSong(-1); });
  gpNextBtn.addEventListener('click', e => { e.stopPropagation(); changeGlobalSong(1); });
  gpToggleBtn.addEventListener('click', e => { e.stopPropagation(); toggleGP(); });
  globalAudio.addEventListener('timeupdate', updateAudioProgress);
  globalAudio.addEventListener('ended', () => changeGlobalSong(1));
  globalAudio.addEventListener('play',  () => { globalPlaying=true;  gpPlayBtn.textContent='⏸'; });
  globalAudio.addEventListener('pause', () => { globalPlaying=false; gpPlayBtn.textContent='▶'; });
  if (gpProgressTrack) {
    gpProgressTrack.addEventListener('click', e => {
      e.stopPropagation();
      if (!globalAudio.duration) return;
      const r = gpProgressTrack.getBoundingClientRect();
      globalAudio.currentTime = ((e.clientX - r.left) / r.width) * globalAudio.duration;
    });
  }
  if (gpVolSlider) gpVolSlider.addEventListener('input', e => {
    e.stopPropagation();
    globalAudio.volume = e.target.value;
    const pct = e.target.value * 100;
    e.target.style.background = `linear-gradient(90deg,var(--pink-main) ${pct}%,rgba(251,182,206,0.4) ${pct}%)`;
  });

  document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
  document.getElementById('genericModal')?.addEventListener('click', e => { if (e.target === document.getElementById('genericModal')) closeModal(); });

  history.pushState({ page:'intro' }, '');
  window.addEventListener('popstate', () => {
    const openSec = document.querySelector('.sec-panel:not(.hidden)');
    if (openSec) {
      const n = parseInt(openSec.id.replace('sec',''));
      if (!isNaN(n)) { closeSection(n); history.pushState({ page:'menu' }, ''); }
    }
  });
});

// ════════════════════════════════════════════
// PANTALLA INICIAL — CARTA QUE SE ABRE CON CLICS
// ════════════════════════════════════════════
function openGiftClick() {
  giftClicks++;

  const bar = document.getElementById('giftProgressBar');
  const lbl = document.getElementById('giftClickLabel');
  if (bar) bar.style.width = (giftClicks / CLICS_NECESARIOS * 100) + '%';
  if (lbl) lbl.textContent = giftClicks < CLICS_NECESARIOS
    ? `¡Ya casi! ${giftClicks} / ${CLICS_NECESARIOS} 💗`
    : '¡Abriendo...! 💖';

  const scaleProgress = 1 + (giftClicks / CLICS_NECESARIOS) * 0.08;
  introCard.style.transform = `scale(${Math.min(scaleProgress, 1.08)})`;

  if (giftClicks % 4 === 0) {
    const r = introCard.getBoundingClientRect();
    spawnParticles(r.left + r.width/2, r.top + r.height/2, 5, false);
  }

  if (giftClicks >= CLICS_NECESARIOS) abrirRegalo();
}

function abrirRegalo() {
  launchConfetti(130);
  spawnParticles(window.innerWidth/2, window.innerHeight/2, 28, true);
  showNotif(MENSAJE_APERTURA);

  // Iniciar música
  initMusic();

  introScreen.style.transition = 'opacity 0.9s, transform 0.9s';
  introScreen.style.opacity = '0';
  introScreen.style.transform = 'scale(1.06)';

  setTimeout(() => {
    introScreen.style.display = 'none';
    mainApp.classList.remove('hidden');
    buildMenu();
    startMainHearts();
    updateProgressUI();
    history.pushState({ page:'menu' }, '');
  }, 850);
}

// ─── Mini carrusel automático ────────────────
let autoSlideIdx   = 0;
let autoSlideTimer = null;
function buildAutoCarousel() {
  const container = document.getElementById('autoCarousel');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < TOTAL_FOTOS_CARRUSEL_AUTO; i++) {
    const slide = document.createElement('div');
    slide.className = 'auto-slide' + (i === 0 ? ' active-slide' : '');
    slide.innerHTML = `
      <img src="assets/regalo_carrusel/regalo${i+1}.webp" alt="regalo ${i+1}" loading="${i===0?'eager':'lazy'}"
           style="width:100%;height:100%;object-fit:cover"
           onerror="this.style.minHeight='120px';this.removeAttribute('src')">
      <div class="auto-slide-overlay">${FRASES_CARRUSEL_AUTO[i] || ''}</div>`;
    container.appendChild(slide);
  }
  autoSlideTimer = setInterval(() => {
    const slides = container.querySelectorAll('.auto-slide');
    slides[autoSlideIdx].classList.remove('active-slide');
    autoSlideIdx = (autoSlideIdx + 1) % slides.length;
    slides[autoSlideIdx].classList.add('active-slide');
  }, 3000);
}

// ════════════════════════════════════════════
// PROGRESO Y MENÚ
// ════════════════════════════════════════════
function buildMenu() {
  if (!menuGrid) return;
  menuGrid.innerHTML = '';
  MENU_OPCIONES.forEach(opt => {
    const done = progress[`sec${opt.seccion}`];
    const card = document.createElement('div');
    card.className = 'menu-card' + (done ? ' done' : '');
    card.innerHTML = `
      <div class="menu-card-img">
        <img src="${opt.img}" alt="${opt.titulo}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="img-placeholder" style="display:none">${opt.emoji}</div>
      </div>
      <div class="menu-card-progress">
        <div class="menu-card-prog-fill" style="width:${done?'100':'0'}%"></div>
      </div>
      <div class="menu-card-title">${opt.titulo}${done?' ✓':''}</div>`;
    card.addEventListener('click', () => openSection(opt.seccion));
    menuGrid.appendChild(card);
  });
}

function openSection(sec) {
  document.querySelectorAll('.sec-panel').forEach(p => p.classList.add('hidden'));
  document.getElementById('mainMenu')?.classList.add('hidden');
  const panel = document.getElementById(`sec${sec}`);
  if (!panel) return;
  
  // Si intenta abrir sección 2 (deshabilitada)
  if (sec === 2) {
    document.getElementById('mainMenu')?.classList.remove('hidden');
    showNotif('💗 Solo el Carrusel de Amor está disponible');
    return;
  }
  
  panel.classList.remove('hidden');
  panel.scrollTop = 0;
  if (sec === 1) initSec1();
  history.pushState({ page:`sec${sec}`, sec }, '');
}

function closeSection(sec) {
  document.getElementById(`sec${sec}`)?.classList.add('hidden');
  document.getElementById('mainMenu')?.classList.remove('hidden');
  buildMenu();
  updateProgressUI();
}

function completeSection(sec) {
  progress[`sec${sec}`] = true;
  updateProgressUI();
  showNotif(`💗 ¡Sección ${sec} completada!`);
  launchConfetti(60);
  
  // Al completar la sección 1, abre el modal final
  if (progress.sec1) {
    setTimeout(openFinalModal, 800);
  }
}

function updateProgressUI() {
  const done = (progress.sec1 ? 1 : 0);
  const pct  = Math.round(done / 1 * 100);
  if (gpBarInner) gpBarInner.style.width = pct + '%';
  if (gpLabel)    gpLabel.textContent = `Progreso: ${done}/1 sección`;
  if (gpPct)      gpPct.textContent   = pct + '%';
}

function openFinalModal() {
  launchConfetti(200);
  spawnParticles(window.innerWidth/2, window.innerHeight/2, 40, true);
  const modal = document.getElementById('finalModal');
  const img   = document.getElementById('finalImg');
  const msg   = document.getElementById('finalMsg');
  if (img) img.src = IMAGEN_FINAL_REGALO;
  if (msg) msg.textContent = MENSAJE_FINAL_REGALO;
  modal?.classList.remove('hidden');
}
function closeFinalModal() { document.getElementById('finalModal')?.classList.add('hidden'); }

// ════════════════════════════════════════════
// SECCIÓN 1 — CARRUSEL DE AMOR (10 IMÁGENES)
// ════════════════════════════════════════════
function initSec1() {
  const carousel = document.getElementById('sec1Carousel');
  if (!carousel) return;
  if (carousel.children.length) { updateSec1Progress(); return; }

  for (let i = 0; i < TOTAL_SLIDES_CARRUSEL; i++) {
    const slide = document.createElement('div');
    slide.className = 'c-slide' + (i === 0 ? ' active' : '');
    slide.innerHTML = `
      <div style="position:relative;width:100%;height:100%">
        <img src="assets/carta_carrusel/coffee${i+1}.webp" alt="amor ${i+1}"
             loading="${i===0?'eager':'lazy'}"
             style="width:100%;height:100%;object-fit:contain;background:var(--cream)"
             onerror="this.style.background='linear-gradient(135deg,var(--pink-pale),var(--blush))';this.removeAttribute('src')">
        <div class="c-slide-overlay">${FRASES_AMOR_CARRUSEL[i] || ''}</div>
      </div>`;
    carousel.appendChild(slide);
  }

  let tx = 0;
  carousel.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, {passive:true});
  carousel.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) { dx < 0 ? sec1Next() : sec1Prev(); }
  }, {passive:true});

  buildSec1Dots();
  sec1SlidesViewed.add(0);
  updateSec1Progress();

  document.getElementById('sec1Prev').onclick = sec1Prev;
  document.getElementById('sec1Next').onclick = sec1Next;
}

function sec1Prev() { goSec1Slide(sec1Slide - 1); }
function sec1Next() { goSec1Slide(sec1Slide + 1); }

function buildSec1Dots() {
  const dc = document.getElementById('sec1Dots');
  if (!dc) return;
  dc.innerHTML = '';
  for (let i = 0; i < TOTAL_SLIDES_CARRUSEL; i++) {
    const d = document.createElement('div');
    d.className = 'c-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goSec1Slide(i));
    dc.appendChild(d);
  }
}

function goSec1Slide(idx) {
  if (sec1Transitioning) return;
  if (idx < 0) idx = TOTAL_SLIDES_CARRUSEL - 1;
  if (idx >= TOTAL_SLIDES_CARRUSEL) idx = 0;
  if (idx === sec1Slide) return;

  sec1Transitioning = true;
  const car    = document.getElementById('sec1Carousel');
  const slides = car?.querySelectorAll('.c-slide');
  if (!slides) { sec1Slide = idx; sec1Transitioning = false; return; }

  const t   = TRANSITIONS_LIST[sec1TransIdx % TRANSITIONS_LIST.length];
  sec1TransIdx++;
  const old = slides[sec1Slide];
  const nw  = slides[idx];
  old.classList.add(t.o);
  nw.style.display = 'flex';
  nw.classList.add(t.i, 'active');

  setTimeout(() => {
    old.style.display = 'none';
    old.classList.remove('active', t.o);
    nw.classList.remove(t.i);
    sec1Slide = idx;
    sec1Transitioning = false;
    sec1SlidesViewed.add(idx);
    updateSec1Progress();
    if (sec1SlidesViewed.size >= TOTAL_SLIDES_CARRUSEL && !progress.sec1) {
      completeSection(1);
    }
  }, 550);
}

function updateSec1Progress() {
  const pt = document.getElementById('sec1ProgressText');
  const pb = document.getElementById('sec1ProgressBar');
  if (pt) pt.textContent = `Imagen ${sec1Slide + 1} de ${TOTAL_SLIDES_CARRUSEL} 💗`;
  if (pb) pb.style.width = ((sec1Slide + 1) / TOTAL_SLIDES_CARRUSEL * 100) + '%';
  document.querySelectorAll('#sec1Dots .c-dot').forEach((d, i) =>
    d.classList.toggle('active', i === sec1Slide));
}

// ════════════════════════════════════════════
// MÚSICA GLOBAL
// ════════════════════════════════════════════
function initMusic() {
  if (!PLAYLIST_REGALO.length) return;
  loadGlobalSong(0, false);
  const tryPlay = () => {
    globalAudio.play().catch(() => {});
    document.removeEventListener('click',      tryPlay);
    document.removeEventListener('touchstart', tryPlay);
  };
  document.addEventListener('click',      tryPlay, {once:true});
  document.addEventListener('touchstart', tryPlay, {once:true, passive:true});
  setTimeout(() => globalAudio.play().catch(() => {}), 400);
}

function loadGlobalSong(idx, play = true) {
  globalSongIdx = ((idx % PLAYLIST_REGALO.length) + PLAYLIST_REGALO.length) % PLAYLIST_REGALO.length;
  const s = PLAYLIST_REGALO[globalSongIdx];
  globalAudio.src = s.src;
  if (gpSongName) gpSongName.textContent = s.name;
  if (gpSongNum)  gpSongNum.textContent  = `${globalSongIdx+1}/${PLAYLIST_REGALO.length}`;
  if (play && globalPlaying) globalAudio.play().catch(() => {});
  updateAudioProgress();
}

function toggleGlobalPlay() {
  if (globalPlaying) globalAudio.pause();
  else globalAudio.play().catch(() => {});
}
function changeGlobalSong(dir) { loadGlobalSong(globalSongIdx + dir, true); }

function updateAudioProgress() {
  if (!globalAudio.duration) return;
  const pct = globalAudio.currentTime / globalAudio.duration * 100;
  if (gpProgressFill)  gpProgressFill.style.width = pct + '%';
  if (gpProgressThumb) gpProgressThumb.style.left  = pct + '%';
  if (gpCurTime)   gpCurTime.textContent   = fmtTime(globalAudio.currentTime);
  if (gpTotalTime) gpTotalTime.textContent = fmtTime(globalAudio.duration);
}

function fmtTime(s) {
  if (isNaN(s)) return '0:00';
  const m = Math.floor(s/60), ss = Math.floor(s%60);
  return m + ':' + (ss < 10 ? '0' : '') + ss;
}
function toggleGP() {
  gpMinimized = !gpMinimized;
  gpPanel?.classList.toggle('minimized', gpMinimized);
}

// ════════════════════════════════════════════
// MODAL GENÉRICO
// ════════════════════════════════════════════
function openModal(html) {
  const gm = document.getElementById('genericModal');
  const mc = document.getElementById('modalContent');
  if (!gm || !mc) return;
  mc.innerHTML = html;
  gm.classList.remove('hidden');
}
function closeModal() {
  document.getElementById('genericModal')?.classList.add('hidden');
  document.getElementById('modalContent').innerHTML = '';
}

// ════════════════════════════════════════════
// PARTÍCULAS
// ════════════════════════════════════════════
function spawnParticles(x, y, count, big) {
  if (particlePool.length >= MAX_PARTICLES) return;
  for (let i = 0; i < count; i++) {
    if (particlePool.length >= MAX_PARTICLES) break;
    const el = document.createElement('div');
    el.className = 'particle';
    const useWord = Math.random() > 0.55;
    if (useWord) {
      el.textContent = PARTICLE_WORDS[Math.floor(Math.random() * PARTICLE_WORDS.length)];
      el.style.fontSize  = big ? (Math.random()*5+11)+'px' : (Math.random()*4+8)+'px';
      el.style.color     = ['#ff69b4','#ff1493','#db2777','#f9a8d4','#c026d3'][Math.floor(Math.random()*5)];
      el.style.fontFamily = "'Dancing Script',cursive";
      el.style.fontWeight = '600';
    } else {
      el.textContent  = EMOJI_PARTICLES[Math.floor(Math.random() * EMOJI_PARTICLES.length)];
      el.style.fontSize = big ? (Math.random()*12+16)+'px' : (Math.random()*8+10)+'px';
    }
    const angle = Math.random() * Math.PI * 2;
    const speed = big ? (Math.random()*80+60) : (Math.random()*50+30);
    const vx = Math.cos(angle) * speed;
    const vy = -Math.abs(Math.sin(angle)) * speed - (big ? 60 : 40);
    el.style.cssText += `;position:fixed;left:${x}px;top:${y}px;pointer-events:none;z-index:9500;white-space:nowrap;`;
    document.body.appendChild(el);
    particlePool.push(el);
    const start = performance.now();
    const dur   = big ? (Math.random()*1000+1800) : (Math.random()*800+1200);
    const anim  = now => {
      const t  = (now - start) / 1000;
      const nx = x + vx*t, ny = y + vy*t + 0.5*80*t*t;
      const op = Math.max(0, 1 - t/(dur/1000));
      const sc = Math.max(0.1, 1 - t/(dur/1000)*0.7);
      el.style.left      = nx+'px';
      el.style.top       = ny+'px';
      el.style.transform = `rotate(${t*(big?180:120)}deg) scale(${sc})`;
      el.style.opacity   = op;
      if (t < dur/1000 && op > 0) requestAnimationFrame(anim);
      else { el.remove(); const idx = particlePool.indexOf(el); if (idx !== -1) particlePool.splice(idx, 1); }
    };
    requestAnimationFrame(anim);
  }
}

// ════════════════════════════════════════════
// CONFETI
// ════════════════════════════════════════════
function launchConfetti(count = 80) {
  const colors = ['#ff69b4','#f9a8d4','#fda4af','#e9d5ff','#c4b5fd','#fde68a','#fbcfe8'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left             = Math.random() * 100 + 'vw';
      el.style.background       = colors[Math.floor(Math.random()*colors.length)];
      el.style.width            = (Math.random()*10+5)+'px';
      el.style.height           = (Math.random()*10+5)+'px';
      el.style.borderRadius     = Math.random()>0.5?'50%':'3px';
      el.style.animationDuration= (Math.random()*2+1.5)+'s';
      el.style.animationDelay   = Math.random()*0.5+'s';
      confettiCont.appendChild(el);
      setTimeout(() => el.remove(), 3500);
    }, i * 10);
  }
}

// ════════════════════════════════════════════
// CORAZONES FLOTANTES
// ════════════════════════════════════════════
function startIntroHearts() {
  const bg = document.getElementById('introHeartsBg');
  const hearts = ['💗','💕','🌸','✨','💖','💝'];
  const spawn = () => {
    if (!bg) return;
    const el = document.createElement('div');
    el.className = 'intro-float-heart';
    el.textContent = hearts[Math.floor(Math.random()*hearts.length)];
    el.style.left   = Math.random()*100+'%';
    el.style.animationDuration = (Math.random()*6+7)+'s';
    el.style.fontSize = (Math.random()*14+12)+'px';
    el.style.opacity  = (Math.random()*0.35+0.2).toFixed(2);
    bg.appendChild(el);
    setTimeout(() => el.remove(), 14000);
  };
  for (let i = 0; i < 6; i++) setTimeout(spawn, i*400);
  setInterval(spawn, 700);
}

function startMainHearts() {
  const hearts = ['💗','💕','🌸','✨','💖','🎀','🌺','💝'];
  const spawn = () => {
    const el = document.createElement('div');
    el.className = 'float-heart';
    el.textContent = hearts[Math.floor(Math.random()*hearts.length)];
    el.style.left   = Math.random()*100+'vw';
    el.style.animationDuration = (Math.random()*6+7)+'s';
    el.style.fontSize = (Math.random()*14+12)+'px';
    el.style.opacity  = (Math.random()*0.35+0.2).toFixed(2);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 14000);
  };
  for (let i = 0; i < 5; i++) setTimeout(spawn, i*500);
  setInterval(spawn, 800);
}

// ════════════════════════════════════════════
// NOTIFICACIÓN GLOBAL
// ════════════════════════════════════════════
let notifTimer = null;
function showNotif(msg) {
  globalNotif.textContent = msg;
  globalNotif.classList.add('show');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => globalNotif.classList.remove('show'), 3500);
}

window.addEventListener('resize', () => {
  particlePool.forEach(p => { if (!document.body.contains(p)) p.remove(); });
  particlePool = particlePool.filter(p => document.body.contains(p));
});
