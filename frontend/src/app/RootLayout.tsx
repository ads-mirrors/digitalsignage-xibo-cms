import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import SideBar from '@/components/layout/SideBar';
import TopNav from '@/components/layout/TopNav';

export default function RootLayout() {
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // @ts-expect-error - Preline attaches this to window
    window.HSStaticMethods?.autoInit?.();
  }, [pathname]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-neutral-900">
      <aside
        className={`flex-none bg-xibo-blue-800 dark:bg-orange-300 transition-[width] duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-60'}
        `}
      >
        <SideBar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <TopNav pathName={pathname} />
        <main className="flex-1 overflow-y-auto p-4 bg-white dark:bg-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
