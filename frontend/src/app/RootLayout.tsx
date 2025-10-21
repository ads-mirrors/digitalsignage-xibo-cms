import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '@/components/layout/Navbar';

export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    // @ts-expect-error - Preline attaches this to window
    window.HSStaticMethods?.autoInit?.();
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-white dark:bg-black text-gray-900 dark:text-gray-50">
      <header className="border-b bg-white">
        <Navbar />
      </header>
      <main className="mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
