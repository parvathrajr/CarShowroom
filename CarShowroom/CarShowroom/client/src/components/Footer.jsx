import { Link } from 'react-router-dom';

const COLS = [
  ['Explore', [['Inventory', '/inventory'], ['Services', '/#services'], ['About Us', '/#about'], ['Contact', '/#contact']]],
  ['Support', [['Financing', '/#contact'], ['Warranty', '/#contact'], ['FAQ', '/#contact'], ['Admin', '/admin']]],
  ['Get in Touch', [['+1 (800) 555-0199', '/#contact'], ['hello@luxoramotors.com', '/#contact'], ['1 Beverly Hills, CA', '/#contact']]],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </span>
            <span className="brand-text">LUXORA<small>MOTORS</small></span>
          </Link>
          <p className="footer-about">
            Curating the world's finest automobiles for the most discerning drivers since 2004.
          </p>
        </div>

        {COLS.map(([title, links]) => (
          <div className="footer-col" key={title}>
            <h5>{title}</h5>
            {links.map(([label, to]) => <Link to={to} key={label}>{label}</Link>)}
          </div>
        ))}
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Luxora Motors. All rights reserved.</p>
        <div className="socials">
          <a href="#" aria-label="Instagram">Ig</a>
          <a href="#" aria-label="Facebook">Fb</a>
          <a href="#" aria-label="X">X</a>
        </div>
      </div>
    </footer>
  );
}
