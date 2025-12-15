import { LayoutDashboard, Image, Settings, type LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';

export interface AppRoute {
  path: string;
  labelKey: string;
  icon: LucideIcon;
  lazy?: () => Promise<{ Component: ComponentType<unknown> }>;
  externalURL?: string;
}

export const APP_ROUTES: AppRoute[] = [
  {
    path: 'dashboard',
    labelKey: 'Dashboard',
    icon: LayoutDashboard,
    externalURL: '/statusdashboard',
  },
  {
    path: 'media',
    labelKey: 'Media',
    icon: Image,
    lazy: () => import('@/pages/Media/Media').then((m) => ({ Component: m.default })),
  },
  {
    path: 'settings',
    labelKey: 'Settings',
    icon: Settings,
    externalURL: '/admin/view',
  },
];
