import { redirect } from 'react-router-dom';

const API_USER = '/json/user/me';

async function validateToken(): Promise<boolean> {
  try {
    const res = await fetch(API_USER, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (res.ok) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Auth validation check failed:', error);
    return false;
  }
}

export async function requireAuthLoader({ request }: { request: Request }) {
  const isAuthenticated = await validateToken();
  if (!isAuthenticated) {
    const currentUrl = new URL(request.url);
    const returnTo = encodeURIComponent(currentUrl.pathname + currentUrl.search);

    window.location.href = `/login?priorRoute=${returnTo}`;
    return null;
  }

  return null;
}

export async function redirectIfAuthedLoader() {
  const isAuthenticated = await validateToken();
  if (isAuthenticated) {
    throw redirect('/dashboard');
  }
  return null;
}
