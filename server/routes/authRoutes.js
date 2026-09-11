import { Router } from 'express';
import { timingSafeEqual } from 'crypto';
import { createAdminToken } from '../middleware/requireAdmin.js';
import User from '../models/User.js';

const router = Router();

function matches(value, expected) {
  const received = Buffer.from(value || '');
  const target = Buffer.from(expected || '');
  return received.length === target.length && timingSafeEqual(received, target);
}

// Administrator sign-in (uses server/.env administrator account)
router.post('/admin/login', (req, res) => {
  const { email, password } = req.body || {};
  const validEmail = matches(String(email).trim().toLowerCase(), (process.env.ADMIN_EMAIL || '').toLowerCase());
  const validPassword = matches(String(password), process.env.ADMIN_PASSWORD || '');

  if (!validEmail || !validPassword) {
    return res.status(401).json({ message: 'Invalid administrator email or password.' });
  }

  return res.json({ message: 'Administrator verified.', role: 'admin', token: createAdminToken() });
});

// Customer user registration (stored in MongoDB User collection)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(409).json({ message: 'A user with this email already exists.' });
    }

    const passwordHash = User.hashPassword(String(password));
    const user = await User.create({
      name: String(name).trim(),
      email: cleanEmail,
      passwordHash,
      role: 'customer',
    });

    return res.status(201).json({
      message: 'Account created successfully.',
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Error registering user.' });
  }
});

// Customer user login (verified against MongoDB User collection)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });
    if (!user || !user.verifyPassword(String(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.json({
      message: 'Sign in successful.',
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Error signing in.' });
  }
});

export default router;
