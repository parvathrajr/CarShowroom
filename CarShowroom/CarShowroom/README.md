# 🚗 Luxora Motors — MERN Stack

A luxury car showroom landing page (exact design + interactive **3D animations**) built as a full **MERN** application.

- **M**ongoDB + Mongoose — car inventory & test-drive bookings
- **E**xpress — REST API
- **R**eact (Vite) — component-based UI with 3D tilt/parallax
- **N**ode.js — runtime

```
CarShowroom/
├── server/                 # Express + MongoDB API
│   ├── config/db.js
│   ├── models/             # Car.js, Booking.js
│   ├── controllers/        # carController.js, bookingController.js
│   ├── routes/             # carRoutes.js, bookingRoutes.js
│   ├── seed/seed.js        # sample luxury cars
│   └── server.js
├── client/                 # React (Vite) frontend
│   └── src/
│       ├── components/     # Header, Hero, Services, FeaturedCars, WhyChoose, Contact, Footer
│       ├── hooks/          # useTilt (3D tilt), useReveal (scroll reveal)
│       ├── api.js          # fetch helpers
│       └── index.css       # full design system + 3D engine
├── index.html/styles.css/script.js   # original standalone static version (reference)
└── package.json            # root convenience scripts
```

## Prerequisites
- **Node.js 18+** (you have v24 ✔)
- **MongoDB** — either local (`mongodb://127.0.0.1:27017`) or a free **MongoDB Atlas** cluster.

## Setup

**1. Configure the database**
```bash
cd server
copy .env.example .env       # then edit .env with secure admin credentials
```

`MONGO_URI` is optional for a demo: without it, the API starts a temporary in-memory database and loads the sample collection automatically. To keep inventory and enquiries between restarts, configure MongoDB instead.

**2. Install dependencies** (from the project root)
```bash
npm install                 # installs root tooling (concurrently)
npm run install:all         # installs server + client deps
```

**3. Seed sample cars into MongoDB**
```bash
npm run seed
```

**4. Run everything (API + React) together**
```bash
npm run dev
```
- API → http://localhost:5000
- Web → http://localhost:5173

> Or run them separately in two terminals: `npm run server` and `npm run client`.

## API

| Method | Endpoint                | Description                         |
|--------|-------------------------|-------------------------------------|
| GET    | `/api/health`           | Health check                        |
| GET    | `/api/cars`             | All cars (`?featured=true`, `?brand=`) |
| GET    | `/api/cars/:id`         | Single car                          |
| POST   | `/api/cars`             | Add a car                           |
| POST   | `/api/bookings`         | Submit a test-drive request         |
| GET    | `/api/bookings`         | List bookings (admin)               |

Administrator sign-in uses the `ADMIN_EMAIL` and `ADMIN_PASSWORD` values in `server/.env`. Inventory changes and enquiry management require the short-lived administrator token returned by login.

The React dev server proxies `/api` → `http://localhost:5000`, so no CORS config is needed in development.

## Notes
- The **Featured Cars** section loads from MongoDB via the API; if the API is down it falls back to sample data so the UI never breaks.
- The **Contact** form posts real bookings to `/api/bookings`.
- Car/villa images load from Unsplash — an internet connection is needed for them to appear. Swap the URLs in the seed file / `index.css` for local images to go fully offline.
