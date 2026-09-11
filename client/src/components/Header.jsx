import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LINKS = [
  ['HOME', '/home'],
  ['INVENTORY', '/inventory'],
  ['SERVICES', '/#services'],
  ['ABOUT US', '/#about'],
  ['CONTACT', '/#contact'],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = Boolean(sessionStorage.getItem('luxora-admin-token'));

  const signOut = () => {
    sessionStorage.removeItem('luxora-admin');
    sessionStorage.removeItem('luxora-admin-token');
    sessionStorage.removeItem('luxora-user');
    navigate('/login');
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-wrap">
        <Link to="/home" className="brand">
          <span className="brand-mark">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" stroke="currentColor" strokeWidth="1.3" />
              <path d="M12 7v10M8.5 10.5 12 7l3.5 3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="brand-text">LUXORA<small>MOTORS</small></span>
        </Link>

        <nav className={`main-nav ${open ? 'open' : ''}`}>
          {LINKS.map(([label, to]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link to={isAdmin ? '/admin' : '/login'} onClick={() => setOpen(false)}>{isAdmin ? 'DASHBOARD' : 'LOGIN'}</Link>
        </nav>

        <Link to="/#contact" className="btn btn-outline nav-cta">BOOK A TEST DRIVE</Link>
        {isAdmin && <button type="button" className="nav-signout" onClick={signOut}>SIGN OUT</button>}

        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
