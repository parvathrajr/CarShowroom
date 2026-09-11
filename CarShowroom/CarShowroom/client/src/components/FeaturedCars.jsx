import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TiltCard from './TiltCard.jsx';
import useReveal from '../hooks/useReveal.js';
import { getFeaturedCars } from '../api.js';

// Fallback used if the API is unreachable, so the UI never looks broken.
const FALLBACK = [
  { _id: 'a', name: 'Aston Martin DB11', priceLabel: '$214,000', engine: '5.2L V12', horsepower: 608, seats: 2, image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80' },
  { _id: 'b', name: 'Rolls-Royce Ghost', priceLabel: '$332,000', engine: '6.75L V12', horsepower: 563, seats: 5, image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=800&q=80' },
  { _id: 'c', name: 'Ferrari 812 Superfast', priceLabel: '$412,000', engine: '6.5L V12', horsepower: 789, seats: 2, image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80' },
];

function CarCard({ car }) {
  const [fav, setFav] = useState(false);
  const price = car.priceLabel || '$' + Number(car.price).toLocaleString('en-US');
  return (
    <TiltCard className="car-card reveal in-view" max={10}>
      <div className="car-media" style={{ backgroundImage: `url('${car.image}')` }}>
        <button className={`fav ${fav ? 'active' : ''}`} aria-label="Save" onClick={() => setFav((v) => !v)}>
          {fav ? '♥' : '♡'}
        </button>
      </div>
      <div className="car-body">
        <div className="car-top">
          <h3>{car.name}</h3>
          <span className="price">{price}</span>
        </div>
        <ul className="car-specs">
          <li>⛽ {car.engine}</li>
          <li>⚡ {car.horsepower} HP</li>
          <li>🪑 {car.seats} Seats</li>
        </ul>
        <Link to={`/cars/${car._id}`} className="details-link">VIEW DETAILS</Link>
      </div>
    </TiltCard>
  );
}

export default function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const headRef = useReveal();

  useEffect(() => {
    let alive = true;
    getFeaturedCars()
      .then((data) => {
        if (!alive) return;
        setCars(Array.isArray(data) && data.length ? data : FALLBACK);
        setUsingFallback(!(Array.isArray(data) && data.length));
      })
      .catch(() => {
        if (!alive) return;
        setCars(FALLBACK);
        setUsingFallback(true);
      })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return (
    <section className="featured section" id="inventory">
      <div className="container">
        <div className="section-head between reveal in-view" ref={headRef}>
          <div>
            <p className="eyebrow gold-eyebrow">OUR COLLECTION</p>
            <h2 className="section-title left">Featured Luxury Cars</h2>
          </div>
          <Link to="/inventory" className="view-all">VIEW ALL INVENTORY <span className="arr">→</span></Link>
        </div>

        {loading ? (
          <p className="loading">Loading collection…</p>
        ) : (
          <div className="car-grid">
            {cars.map((car) => <CarCard key={car._id} car={car} />)}
          </div>
        )}

        {usingFallback && !loading && (
          <p className="api-hint">
            Showing sample data — start the API &amp; run <code>npm run seed</code> to load cars from MongoDB.
          </p>
        )}
      </div>
    </section>
  );
}
