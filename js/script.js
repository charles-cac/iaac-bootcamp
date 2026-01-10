// script.js — interactions and scroll-triggered reveals

document.addEventListener('DOMContentLoaded', function () {
  // IntersectionObserver for reveal animations
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => io.observe(r));

  // Smooth internal link scrolling + focus management
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // Fade-out navigation for landing links (preserve modifier-click behavior)
  const landingLinks = document.querySelectorAll('#home .btn-hero');
  landingLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
      const href = this.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      const block = document.querySelector('#home .hero-block');
      if (block) {
        block.classList.add('fade-out');
        setTimeout(() => { window.location.href = href; }, 320);
      } else {
        window.location.href = href;
      }
    });
  });

  // Lightbox for project thumbs
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox && lightbox.querySelector('img');
  const lbTitle = lightbox && lightbox.querySelector('.lightbox-caption h3');
  const lbSub = lightbox && lightbox.querySelector('.lightbox-caption p');

  function openLightbox(imgSrc, title, sub) {
    if (!lightbox) return;
    lbImg.src = imgSrc.replace('/900/900', '/1400/900');
    lbImg.alt = title + ' — ' + sub;
    lbTitle.textContent = title;
    lbSub.textContent = sub;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-thumb').forEach(btn => {
    btn.addEventListener('click', function () {
      const img = this.querySelector('img');
      const src = img ? img.src : '';
      const title = this.dataset.title || '';
      const sub = this.dataset.sub || '';
      openLightbox(src, title, sub);
    });
  });

  // close handlers
  document.querySelectorAll('[data-close], .lightbox-close').forEach(el => el.addEventListener('click', closeLightbox));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // allow clicking backdrop to close
  document.querySelectorAll('.lightbox-backdrop').forEach(b => b.addEventListener('click', closeLightbox));
});