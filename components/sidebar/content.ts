import { FaTags } from 'react-icons/fa';
import { GrTransaction } from 'react-icons/gr';
import { MdAccountCircle, MdDashboard } from 'react-icons/md';
import { RiInformationFill } from 'react-icons/ri';

export const sidebarLinks = [
  {
    href: '/about',
    text: 'About',
    Icon: RiInformationFill,
  },
  {
    href: '/categories',
    text: 'Categories',
    Icon: FaTags,
  },
  {
    href: '/dashboard',
    text: 'Dashboard',
    Icon: MdDashboard,
  },
  {
    href: '/transactions',
    text: 'Transactions',
    Icon: GrTransaction,
  },
  {
    href: '/profile',
    text: 'Profile',
    Icon: MdAccountCircle,
  },
];
