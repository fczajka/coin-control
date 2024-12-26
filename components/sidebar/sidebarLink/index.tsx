import Link from 'next/link';
import type { SidebarLinkProps } from './interface';

export default function SidebarLink({ href, text, Icon }: SidebarLinkProps) {
  return (
    <Link
      className='font-headline flex justify-between items-center bg-seafoam rounded-lg px-4 py-2'
      href={href}
    >
      {text} <Icon className='w-5 h-5' />
    </Link>
  );
}
