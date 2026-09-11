import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api.js';

export default function Login() {
  const [role, setRole] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const isAdmin = role === 'admin';

  useEffect(() => {
    const onMove = (event) => {
      document.documentElement.style.setProperty('--login-x', `${event.clientX / window.innerWidth * 100}%`);
      document.documentElement.style.setProperty('--login-y', `${event.clientY / window.innerHeight * 100}%`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');
    if (!isAdmin) {
      sessionStorage.setItem('luxora-user', email);
      navigate('/home');
      return;
    }
    setMessage('');
    setSubmitting(true);
    try {
      const result = await loginAdmin(email, password);
      sessionStorage.setItem('luxora-admin-token', result.token);
      sessionStorage.setItem('luxora-admin', 'verified');
      navigate('/admin');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <video className="login-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1800&q=80"><source src="https://videos.pexels.com/video-files/3764259/3764259-hd_1920_1080_24fps.mp4" type="video/mp4" /></video>
      <div className="login-overlay" aria-hidden="true"></div>
      <section className="login-content container" aria-label="Login">
        <div className="login-intro"><p className="eyebrow gold-eyebrow">LUXORA PRIVATE ACCESS</p><h1>Every exceptional<br /><span className="gold">drive</span> starts here.</h1><p>Sign in to discover exceptional vehicles, arrange priority test drives and access your Luxora experience.</p><div className="login-feature-list" aria-hidden="true"><span>✦ Curated collection</span><span>✦ Priority appointments</span><span>✦ Concierge support</span></div></div>
        <div className="login-card">
          <div className="login-card-head"><p className="eyebrow">WELCOME BACK</p><h2>{isAdmin ? 'Admin sign in' : 'Welcome to Luxora'}</h2><p>{isAdmin ? 'Use the showroom administrator credentials to continue.' : 'Sign in to continue to the Luxora showroom.'}</p></div>
          <div className="login-role-toggle" role="tablist" aria-label="Login type"><button type="button" role="tab" aria-selected={!isAdmin} className={!isAdmin ? 'active' : ''} onClick={() => { setRole('customer'); setMessage(''); }}>Customer</button><button type="button" role="tab" aria-selected={isAdmin} className={isAdmin ? 'active' : ''} onClick={() => { setRole('admin'); setMessage(''); }}>Admin</button></div>
          <form className="login-form" onSubmit={submit}>
            <label><span>{isAdmin ? 'Admin email' : 'Email address'}</span><input name="email" type="email" autoComplete="email" placeholder={isAdmin ? 'admin@luxoramotors.com' : 'you@example.com'} required /></label>
            <label><span>Password{isAdmin ? '' : ' (optional)'}</span><div className="password-field"><input name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder={isAdmin ? 'Enter your password' : 'Not required for showroom access'} required={isAdmin} /><button type="button" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></div></label>
            <div className="login-options"><label className="remember-me"><input type="checkbox" name="remember" /> Remember me</label><button type="button" className="text-button" onClick={() => setMessage(isAdmin ? 'Contact the system owner to reset the administrator password.' : 'Password recovery will be available when customer accounts are connected.')}>Forgot password?</button></div>
            {message && <p className="login-message" role="status">{message}</p>}
            <button type="submit" className="btn btn-gold login-submit" disabled={submitting}>{submitting ? 'VERIFYING…' : isAdmin ? 'OPEN ADMIN DASHBOARD' : 'ENTER SHOWROOM'} <span className="arr">→</span></button>
          </form>
        </div>
      </section>
    </main>
  );
}
