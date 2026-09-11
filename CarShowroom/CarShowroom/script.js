// ===== Header background on scroll =====
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Mobile menu toggle =====
const toggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => menu.classList.remove('open'))
);

// ===== Favourite hearts =====
document.querySelectorAll('.fav').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== 3D Tilt engine (mouse-tracking, with glare) =====
function initTilt(el) {
  const max = parseFloat(el.dataset.tiltMax) || 10;
  const wantGlare = el.hasAttribute('data-tilt-glare');
  let glare;

  if (wantGlare) {
    glare = document.createElement('span');
    glare.className = 'tilt-glare';
    el.appendChild(glare);
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
  }

  let raf = null, tx = 0, ty = 0;

  const apply = () => {
    el.style.transform =
      `perspective(900px) rotateX(${ty}deg) rotateY(${tx}deg) scale3d(1.02,1.02,1.02)`;
    raf = null;
  };

  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0..1
    const py = (e.clientY - r.top) / r.height;   // 0..1
    tx = (px - 0.5) * 2 * max;
    ty = -(py - 0.5) * 2 * max;
    if (glare) {
      glare.style.setProperty('--gx', px * 100 + '%');
      glare.style.setProperty('--gy', py * 100 + '%');
    }
    if (!raf) raf = requestAnimationFrame(apply);
  });

  el.addEventListener('mouseleave', () => {
    el.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    setTimeout(() => (el.style.transition = ''), 500);
  });
  el.addEventListener('mouseenter', () => (el.style.transition = ''));
}

if (!reduceMotion && window.matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(initTilt);
}

// ===== Hero parallax (layered depth reacting to mouse) =====
const scene = document.getElementById('heroScene');
if (scene && !reduceMotion) {
  const layers = [...scene.querySelectorAll('.hero-layer')];
  let sraf = null, mx = 0, my = 0;

  const render = () => {
    layers.forEach(l => {
      const d = parseFloat(l.dataset.depth) || 0.2;
      const x = mx * d * 40;
      const y = my * d * 40;
      const rot = mx * d * 6;
      l.style.transform =
        `translate3d(${x}px, ${y}px, ${d * 60}px) rotateY(${rot}deg)`;
    });
    sraf = null;
  };

  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth) - 0.5;
    my = (e.clientY / window.innerHeight) - 0.5;
    if (!sraf) sraf = requestAnimationFrame(render);
  });

  // gentle scroll parallax
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    layers.forEach(l => {
      const d = parseFloat(l.dataset.depth) || 0.2;
      l.style.marginTop = (s * d * 0.25) + 'px';
    });
  }, { passive: true });
}

// ===== 3D reveal on scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'none';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .car-card, .why-item, .section-head').forEach((el, i) => {
  el.style.opacity = 0;
  el.style.transform = 'perspective(1000px) translateY(34px) rotateX(-12deg)';
  el.style.transition =
    `opacity .7s ease ${(i % 4) * 0.09}s, transform .7s cubic-bezier(.2,.7,.2,1) ${(i % 4) * 0.09}s`;
  io.observe(el);
});
