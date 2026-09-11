import { useEffect, useState } from 'react';
import {
  createCar, deleteBooking, deleteCar, getBookings, getCars, updateBooking, updateCar,
} from '../api.js';

const STATUSES = ['pending', 'contacted', 'completed'];
const EMPTY_CAR = { name: '', brand: '', price: '', engine: '', horsepower: '', seats: '', image: '', description: '', featured: false };

function fmtDate(iso) {
  return iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
}
function money(value) { return `$${Number(value || 0).toLocaleString('en-US')}`; }

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [state, setState] = useState('loading');
  const [error, setError] = useState('');
  const [tab, setTab] = useState('overview');
  const [form, setForm] = useState(EMPTY_CAR);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setState('loading'); setError('');
    try {
      const [bookingData, carData] = await Promise.all([getBookings(), getCars()]);
      setBookings(bookingData); setCars(carData); setState('ok');
    } catch (err) { setError(err.message); setState('error'); }
  };
  useEffect(() => { load(); }, []);

  const counts = STATUSES.reduce((acc, status) => ({ ...acc, [status]: bookings.filter((b) => b.status === status).length }), {});
  const pipelineValue = cars.reduce((total, car) => total + Number(car.price || 0), 0);

  const changeStatus = async (id, status) => {
    const previous = bookings;
    setBookings((items) => items.map((item) => item._id === id ? { ...item, status } : item));
    try { await updateBooking(id, { status }); } catch { setBookings(previous); }
  };
  const removeBooking = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    const previous = bookings; setBookings((items) => items.filter((item) => item._id !== id));
    try { await deleteBooking(id); } catch { setBookings(previous); }
  };
  const onField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };
  const saveCar = async (event) => {
    event.preventDefault(); setSaving(true);
    const payload = { ...form, price: Number(form.price), horsepower: Number(form.horsepower), seats: Number(form.seats) };
    try {
      if (editingId) {
        const updated = await updateCar(editingId, payload);
        setCars((items) => items.map((item) => item._id === editingId ? updated : item));
      } else {
        const created = await createCar(payload); setCars((items) => [...items, created].sort((a, b) => a.price - b.price));
      }
      setForm(EMPTY_CAR); setEditingId(null); setTab('inventory');
    } catch (err) { window.alert(`Could not save vehicle: ${err.message}`); } finally { setSaving(false); }
  };
  const editCar = (car) => {
    setForm({ name: car.name, brand: car.brand, price: car.price, engine: car.engine, horsepower: car.horsepower, seats: car.seats, image: car.image, description: car.description || '', featured: car.featured });
    setEditingId(car._id); setTab('vehicle'); window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const removeCar = async (id) => {
    if (!window.confirm('Remove this vehicle from inventory?')) return;
    const previous = cars; setCars((items) => items.filter((item) => item._id !== id));
    try { await deleteCar(id); } catch { setCars(previous); }
  };

  return (
    <main className="admin-page section">
      <div className="container">
        <div className="admin-topbar">
          <div><p className="eyebrow gold-eyebrow">LUXORA CONTROL ROOM</p><h1 className="section-title left">Admin Dashboard</h1><p className="admin-intro">Manage showroom inventory and customer enquiries in one place.</p></div>
          <button className="btn btn-ghost" onClick={load}>↻ REFRESH DATA</button>
        </div>

        <nav className="admin-tabs" aria-label="Dashboard sections">
          {[['overview', 'Overview'], ['bookings', `Enquiries (${bookings.length})`], ['inventory', `Inventory (${cars.length})`], ['vehicle', editingId ? 'Edit vehicle' : 'Add vehicle']].map(([key, label]) => (
            <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>{label}</button>
          ))}
        </nav>

        {state === 'loading' && <p className="loading">Loading dashboard data…</p>}
        {state === 'error' && <p className="form-msg err">Could not load dashboard: {error}. Is the API running?</p>}
        {state === 'ok' && <>
          {tab === 'overview' && <section className="dashboard-overview">
            <div className="dashboard-stats">
              <Stat label="Total enquiries" value={bookings.length} note={`${counts.pending || 0} awaiting follow-up`} />
              <Stat label="Active inventory" value={cars.length} note={`${cars.filter((car) => car.featured).length} featured vehicles`} />
              <Stat label="Inventory value" value={money(pipelineValue)} note="Current listed value" />
              <Stat label="Completion rate" value={`${bookings.length ? Math.round(((counts.completed || 0) / bookings.length) * 100) : 0}%`} note="Enquiries completed" />
            </div>
            <div className="dashboard-panels">
              <div className="dashboard-panel"><div className="panel-heading"><h2>Enquiry pipeline</h2><button onClick={() => setTab('bookings')}>View all →</button></div>
                {STATUSES.map((status) => <div className="pipeline-row" key={status}><span className={`status-dot ${status}`}></span><span>{status}</span><strong>{counts[status] || 0}</strong></div>)}
              </div>
              <div className="dashboard-panel"><div className="panel-heading"><h2>Latest enquiries</h2><button onClick={() => setTab('bookings')}>Manage →</button></div>
                {bookings.slice(0, 4).map((b) => <div className="recent-row" key={b._id}><div><strong>{b.name}</strong><span>{b.model || 'General enquiry'} · {fmtDate(b.createdAt)}</span></div><em className={`status-pill ${b.status}`}>{b.status}</em></div>)}
                {!bookings.length && <p className="admin-empty">No enquiries yet.</p>}
              </div>
            </div>
          </section>}

          {tab === 'bookings' && <section className="admin-content"><div className="content-heading"><h2>Customer enquiries</h2><span>{bookings.length} total</span></div>{bookings.length ? <div className="table-wrap"><table className="admin-table"><thead><tr><th>Date</th><th>Customer</th><th>Vehicle</th><th>Message</th><th>Status</th><th></th></tr></thead><tbody>{bookings.map((b) => <tr key={b._id}><td data-label="Date">{fmtDate(b.createdAt)}</td><td data-label="Customer"><strong>{b.name}</strong><small>{b.email}</small></td><td data-label="Vehicle">{b.model || '—'}</td><td data-label="Message" className="message-cell">{b.message || '—'}</td><td data-label="Status"><select className={`status-select status-${b.status}`} value={b.status} onChange={(e) => changeStatus(b._id, e.target.value)}>{STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}</select></td><td><button className="row-del" onClick={() => removeBooking(b._id)} aria-label="Delete enquiry">✕</button></td></tr>)}</tbody></table></div> : <p className="admin-empty">No enquiries have been submitted.</p>}</section>}

          {tab === 'inventory' && <section className="admin-content"><div className="content-heading"><h2>Vehicle inventory</h2><button className="btn btn-gold btn-small" onClick={() => { setForm(EMPTY_CAR); setEditingId(null); setTab('vehicle'); }}>+ ADD VEHICLE</button></div><div className="inventory-list">{cars.map((car) => <article className="inventory-item" key={car._id}><img src={car.image} alt="" /><div><p>{car.brand}</p><h3>{car.name}</h3><span>{car.engine} · {car.horsepower} HP · {car.seats} seats</span></div><strong>{money(car.price)}</strong><span className={`feature-toggle ${car.featured ? 'on' : ''}`}>{car.featured ? 'Featured' : 'Standard'}</span><div className="inventory-actions"><button onClick={() => editCar(car)}>Edit</button><button className="danger" onClick={() => removeCar(car._id)}>Remove</button></div></article>)}</div></section>}

          {tab === 'vehicle' && <section className="admin-content vehicle-editor"><div className="content-heading"><div><h2>{editingId ? 'Edit vehicle' : 'Add vehicle'}</h2><span>Changes appear in the showroom immediately.</span></div></div><form className="vehicle-form" onSubmit={saveCar}><label>Vehicle name<input required name="name" value={form.name} onChange={onField} placeholder="e.g. Aventador SVJ" /></label><label>Brand<input required name="brand" value={form.brand} onChange={onField} placeholder="e.g. Lamborghini" /></label><label>Price (USD)<input required min="0" type="number" name="price" value={form.price} onChange={onField} /></label><label>Engine<input required name="engine" value={form.engine} onChange={onField} placeholder="e.g. 6.5L V12" /></label><label>Horsepower<input required min="1" type="number" name="horsepower" value={form.horsepower} onChange={onField} /></label><label>Seats<input required min="1" type="number" name="seats" value={form.seats} onChange={onField} /></label><label className="form-wide">Image URL<input required type="url" name="image" value={form.image} onChange={onField} placeholder="https://…" /></label><label className="form-wide">Description<textarea name="description" value={form.description} onChange={onField} placeholder="Describe the vehicle"></textarea></label><label className="check-label form-wide"><input type="checkbox" name="featured" checked={form.featured} onChange={onField} /> Feature this vehicle on the home page</label><div className="form-actions form-wide"><button className="btn btn-gold" disabled={saving}>{saving ? 'SAVING…' : editingId ? 'SAVE CHANGES' : 'ADD VEHICLE'}</button>{editingId && <button type="button" className="btn btn-ghost" onClick={() => { setForm(EMPTY_CAR); setEditingId(null); }}>CANCEL EDIT</button>}</div></form></section>}
        </>}
      </div>
    </main>
  );
}

function Stat({ label, value, note }) { return <article className="dashboard-stat"><span>{label}</span><strong>{value}</strong><small>{note}</small></article>; }
