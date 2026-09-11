// All requests go through Vite's dev proxy (/api -> http://localhost:5000)
const BASE = '/api';

async function request(path, options = {}) {
  const token = sessionStorage.getItem('luxora-admin-token');
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

// Cars
export const getFeaturedCars = () => request('/cars?featured=true');
export const getCars = () => request('/cars');
export const getCar = (id) => request(`/cars/${id}`);
export const createCar = (payload) => request('/cars', { method: 'POST', body: JSON.stringify(payload) });
export const updateCar = (id, payload) => request(`/cars/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
export const deleteCar = (id) => request(`/cars/${id}`, { method: 'DELETE' });

// Bookings
export const createBooking = (payload) =>
  request('/bookings', { method: 'POST', body: JSON.stringify(payload) });
export const getBookings = () => request('/bookings');
export const updateBooking = (id, payload) =>
  request(`/bookings/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
export const deleteBooking = (id) =>
  request(`/bookings/${id}`, { method: 'DELETE' });

// Authentication
export const loginAdmin = (email, password) =>
  request('/auth/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
