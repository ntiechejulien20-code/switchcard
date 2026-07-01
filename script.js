/* ==
   PHOTOS
   == */
const PHOTOS = {
  cardA:   "img/1.jpg",
  cardB:   "img/2.jpg",
  avatar:  "img/3.jpg"
};

/* -- Injection des photos au chargement -- */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.card-a .photo-wrap img').src = PHOTOS.cardA;
  document.querySelector('.card-b .photo-wrap img').src = PHOTOS.cardB;
  document.querySelector('.author img').src = PHOTOS.avatar;
});

/* - Mécanisme de switch A / B (la flèche suit via CSS, pilotée par data-active) - */
const stage = document.getElementById('stage');
const buttons = document.querySelectorAll('.switch-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    stage.setAttribute('data-active', target);
    buttons.forEach(b => b.setAttribute('aria-selected', b === btn ? 'true' : 'false'));

    document.querySelector('.card-a').setAttribute('aria-hidden', target === 'A' ? 'false' : 'true');
    document.querySelector('.card-b').setAttribute('aria-hidden', target === 'B' ? 'false' : 'true');
  });
});

/* - Bouton "Save for later" : coché uniquement après un clic de l'utilisateur - */
const saveBtn = document.querySelector('.save-later');
if (saveBtn) {
  saveBtn.addEventListener('click', () => {
    const isPressed = saveBtn.getAttribute('aria-pressed') === 'true';
    saveBtn.setAttribute('aria-pressed', String(!isPressed));
  });
}

/* - Bookmark (mettre en favori) : cliquable sur A et sur B, état synchronisé
   puisque c'est le même profil affiché sous deux variantes. - */
const bookmarkButtons = document.querySelectorAll('.bookmark-btn, .card-b .icon-btn');
let isFavorited = false;

function applyFavoriteState() {
  bookmarkButtons.forEach(btn => {
    btn.classList.toggle('is-active', isFavorited);
    btn.setAttribute('aria-pressed', String(isFavorited));
  });
}

bookmarkButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    isFavorited = !isFavorited;
    applyFavoriteState();
  });
});

/* - Mise à l'échelle automatique : le site reste toujours statique dans l'écran,
   sans scroll, aussi bien sur ordinateur que sur mobile — footer (avatar +
   save for later) et les cartes A / B toujours visibles en entier. - */
const frame = document.querySelector('.frame');

function fitFrame() {
  if (!frame) return;
  frame.style.transform = 'none';
  const rect = frame.getBoundingClientRect();
  // dvh (dynamic viewport height) via window.innerHeight reste la valeur la plus
  // fiable pour compenser les barres d'interface qui varient sur mobile.
  const availableW = window.innerWidth * 0.94;
  const availableH = window.innerHeight * 0.92;
  const scale = Math.min(1, availableW / rect.width, availableH / rect.height);
  frame.style.transform = `scale(${scale})`;
}

window.addEventListener('DOMContentLoaded', fitFrame);
window.addEventListener('load', fitFrame);
window.addEventListener('resize', fitFrame);
window.addEventListener('orientationchange', fitFrame);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(fitFrame);
}
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', fitFrame);
}
