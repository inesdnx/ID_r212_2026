
// exercice 1 - menu burger

// étape 1 - ouvrir/fermer

const bouton = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

bouton.addEventListener('click', () => { // étape 3 - aria-expanded (on a mis à jour ce bloc)
  menu.classList.toggle('is-open');
  const isOpen = menu.classList.contains('is-open');
  bouton.setAttribute('aria-expanded', isOpen);
});

// étape 2 - accessibilité clavier (fermer avec echap)

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    menu.classList.remove('is-open');
    bouton.focus(); // remettre le focus sur le bouton
  }
});

// exercice 2 - modale accessible (pop up "en savoir plus")

// étape 1 - ouvrir/fermer

const btnOpen = document.querySelector('.modal-open');
const btnClose = document.querySelector('.modal-close');
const modal = document.querySelector('.modal');

btnOpen.addEventListener('click', () => {
  modal.classList.add('is-visible');
});

btnClose.addEventListener('click', () => {
  modal.classList.remove('is-visible');
});

// étape 2 - fermer avec Escape

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
    modal.classList.remove('is-visible');
    btnOpen.focus();
  }
});

// étape 3 - fermer en cliquant sur l'overlay (la partie sombre/extérieur)

modal.addEventListener('click', (event) => {
  // Si le clic est sur le fond (la modale elle-même), pas sur son contenu
  if (event.target === modal) {
    modal.classList.remove('is-visible');
    btnOpen.focus();
  }
});

// étape 4 - aria-hidden

function ouvrirModale() {
  modal.classList.add('is-visible');
  modal.setAttribute('aria-hidden', 'false');
}

function fermerModale() {
  modal.classList.remove('is-visible');
  modal.setAttribute('aria-hidden', 'true');
  btnOpen.focus();
}

btnOpen.addEventListener('click', ouvrirModale);
btnClose.addEventListener('click', fermerModale);

// exercice 3 - accordéon (FAQ)

// étape 1 - toggle simple (ouvre et ferme les menus FAQ)

const questions = document.querySelectorAll('.faq-question');

questions.forEach((question) => { // étape 2 - un seul ouvert à la fois (on a mis à jour ce bloc)
  question.addEventListener('click', () => {
    const reponse = question.nextElementSibling;
    const estDejaOuverte = reponse.classList.contains('is-visible');

    // Fermer toutes les réponses
    document.querySelectorAll('.faq-answer').forEach((r) => {
      r.classList.remove('is-visible');
    });

    // Si elle n'était pas ouverte, l'ouvrir
    if (!estDejaOuverte) {
      reponse.classList.add('is-visible');
    }
  });
});

// exercice 4 - thème sombre

const btnTheme = document.querySelector('#theme-toggle');

btnTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  const isDark = document.body.classList.contains('dark');
  btnTheme.textContent = isDark ? '☀️ Clair' : '🌙 Sombre';
});

