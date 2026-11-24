'use strict';

const menuToggle = document.querySelector('#menu-toggle');
const menuLinks = document.querySelectorAll('.menu a');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

function closeMenu() {
  if (!menuToggle) return;
  menuToggle.checked = false;
  menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.addEventListener('change', () => {
    menuToggle.setAttribute('aria-expanded', String(menuToggle.checked));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
    menuLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});
