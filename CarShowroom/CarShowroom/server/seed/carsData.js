// Shared seed data — used by both the seed script and auto-seed on startup.
export const cars = [
  {
    name: 'Aston Martin DB11',
    brand: 'Aston Martin',
    price: 214000,
    engine: '5.2L V12',
    horsepower: 608,
    seats: 2,
    featured: true,
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80',
    description:
      'A grand tourer that blends brute V12 power with timeless British elegance. Hand-built in Gaydon, the DB11 pairs 0–60 mph in 3.9s with the refinement of a bespoke cabin.',
  },
  {
    name: 'Rolls-Royce Ghost',
    brand: 'Rolls-Royce',
    price: 332000,
    engine: '6.75L V12',
    horsepower: 563,
    seats: 5,
    featured: true,
    image:
      'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1000&q=80',
    description:
      'The pinnacle of refined luxury, delivering whisper-quiet, effortless performance. Planar suspension and a "magic carpet" ride define the modern Ghost.',
  },
  {
    name: 'Ferrari 812 Superfast',
    brand: 'Ferrari',
    price: 412000,
    engine: '6.5L V12',
    horsepower: 789,
    seats: 2,
    featured: true,
    image:
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1000&q=80',
    description:
      'A front-engined V12 masterpiece — the most powerful naturally-aspirated production Ferrari of its era, screaming to 8,900 rpm.',
  },
  {
    name: 'Lamborghini Huracán',
    brand: 'Lamborghini',
    price: 268000,
    engine: '5.2L V10',
    horsepower: 631,
    seats: 2,
    featured: false,
    image:
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=80',
    description:
      'Razor-sharp handling and an intoxicating naturally-aspirated V10 soundtrack, with all-wheel-drive confidence.',
  },
  {
    name: 'Bentley Continental GT',
    brand: 'Bentley',
    price: 235000,
    engine: '6.0L W12',
    horsepower: 650,
    seats: 4,
    featured: false,
    image:
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80',
    description:
      'Handcrafted luxury and continent-crushing W12 grand touring capability, wrapped in a diamond-quilted cabin.',
  },
  {
    name: 'Porsche 911 Turbo S', brand: 'Porsche', price: 242000, engine: '3.7L Twin-Turbo Flat-6', horsepower: 640, seats: 4, featured: true,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    description: 'Everyday usability meets devastating supercar pace in Porsche’s all-weather flagship coupe.',
  },
  {
    name: 'McLaren 750S', brand: 'McLaren', price: 331000, engine: '4.0L Twin-Turbo V8', horsepower: 740, seats: 2, featured: false,
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
    description: 'A featherweight, driver-focused supercar with an astonishing blend of response and poise.',
  },
  {
    name: 'Mercedes-AMG GT 63 S', brand: 'Mercedes-Benz', price: 187000, engine: '4.0L Twin-Turbo V8', horsepower: 630, seats: 4, featured: false,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80',
    description: 'A four-door grand tourer that delivers AMG thunder without compromising on comfort.',
  },
  {
    name: 'Audi R8 V10 Performance', brand: 'Audi', price: 214000, engine: '5.2L V10', horsepower: 602, seats: 2, featured: false,
    image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1000&q=80',
    description: 'Audi’s naturally aspirated icon pairs a glorious V10 with a beautifully usable cabin.',
  },
  {
    name: 'Maserati MC20', brand: 'Maserati', price: 242000, engine: '3.0L Twin-Turbo V6', horsepower: 621, seats: 2, featured: false,
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1000&q=80',
    description: 'Italian elegance and carbon-fibre construction make the MC20 a modern exotic standout.',
  },
  {
    name: 'BMW M8 Competition', brand: 'BMW', price: 147000, engine: '4.4L Twin-Turbo V8', horsepower: 617, seats: 4, featured: false,
    image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1000&q=80',
    description: 'A compelling luxury coupe with supercar-rivalling power and long-distance composure.',
  },
  {
    name: 'Range Rover Autobiography', brand: 'Land Rover', price: 174000, engine: '4.4L Twin-Turbo V8', horsepower: 523, seats: 5, featured: false,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80',
    description: 'The benchmark luxury SUV, equally at home outside an opera house or far beyond the road.',
  },
  {
    name: 'Ferrari Roma', brand: 'Ferrari', price: 247000, engine: '3.9L Twin-Turbo V8', horsepower: 612, seats: 4, featured: false,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80',
    description: 'A contemporary Ferrari grand tourer with understated proportions and extraordinary performance.',
  },
  {
    name: 'Lamborghini Urus S', brand: 'Lamborghini', price: 245000, engine: '4.0L Twin-Turbo V8', horsepower: 657, seats: 5, featured: false,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80',
    description: 'Super-SUV drama, blistering performance and a versatile cabin in one unmistakable package.',
  },
  {
    name: 'Aston Martin Vantage', brand: 'Aston Martin', price: 191000, engine: '4.0L Twin-Turbo V8', horsepower: 656, seats: 2, featured: false,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80',
    description: 'A compact British sports car with muscular styling and a deeply involving character.',
  },
  {
    name: 'Rolls-Royce Cullinan', brand: 'Rolls-Royce', price: 391000, engine: '6.75L V12', horsepower: 563, seats: 5, featured: false,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
    description: 'The definitive expression of luxury SUV travel, tailored to every imaginable journey.',
  },
  {
    name: 'Bentley Flying Spur', brand: 'Bentley', price: 233000, engine: '4.0L Twin-Turbo V8', horsepower: 542, seats: 5, featured: false,
    image: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&w=1000&q=80',
    description: 'A serene four-door limousine that conceals immense pace beneath handcrafted luxury.',
  },
];
