// script.js — SPA navigation + reveal animations

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const navButtons = document.querySelectorAll('[data-target]');
  const TRANSITION_MS = 420;

  function showSection(id, updateHash = true) {
    const target = document.getElementById(id);
    if (!target) return;
    sections.forEach(section => {
      if (section === target) {
        section.classList.add('active');
        section.removeAttribute('aria-hidden');
      } else {
        section.classList.remove('active');
        section.setAttribute('aria-hidden', 'true');
      }
    });
    // manage focus for accessibility
    setTimeout(() => {
      const h = target.querySelector('h2, h1');
      if (h) {
        h.setAttribute('tabindex', '-1');
        h.focus();
      }
    }, TRANSITION_MS);

    if (updateHash) {
      history.pushState({ section: id }, '', '#' + id);
    }
  }

  // initialize from hash or default home
  const initial = location.hash ? location.hash.replace('#', '') : 'home';
  showSection(initial, false);

  // nav button clicks
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.target;
      showSection(target, true);
    });
  });

  // back/forward handling
  window.addEventListener('popstate', () => {
    const id = location.hash ? location.hash.replace('#', '') : 'home';
    showSection(id, false);
  });

  // IntersectionObserver reveal animations for elements with .reveal
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => io.observe(r));
  }
});