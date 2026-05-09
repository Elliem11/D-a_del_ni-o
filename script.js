

document.addEventListener('DOMContentLoaded', () => {

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = (i % 4) * 100;
    revealObserver.observe(el);
  });

  const sections  = document.querySelectorAll('section[id], header[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 90) current = s.id;
    });
    navLinks.forEach(l => {
      l.style.background = '';
      if (l.getAttribute('href') === '#' + current) {
        l.style.background = 'var(--amarillo)';
      }
    });
  }, { passive: true });

  document.querySelectorAll('.derecho-card, .act-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(800px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) translateY(-8px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';
      setTimeout(() => card.style.transition = '', 500);
    });
  });


  const colors = ['#FF3D5A','#FF7C2A','#FFD23F','#26C97E','#29B6F6','#9C27B0','#FF4FA3'];
  const emojis = ['🎈','⭐','🌈','🎉','💛','🎠','🪀','🦋','🎊'];

  document.addEventListener('click', e => {
    for (let i = 0; i < 6; i++) {
      const el = document.createElement('span');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = `
        position:fixed;
        left:${e.clientX}px;
        top:${e.clientY}px;
        font-size:${1.2 + Math.random()}rem;
        pointer-events:none;
        z-index:9999;
        user-select:none;
        transition:transform 0.8s ease, opacity 0.8s ease;
        transform:translate(0,0) scale(1);
        opacity:1;
      `;
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        const angle  = (Math.random() * 360) * Math.PI / 180;
        const dist   = 60 + Math.random() * 80;
        el.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist - 60}px) scale(0)`;
        el.style.opacity   = '0';
      });
      setTimeout(() => el.remove(), 900);
    }
  });

  
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.padding = '6px 0';
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,.12)';
    } else {
      navbar.style.padding = '14px 0';
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,.07)';
    }
  }, { passive: true });

 
  const carousel = document.getElementById('carouselVolver');
  if (carousel) {
    new bootstrap.Carousel(carousel, { interval: 3500, ride: 'carousel' });
  }

});