import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { APP_ROUTES } from '@/config/appRoutes';

interface SidebarMenuProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function SidebarMenu({ isCollapsed, toggleSidebar }: SidebarMenuProps) {
  const { t } = useTranslation();

  const activeClasses =
    'font-medium ml-4 flex flex-row gap-1.5 text-white dark:text-black focus:outline-hidden';
  const inactiveClasses =
    'font-medium ml-4 flex flex-row gap-1.5 text-gray-500 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500';

  return (
    <div className="flex flex-col gap-2">
      {/* Collapse button */}
      <div className="p-4 mt-auto">
        <button
          onClick={toggleSidebar}
          className={`flex w-full items-center justify-center p-2 rounded-lg hover:bg-xibo-blue-600 hover:dark:bg-orange-400 transition-colors
            ${isCollapsed ? '' : 'justify-start'}
          `}
        >
          {isCollapsed ? '>' : '<'}

          {!isCollapsed && <span className="ml-3 text-sm font-medium">Collapse</span>}
        </button>
      </div>

      {/* Routes */}
      {APP_ROUTES.map((route) => {
        const label = !isCollapsed ? t(route.labelKey) : null;

        if (!route.externalURL) {
          return (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) => (isActive ? activeClasses : inactiveClasses)}
            >
              <route.icon className="pr-2" size={30} />
              {label}
            </NavLink>
          );
        } else {
          return (
            <a href={route.externalURL} className={inactiveClasses}>
              <route.icon className="pr-2" size={30} />
              {label}
            </a>
          );
        }
      })}
    </div>
  );
}
