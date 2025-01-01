import db from '@/db';
import type { User } from '@prisma/client';
import ButtonWithEditModal from './buttonWithEditModal';
import ChangePasswordModal from './changePasswordModal';
import { DeleteButton } from '@/components';
import { deleteAccount } from './actions';
import { GoDotFill } from 'react-icons/go';
import AddAccountModal from './addAccountModal';
import EditAccountModal from './editAccountModal';

export default async function Profile() {
  'use server';
  const user: User | null = await db.user.findUnique({ where: { id: 'root' } });
  const accounts = await db.account.findMany({ where: { userId: 'root' } });

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
      <div className='p-4 rounded-lg border-[1px] border-night/50'>
        <div className='flex flex-col gap-12'>
          <div className='flex justify-between items-center gap-12'>
            <h3 className='text-2xl'>Manage accounts</h3>
            <AddAccountModal />
          </div>
          <ul className='flex flex-col gap-4'>
            {accounts.map((account) => (
              <li
                key={account.id}
                className='w-80 flex justify-between items-center bg-lavender rounded-lg px-4 py-2'
              >
                <span className='flex items-center gap-1'>
                  <p>{account.name}</p>
                  <GoDotFill />
                  <p>{account.amount}</p>
                </span>
                <div className='flex gap-1 ml-4'>
                  <EditAccountModal accountId={account.id} />
                  <DeleteButton id={account.id} callback={deleteAccount} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
