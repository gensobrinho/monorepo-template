import { FiBox, FiUsers } from 'react-icons/fi';
import type { SidebarNavItem } from '@shared/components/Sidebar/Sidebar';
import TEXTS from '@shared/i18n';
import { RoutesEnum } from '../types/RoutesEnum';

export const APP_NAV_ITEMS: SidebarNavItem[] = [
  { to: RoutesEnum.DEMO, label: TEXTS.sidebar.demo, icon: FiBox, end: true },
  { to: RoutesEnum.USERS, label: TEXTS.sidebar.usuarios, icon: FiUsers },
];

export function getNavItems(): SidebarNavItem[] {
  return APP_NAV_ITEMS;
}
