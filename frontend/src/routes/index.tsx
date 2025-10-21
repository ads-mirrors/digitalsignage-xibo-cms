import { createBrowserRouter, redirect } from 'react-router-dom';

import { requireAuthLoader, redirectIfAuthedLoader } from './loaders';

import RootLayout from '@/app/RootLayout';
import WithPageWrapper from '@/app/WithPageWrapper';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // Protected
      {
        loader: requireAuthLoader,
        element: <WithPageWrapper />,
        children: [
          { index: true, loader: () => redirect('/dashboard') },
          {
            path: 'dashboard',
            lazy: () =>
              import('@/pages/Dashboard/Dashboard').then((m) => ({ Component: m.default })),
          },
          {
            path: 'media',
            lazy: () => import('@/pages/Media/Media').then((m) => ({ Component: m.default })),
          },
          {
            path: 'settings',
            lazy: () => import('@/pages/Settings/Settings').then((m) => ({ Component: m.default })),
          },
        ],
      },
    ],
  },
  // Public
  {
    path: 'login',
    loader: redirectIfAuthedLoader,
    lazy: () => import('@/pages/Auth/Login').then((m) => ({ Component: m.default })),
  },

  {
    path: '*',
    lazy: () => import('@/pages/NotFound/NotFound').then((m) => ({ Component: m.default })),
  },
]);
