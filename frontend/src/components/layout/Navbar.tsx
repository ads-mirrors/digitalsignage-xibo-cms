import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import ThemeSwitcher from '@/components/layout/ThemeSwitcher';
import { logout } from '@/lib/logout';

export default function SideMenu() {
  const { t } = useTranslation();

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-gray-900">
      <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
        <NavLink
          className="sm:order-1 flex-none text-xl font-semibold dark:text-white focus:outline-hidden focus:opacity-80"
          to="/"
        >
          Xibo CMS v5
        </NavLink>
        <div
          id="hs-navbar-alignment"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
          aria-labelledby="hs-navbar-alignment-collapse"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'font-medium text-blue-500 focus:outline-hidden'
                  : 'font-medium text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500'
              }
            >
              {t('Dashboard')}
            </NavLink>

            <NavLink
              to="/media"
              className={({ isActive }) =>
                isActive
                  ? 'font-medium text-blue-500 focus:outline-hidden'
                  : 'font-medium text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500'
              }
            >
              {t('Media')}
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? 'font-medium text-blue-500 focus:outline-hidden'
                  : 'font-medium text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500'
              }
            >
              {t('Settings')}
            </NavLink>

            <ThemeSwitcher />

            <LanguageSwitcher />

            <button
              type="button"
              onClick={logout}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 cursor-pointer"
            >
              {t('Logout')}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
