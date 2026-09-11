import { useEffect, useRef } from 'react';

/**
 * Mouse-tracking 3D tilt with an optional moving light "glare".
 * Attach the returned ref to any element.
 */
export default function useTilt({ max = 10, glare = true, scale = 1.02 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover:hover)').matches;
    if (reduce || !canHover) return;

    let glareEl;
    if (glare) {
      glareEl = document.createElement('span');
      glareEl.className = 'tilt-glare';
      el.appendChild(glareEl);
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    }

    let raf = null, rx = 0, ry = 0;
    const apply = () => {
      el.style.transform =
        `perspective(900px) rotateX(${ry}deg) rotateY(${rx}deg) scale3d(${scale},${scale},${scale})`;
      raf = null;
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      rx = (px - 0.5) * 2 * max;
      ry = -(py - 0.5) * 2 * max;
      if (glareEl) {
        glareEl.style.setProperty('--gx', px * 100 + '%');
        glareEl.style.setProperty('--gy', py * 100 + '%');
      }
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onEnter = () => (el.style.transition = '');
    const onLeave = () => {
      el.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
      el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      if (glareEl) glareEl.remove();
    };
  }, [max, glare, scale]);

  return ref;
}
