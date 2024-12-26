import { sidebarLinks } from './content';
import SidebarLink from './sidebarLink';

export default function Sidebar() {
  return (
    <div className='basis-1/6 p-8'>
      <h1 className='font-headline text-2xl mb-12'>Coin Control</h1>
      <div className='w-2/3 flex flex-col gap-4'>
        {sidebarLinks.map((link) => (
          <SidebarLink key={link.href} {...link} />
        ))}
      </div>
    </div>
  );
}
