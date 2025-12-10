import { useTranslation } from 'react-i18next';
import { matchPath } from 'react-router-dom';

import { APP_ROUTES } from '@/config/appRoutes';
import { logout } from '@/lib/logout';

interface TopNavProps {
  pathName: string;
}

export default function TopNav({ pathName }: TopNavProps) {
  const { t } = useTranslation();

  const activeRoute = APP_ROUTES.find((route) =>
    matchPath({ path: route.path, end: true }, pathName),
  );

  const pageTitle = activeRoute ? activeRoute.labelKey : 'Dashboard';

  return (
    <header className="sticky top-0 w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <nav className="flex flex-row align-middle justify-between">
        <div className="flex align-middle h-6 font-semibold">{t(pageTitle)}</div>

        <div className="flex flex-row gap-3">
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center cursor-pointer gap-x-2 text-sm font-semibold rounded-lg text-gray-800 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-white/70 dark:focus:text-white/70"
          >
            {t('Logout')}
          </button>
        </div>
      </nav>
    </header>
  );
}
