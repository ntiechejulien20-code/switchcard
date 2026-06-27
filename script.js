/* ==
   PHOTOS — modifie uniquement les URLs ci-dessous pour changer
   les images du composant. Aucune autre ligne à toucher.
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

/* -- Mécanisme de switch A / B -- */
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
