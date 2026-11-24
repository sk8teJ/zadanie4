'use strict';
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const toggle = document.querySelector('#menu-toggle');
const links = document.querySelectorAll('.menu a');
function closeMenu() {
  if (!toggle) return;
  toggle.checked = false;
  toggle.setAttribute('aria-expanded', 'false');
}
if (toggle) {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('change', () => toggle.setAttribute('aria-expanded', String(toggle.checked)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}
links.forEach(link => link.addEventListener('click', closeMenu));

const sections = document.querySelectorAll('main [id]');
if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const active = document.querySelector(`.menu a[href="#${entry.target.id}"]`);
      if (!active) return;
      links.forEach(link => {
        const selected = link === active;
        link.classList.toggle('active', selected);
        if (selected) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
}