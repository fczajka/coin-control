'use client';

import { FormButton } from '@/components';
import { useState } from 'react';
import { updatePassword } from '../actions';
import { IoMdCloseCircle } from 'react-icons/io';

export default function ChangePasswordModal() {
  const updatePasswordWithId = updatePassword.bind(null, 'root');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='px-4 py-2 bg-lavender rounded-lg'
      >
        Change password
      </button>
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-night/55'>
          <div className='relative bg-off-white rounded-lg p-4 pr-12'>
            <form action={updatePasswordWithId}>
              <label htmlFor='newPassword' className='sr-only'>
                New password
              </label>
              <input
                type='password'
                id='newPassword'
                name='newPassword'
                className='w-full bg-off-white rounded-lg px-4 py-2 mb-4'
                placeholder='New password'
              />
              <FormButton>Change password</FormButton>
            </form>
            <button
              onClick={() => setIsOpen(false)}
              className='absolute top-4 right-4'
            >
              <IoMdCloseCircle className='w-5 h-5' />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
