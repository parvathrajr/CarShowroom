import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useTilt from '../hooks/useTilt.js';

const STATS = [
  ['PREMIUM BRANDS', '50+'],
  ['LUXURY MODELS', '100+'],
  ['HAPPY CLIENTS', '10K+'],
];

export default function Hero() {
  const sceneRef = useRef(null);
  const copyRef = useTilt({ max: 6, glare: false, scale: 1 });
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (!isVideoOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsVideoOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isVideoOpen]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const layers = [...scene.querySelectorAll('.hero-layer')];
    let raf = null, mx = 0, my = 0;

    const render = () => {
      layers.forEach((l) => {
        const d = parseFloat(l.dataset.depth) || 0.2;
        l.style.transform =
          `translate3d(${mx * d * 40}px, ${my * d * 40}px, ${d * 60}px) rotateY(${mx * d * 6}deg)`;
      });
      raf = null;
    };
    const onMove = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(render);
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-scene" ref={sceneRef}>
        <video className="hero-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1800&q=80">
          <source src="https://videos.pexels.com/video-files/3764259/3764259-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>
        <div className="hero-layer hero-glow" data-depth="0.2"></div>
      </div>
      <div className="hero-vignette"></div>

      <div className="container hero-inner">
        <div className="hero-copy" ref={copyRef}>
          <p className="eyebrow">DRIVE THE EXTRAORDINARY</p>
          <h1 className="hero-title">Luxury<br /><span className="gold">Redefined.</span></h1>
          <p className="hero-text">
            Discover elite performance, unmatched comfort, and timeless design. Your dream car awaits.
          </p>

          <div className="hero-actions">
            <Link to="/inventory" className="btn btn-gold">EXPLORE INVENTORY <span className="arr">→</span></Link>
            <button type="button" className="btn btn-ghost" onClick={() => setIsVideoOpen(true)}>
              <span className="play">▶</span> WATCH VIDEO
            </button>
          </div>

          <div className="hero-stats">
            {STATS.map(([label, num]) => (
              <div className="stat" key={label}>
                <span className="stat-label">{label}</span>
                <span className="stat-num">{num}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isVideoOpen && (
        <div className="video-modal" role="dialog" aria-modal="true" aria-labelledby="showreel-title" onMouseDown={() => setIsVideoOpen(false)}>
          <div className="video-modal-card" onMouseDown={(event) => event.stopPropagation()}>
            <div className="video-modal-heading">
              <div>
                <p className="eyebrow">LUXORA MOTORS</p>
                <h2 id="showreel-title">The Collection in Motion</h2>
              </div>
              <button type="button" className="video-modal-close" onClick={() => setIsVideoOpen(false)} aria-label="Close video">×</button>
            </div>
            <video className="showreel-video" controls autoPlay playsInline>
              <source src="https://videos.pexels.com/video-files/3764259/3764259-hd_1920_1080_24fps.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
