import { ProgressStatus } from '@/enums/enum';

export type DashboardListProps = {
  icon: React.ReactNode;
};
export type SubmenuItem = {
  name: string;
  icon: string;
  activeIcon: string;
  to: string;
};

export type MenuItem = {
  name: string;
  icon: string;
  activeIcon: string;
  to: string;
  submenuItems?: SubmenuItem[];
};
export type MenuItemComponentProps = {
  type: 'main' | 'submenu';
  isOpen: boolean;
  isActive: boolean;
  isSubmenuOpen?: boolean;
  icon: string;
  activeIcon: string;
  name: string;
  onClick: () => void;
  isSubmenu?: boolean;
};

export type NotificationDropdownProps = {
  open: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onClose: () => void;
};

export type ALertsListProps = {
  image: string;
  title: string;
  count: number | string;
};

export type AlertType = {
  list: ALertsListProps[];
};
export type TotalDetailsListProps = {
  image: string;
  title: string;
  label: string;
  status: ProgressStatus;
};
export type TotalDetailstProps = {
  list: TotalDetailsListProps[];
};
