import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { fetchAccessToken } from './authApi';

import { setAccessToken } from '@/lib/auth';

export default function LoginPage() {
  const { t } = useTranslation();
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await fetchAccessToken(clientId, clientSecret);
      setAccessToken(token);
      navigate('/');
    } catch (_err) {
      setError('Invalid credentials: ' + _err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-gray-200 p-6 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-gray-900">{t('Sign in')}</h1>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder={t('Client ID')}
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black"
          required
        />

        <input
          type="password"
          placeholder={t('Client Secret')}
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black"
          required
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          {t('Login')}
        </button>
      </form>
    </div>
  );
}
