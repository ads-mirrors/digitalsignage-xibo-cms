import { createBrowserRouter, redirect } from 'react-router-dom';

import { requireAuthLoader } from './loaders';

import RootLayout from '@/app/RootLayout';
import WithPageWrapper from '@/app/WithPageWrapper';
import { APP_ROUTES } from '@/config/appRoutes';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        // Protected
        {
          loader: requireAuthLoader,
          element: <WithPageWrapper />,
          children: [
            // For now it redirect to media page
            { index: true, loader: () => redirect('/media') },
            ...APP_ROUTES.map((route) => ({
              path: route.path,
              lazy: route.lazy,
            })),
          ],
        },
      ],
    },
    {
      path: '*',
      lazy: () => import('@/pages/NotFound/NotFound').then((m) => ({ Component: m.default })),
    },
  ],
  {
    basename: '/prototype',
  },
);
