import db from '@/db';
import type { User } from '@prisma/client';
import ButtonWithEditModal from './buttonWithEditModal';
import ChangePasswordModal from './changePasswordModal';

export default async function Profile() {
  'use server';
  const user: User | null = await db.user.findUnique({ where: { id: 'root' } });

  return (
    <div>
      <h2>Hello {user?.firstName}!</h2>
      <div className='p-4 rounded-lg border-[1px] border-night/50'>
        <div className='flex justify-between items-center gap-12'>
          <h3 className='text-2xl'>Personal information</h3>
          <ButtonWithEditModal />
        </div>
        <div className='mt-4'>
          <div className='w-full flex justify-between pr-4'>
            <div>
              <p className='text-xl'>First name</p>
              <p className='text-lg'>{user?.firstName}</p>
            </div>
            <div>
              <p className='text-xl'>Last name</p>
              <p className='text-lg'>{user?.lastName}</p>
            </div>
          </div>
          <div>
            <p className='text-xl'>Email</p>
            <p className='text-lg'>{user?.email}</p>
          </div>
        </div>
        <ChangePasswordModal />
      </div>
    </div>
  );
}
