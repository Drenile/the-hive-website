/* =========================================================
   THE HIVE — app.js
   Handles: mobile nav, tab switcher, news carousel,
            scroll reveal, marquee ticker
========================================================= */

/* ─────────────────────────────────────────
   MOBILE NAV
───────────────────────────────────────── */
const menuBtn   = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    menuBtn.classList.toggle('is-open', !isOpen);
    mobileNav.hidden = isOpen;
  });
}

/* ─────────────────────────────────────────
   GET INVOLVED — TAB SWITCHER
   Only active on desktop (>860px).
   On mobile all panels are shown via CSS.
───────────────────────────────────────── */
const tabs   = document.querySelectorAll('.roleTab');
const panels = document.querySelectorAll('.rolePanel');

function isDesktop() {
  return window.matchMedia('(min-width: 861px)').matches;
}

function initTabs() {
  if (!tabs.length || !panels.length) return;

  // On desktop: show only active panel, hide others
  // On mobile:  show all panels (CSS handles layout)
  panels.forEach(panel => {
    if (isDesktop()) {
      panel.style.display = panel.classList.contains('is-active') ? '' : 'none';
    } else {
      panel.style.display = ''; // show all
    }
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    if (!isDesktop()) return; // tabs do nothing on mobile

    const target = tab.dataset.tab;

    tabs.forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');

    panels.forEach(panel => {
      const isActive = panel.dataset.panel === target;
      panel.classList.toggle('is-active', isActive);
      panel.style.display = isActive ? '' : 'none';
    });
  });
});

// Re-run on resize so switching between mobile/desktop resets correctly
window.addEventListener('resize', initTabs);
initTabs();

/* ─────────────────────────────────────────
   NEWS CAROUSEL
───────────────────────────────────────── */
(function () {
  const track      = document.getElementById('newsTrack')  || document.querySelector('[data-track]');
  const arrowLeft  = document.getElementById('arrowLeft')  || document.querySelector('[data-prev]');
  const arrowRight = document.getElementById('arrowRight') || document.querySelector('[data-next]');

  if (!track || !arrowLeft || !arrowRight) return;

  const cards = Array.from(track.querySelectorAll('.newsCard'));
  const GAP   = 22;
  let   idx   = 0;

  function cardW()   { return cards[0] ? cards[0].offsetWidth : 320; }
  function visible() { return Math.max(1, Math.floor((track.parentElement.offsetWidth + GAP) / (cardW() + GAP))); }
  function maxIdx()  { return Math.max(0, cards.length - visible()); }

  const isMobile = () => window.innerWidth <= 700;

  function goTo(n) {
    if (isMobile()) return;          // native scroll handles it on mobile
    idx = Math.max(0, Math.min(n, maxIdx()));
    track.style.transform = `translateX(-${idx * (cardW() + GAP)}px)`;
    arrowLeft.disabled  = idx === 0;
    arrowRight.disabled = idx >= maxIdx();
    arrowLeft.classList.toggle('is-disabled',  arrowLeft.disabled);
    arrowRight.classList.toggle('is-disabled', arrowRight.disabled);
  }

  arrowLeft.addEventListener('click',  () => goTo(idx - 1));
  arrowRight.addEventListener('click', () => goTo(idx + 1));

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (isMobile()) { track.style.transform = ''; return; }
      goTo(Math.min(idx, maxIdx()));
    }, 120);
  });

  goTo(0);
})();

/* ─────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => obs.observe(el));
})();

/* ─────────────────────────────────────────
   MARQUEE PAUSE-ON-HOVER
───────────────────────────────────────── */
(function () {
  document.querySelectorAll('.statsTicker__inner, .marquee__inner').forEach(track => {
    const parent = track.closest('.statsTicker__track') || track.parentElement;
    parent.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    parent.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  });
})();