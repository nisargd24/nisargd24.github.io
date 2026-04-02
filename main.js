/* ════════════════════════════════════════════════════
   MECH.DEV PORTFOLIO — SHARED JS
   ════════════════════════════════════════════════════ */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1800);
});

/* ── CUSTOM CURSOR ── */
(function() {
  const cursorOuter = document.getElementById('cursor-outer');
  const cursorInner = document.getElementById('cursor-inner');
  const cursorGear  = document.getElementById('cursor-gear');
  if (!cursorOuter) return;

  let mouseX = 0, mouseY = 0;
  let outerX = 0, outerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorInner.style.left = mouseX + 'px';
    cursorInner.style.top  = mouseY + 'px';
    cursorGear.style.left  = mouseX + 'px';
    cursorGear.style.top   = mouseY + 'px';
  });

  function animateCursor() {
    outerX += (mouseX - outerX) * 0.12;
    outerY += (mouseY - outerY) * 0.12;
    cursorOuter.style.left = outerX + 'px';
    cursorOuter.style.top  = outerY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .project-card, .expertise-card, .tool-card, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOuter.style.width  = '56px';
      cursorOuter.style.height = '56px';
      cursorOuter.style.borderColor = 'rgba(255,107,0,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursorOuter.style.width  = '36px';
      cursorOuter.style.height = '36px';
      cursorOuter.style.borderColor = '#FF6B00';
    });
  });
})();

/* ── FADE-IN OBSERVER ── */
(function() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();

/* ── NAV: ACTIVE LINKS + SCROLL CLASS ── */
(function() {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled class
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);

    // Active link highlight (only on single-page)
    if (!sections.length) return;
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current || a.getAttribute('href') === (current ? '' : '#'));
    });

    // Scroll-to-top
    const st = document.getElementById('scroll-top');
    if (st) st.classList.toggle('visible', window.scrollY > 400);
  });
})();

/* ── MOBILE MENU ── */
(function() {
  const btn  = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
})();

/* ── PROJECT FILTER (projects page / section) ── */
window.filterProjects = function(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat;
    card.style.display = show ? 'block' : 'none';
  });
};

/* ── CONTACT FORM (basic feedback) ── */
(function() {
  const form = document.querySelector('.contact-form');
  const btn  = form && form.querySelector('.form-submit');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const name  = form.querySelector('input[name="name"]')?.value?.trim();
    const email = form.querySelector('input[name="email"]')?.value?.trim();
    const msg   = form.querySelector('textarea')?.value?.trim();
    if (!name || !email || !msg) {
      btn.textContent = 'Fill All Fields →';
      setTimeout(() => btn.textContent = 'Send Message →', 2000);
      return;
    }
    btn.textContent = 'Sent! ✓';
    btn.style.background = '#00cc66';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
    }, 3000);
  });
})();
