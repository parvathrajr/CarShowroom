import { createHmac, timingSafeEqual } from 'crypto';

const TOKEN_TTL_MS = 8 * 60 * 60 * 1000;

function secret() {
  return process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || 'change-this-development-secret';
}

function signature(payload) {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function createAdminToken() {
  const payload = Buffer.from(JSON.stringify({ role: 'admin', exp: Date.now() + TOKEN_TTL_MS })).toString('base64url');
  return `${payload}.${signature(payload)}`;
}

export function requireAdmin(req, res, next) {
  const token = req.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token || !token.includes('.')) {
    return res.status(401).json({ message: 'Administrator authentication is required.' });
  }

  const [payload, provided] = token.split('.');
  const expected = signature(payload);
  const isValid = provided.length === expected.length && timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  if (!isValid) return res.status(401).json({ message: 'Your administrator session is invalid.' });

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (data.role !== 'admin' || !data.exp || data.exp < Date.now()) throw new Error('expired');
    req.admin = data;
    return next();
  } catch {
    return res.status(401).json({ message: 'Your administrator session has expired. Please sign in again.' });
  }
}
