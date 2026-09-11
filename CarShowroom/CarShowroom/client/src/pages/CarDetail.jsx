import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCar, createBooking } from '../api.js';
import CarDetailsView from '../components/CarDetailsView.jsx';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [state, setState] = useState('loading'); // loading | ok | error
  const [booking, setBooking] = useState({ state: 'idle', msg: '' });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(() => ({ name: '', email: sessionStorage.getItem('luxora-user') || '' }));

  useEffect(() => {
    let alive = true;
    setState('loading');
    getCar(id)
      .then((data) => alive && (setCar(data), setState('ok')))
      .catch(() => alive && setState('error'));
    return () => { alive = false; };
  }, [id]);

  const requestDrive = async (event) => {
    event.preventDefault();
    setBooking({ state: 'loading', msg: '' });
    try {
      const res = await createBooking({
        name: form.name.trim(),
        email: form.email.trim(),
        model: car.name,
        message: `Test drive request for ${car.name}`,
      });
      setBooking({ state: 'ok', msg: res.message || 'Request received!' });
      setShowForm(false);
    } catch (err) {
      setBooking({ state: 'error', msg: err.message });
    }
  };

  if (state === 'loading') {
    return <section className="detail section"><div className="container"><p className="loading">Loading vehicle…</p></div></section>;
  }

  if (state === 'error' || !car) {
    return (
      <section className="detail section">
        <div className="container detail-missing">
          <h2 className="section-title">Vehicle not found</h2>
          <p className="section-sub">This car may no longer be in our collection.</p>
          <Link to="/#inventory" className="btn btn-gold">← BACK TO INVENTORY</Link>
        </div>
      </section>
    );
  }

  const price = car.priceLabel || '$' + Number(car.price).toLocaleString('en-US');

  return (
    <section className="detail section">
      <div className="container">
        <button className="back-link" onClick={() => navigate(-1)}>← Back</button>

        <div className="detail-grid">
          <div className="detail-media" style={{ backgroundImage: `url('${car.image}')` }}>
            <span className="detail-badge">{car.brand}</span>
          </div>

          <div className="detail-info">
            <p className="eyebrow gold-eyebrow">{car.brand}</p>
            <h1 className="detail-title">{car.name}</h1>
            <p className="detail-price">{price}</p>
            <p className="detail-desc">{car.description}</p>

            <div className="detail-specs">
              <div className="spec"><span className="spec-label">Engine</span><span className="spec-val">{car.engine}</span></div>
              <div className="spec"><span className="spec-label">Power</span><span className="spec-val">{car.horsepower} HP</span></div>
              <div className="spec"><span className="spec-label">Seats</span><span className="spec-val">{car.seats}</span></div>
              <div className="spec"><span className="spec-label">Status</span><span className="spec-val">{car.featured ? 'Featured' : 'In stock'}</span></div>
            </div>

            <div className="detail-actions">
              <button className="btn btn-gold" onClick={() => { setBooking({ state: 'idle', msg: '' }); setShowForm(true); }}>
                REQUEST TEST DRIVE <span className="arr">→</span>
              </button>
              <Link to="/#contact" className="btn btn-ghost">CONTACT CONCIERGE</Link>
            </div>

            {booking.state === 'ok' && <p className="form-msg ok">{booking.msg}</p>}
            {booking.state === 'error' && <p className="form-msg err">{booking.msg}</p>}
            {showForm && <form className="detail-booking-form" onSubmit={requestDrive}>
              <label>Full name<input required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} /></label>
              <label>Email address<input required type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} /></label>
              <div><button className="btn btn-gold" disabled={booking.state === 'loading'}>{booking.state === 'loading' ? 'SENDING…' : 'SEND REQUEST'}</button><button type="button" className="detail-form-cancel" onClick={() => setShowForm(false)}>Cancel</button></div>
            </form>}
          </div>
        </div>
        <CarDetailsView car={car} />
      </div>
    </section>
  );
}
