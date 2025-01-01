'use client';
import { useState } from 'react';
import { updateProfile } from '../actions';
import { FormButton } from '@/components';
import { IoMdCloseCircle } from 'react-icons/io';

export default function ButtonWithEditModal() {
  const updateProfileWithId = updateProfile.bind(null, 'root');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='px-4 py-2 bg-lavender rounded-lg'
      >
        Edit profile
      </button>
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-night/55'>
          <div className='relative bg-off-white rounded-lg p-4 pr-12'>
            <form action={updateProfileWithId} className='flex flex-col'>
              <label htmlFor='firstName' className='sr-only'>
                First name
              </label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                className='w-full bg-off-white rounded-lg px-4 py-2 mb-4'
                placeholder='First name'
              />
              <label htmlFor='lastName' className='sr-only'>
                Last name
              </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                className='w-full bg-off-white rounded-lg px-4 py-2 mb-4'
                placeholder='Last name'
              />
              <label htmlFor='email' className='sr-only'>
                Email
              </label>
              <input
                type='text'
                id='email'
                name='email'
                className='w-full bg-off-white rounded-lg px-4 py-2 mb-4'
                placeholder='Email'
              />
              <FormButton>Update profile</FormButton>
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
