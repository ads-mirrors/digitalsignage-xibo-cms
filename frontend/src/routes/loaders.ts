import { redirect } from 'react-router-dom';

import { getAccessToken, clearAccessToken } from '@/lib/auth';

const API_USER = '/api/user';

async function validateToken(): Promise<boolean> {
  const token = getAccessToken();
  if (!token) {
    return false;
  }

  const res = await fetch(API_USER, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    credentials: 'omit',
    cache: 'no-store',
  });

  if (res.ok) {
    return true;
  }
  if (res.status === 401 || res.status === 403) {
    clearAccessToken?.();
  }
  return false;
}

export async function requireAuthLoader() {
  const ok = await validateToken();
  if (!ok) {
    throw redirect('/login');
  }
  return null;
}

export async function redirectIfAuthedLoader() {
  const ok = await validateToken();
  if (ok) {
    throw redirect('/dashboard');
  }
  return null;
}
