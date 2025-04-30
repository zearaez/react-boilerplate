import dashboardIcon from '@/assets/images/dashboard.svg';
import dashboardActiveIcon from '@/assets/images/dashboard-active.svg';
import reportIcon from '@/assets/images/reports.svg';
import reportActiveIcon from '@/assets/images/reportsActive.svg';
import inventoryIcon from '@/assets/images/inventory.svg';
import inventoryActiveIcon from '@/assets/images/inventoryActive.svg';
import cogsIcon from '@/assets/images/cogs.svg';
import cogsActiveIcon from '@/assets/images/cogsActive.svg';
export const menuItems = [
  {
    name: 'Dashboard',
    icon: dashboardIcon,
    activeIcon: dashboardActiveIcon,
    to: '/dashboard',
  },
  {
    name: 'Reports',
    icon: reportIcon,
    activeIcon: reportActiveIcon,
    to: '/reports',
    submenuItems: [
      {
        name: 'User Reports',
        icon: dashboardIcon,
        activeIcon: dashboardActiveIcon,
        to: '/reports/user-reports',
      },
    ],
  },
  {
    name: 'Inventory',
    icon: inventoryIcon,
    activeIcon: inventoryActiveIcon,
    to: '/inventory',
  },
  {
    name: 'Configuration',
    icon: cogsIcon,
    activeIcon: cogsActiveIcon,
    to: '/configuration',
    submenuItems: [
      {
        name: 'Location Management',
        icon: dashboardIcon,
        activeIcon: dashboardActiveIcon,
        to: '/configuration/location-management',
      },
    ],
  },
];
