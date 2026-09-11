import { useState } from 'react';
import { createBooking } from '../api.js';

const EMPTY = { name: '', email: '', model: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', msg: '' });
    try {
      const res = await createBooking(form);
      setStatus({ state: 'success', msg: res.message || 'Request received!' });
      setForm(EMPTY);
    } catch (err) {
      setStatus({ state: 'error', msg: err.message || 'Something went wrong.' });
    }
  };

  return (
    <section className="cta section" id="contact">
      <div className="container cta-inner">
        <p className="eyebrow gold-eyebrow">READY TO DRIVE?</p>
        <h2 className="section-title">Book Your Private Test Drive</h2>
        <p className="section-sub">
          Leave your details and a personal concierge will reach out to arrange your experience.
        </p>

        <form className="cta-form" onSubmit={submit}>
          <input name="name" value={form.name} onChange={update} type="text" placeholder="Full Name" required />
          <input name="email" value={form.email} onChange={update} type="email" placeholder="Email Address" required />
          <input name="model" value={form.model} onChange={update} type="text" placeholder="Preferred Model" />
          <button type="submit" className="btn btn-gold" disabled={status.state === 'loading'}>
            {status.state === 'loading' ? 'SENDING…' : 'REQUEST TEST DRIVE'} <span className="arr">→</span>
          </button>
        </form>

        {status.state === 'success' && <p className="form-msg ok">{status.msg}</p>}
        {status.state === 'error' && <p className="form-msg err">{status.msg}</p>}
      </div>
    </section>
  );
}
