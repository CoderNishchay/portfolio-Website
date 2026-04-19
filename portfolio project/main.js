/* ═══════════════════════════════════════════════
   CLASSY PORTFOLIO — main.js
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR SCROLL EFFECT ── */
  const nav = document.getElementById('mainNav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });


  /* ── 2. SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── 3. BACK TO TOP BUTTON ── */
  const btt = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btt.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ── 4. SMOOTH NAV LINK CLOSE ON MOBILE ── */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const toggler = document.querySelector('.navbar-toggler');
      const menu = document.getElementById('navMenu');
      if (menu.classList.contains('show')) {
        toggler.click();
      }
    });
  });


  /* ── 5. ACTIVE NAV HIGHLIGHT ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--charcoal)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ── 6. HERO TYPING EFFECT ── */
  const eyebrow = document.querySelector('#hero .section-eyebrow');
  if (eyebrow) {
    const text = eyebrow.textContent;
    eyebrow.innerHTML = '<span class="gold-rule"></span>';
    const span = document.createElement('span');
    eyebrow.appendChild(span);
    let i = 0;
    // skip the "gold-rule" prefix text
    const words = text.replace(/^[\s\S]*Computer/, 'Computer');
    const type = () => {
      if (i < words.length) {
        span.textContent += words[i++];
        setTimeout(type, 45);
      }
    };
    setTimeout(type, 600);
  }


  /* ── 7. STAT COUNTER ANIMATION ── */
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const sup = el.querySelector('sup');
        const rawText = el.textContent.replace(/[^0-9.]/g, '');
        const target = parseFloat(rawText);
        const isDecimal = rawText.includes('.');
        const duration = 1200;
        const start = performance.now();

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = isDecimal
            ? (target * eased).toFixed(1)
            : Math.floor(target * eased);
          el.textContent = current;
          if (sup) el.appendChild(sup);
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));


  /* ── 8. PROJECT CARD TILT EFFECT ── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ── 9. FOOTER YEAR ── */
  const yearEl = document.querySelector('footer');
  if (yearEl) {
    yearEl.innerHTML = yearEl.innerHTML.replace('2026', new Date().getFullYear());
  }

});
