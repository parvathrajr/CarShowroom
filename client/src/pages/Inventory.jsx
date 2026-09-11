import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard.jsx';
import { getCars } from '../api.js';

function CarCard({ car }) {
  const [saved, setSaved] = useState(false);
  const price = car.priceLabel || `$${Number(car.price).toLocaleString('en-US')}`;
  return (
    <TiltCard className="car-card inventory-card" max={10}>
      <div className="car-media" style={{ backgroundImage: `url('${car.image}')` }}>
        <button className={`fav ${saved ? 'active' : ''}`} aria-label="Save vehicle" onClick={() => setSaved((value) => !value)}>{saved ? '♥' : '♡'}</button>
        {car.featured && <span className="inventory-badge">Featured</span>}
      </div>
      <div className="car-body"><p className="car-brand">{car.brand}</p><div className="car-top"><h3>{car.name}</h3><span className="price">{price}</span></div><ul className="car-specs"><li>⛽ {car.engine}</li><li>⚡ {car.horsepower} HP</li><li>🪑 {car.seats} Seats</li></ul><Link to={`/cars/${car._id}`} className="details-link">VIEW DETAILS</Link></div>
    </TiltCard>
  );
}

export default function Inventory() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('All');
  useEffect(() => { getCars().then(setCars).catch(() => setCars([])).finally(() => setLoading(false)); }, []);
  const brands = useMemo(() => ['All', ...new Set(cars.map((car) => car.brand))], [cars]);
  const visibleCars = useMemo(() => cars.filter((car) => (brand === 'All' || car.brand === brand) && `${car.brand} ${car.name}`.toLowerCase().includes(query.toLowerCase())), [cars, brand, query]);
  return <main className="inventory-page section"><div className="container"><div className="inventory-hero"><p className="eyebrow gold-eyebrow">THE COLLECTION</p><h1 className="section-title">Find your next <span className="gold">masterpiece.</span></h1><p>Explore our carefully selected collection of exceptional luxury, performance and grand-touring vehicles.</p></div><div className="inventory-controls"><label><span>Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by make or model" /></label><div className="brand-filters">{brands.map((item) => <button key={item} className={brand === item ? 'active' : ''} onClick={() => setBrand(item)}>{item}</button>)}</div></div>{loading ? <p className="loading">Loading the collection…</p> : <><p className="inventory-count">{visibleCars.length} vehicle{visibleCars.length === 1 ? '' : 's'} available</p><div className="car-grid inventory-grid">{visibleCars.map((car) => <CarCard key={car._id} car={car} />)}</div>{!visibleCars.length && <p className="admin-empty">No vehicles match your search.</p>}</>}</div></main>;
}
