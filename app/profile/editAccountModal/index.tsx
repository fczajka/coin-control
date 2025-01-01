'use client';

import { FormButton } from '@/components';
import { updateAccount } from '../actions';
import { IoMdCloseCircle } from 'react-icons/io';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import type { EditAccountModalProps } from './interface';

export default function EditAccountModal({ accountId }: EditAccountModalProps) {
  const updateAccountWithId = updateAccount.bind(null, accountId);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MdEdit
        className='w-5 h-5 ml-4 mr-1 cursor-pointer'
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-night/55'>
          <div className='relative bg-off-white rounded-lg p-4 pr-12'>
            <form action={updateAccountWithId} className='flex flex-col'>
              <label htmlFor='accountName' className='sr-only'>
                Account name
              </label>
              <input
                type='text'
                id='accountName'
                name='accountName'
                className='w-full bg-off-white rounded-lg px-4 py-2 mb-4'
                placeholder='Account name'
              />
              <label htmlFor='accountBalance' className='sr-only'>
                Account balance
              </label>
              <input
                type='number'
                id='accountBalance'
                name='accountBalance'
                className='w-full bg-off-white rounded-lg px-4 py-2 mb-4'
                placeholder='Account balance'
              />
              <select name='currency' id='currency' className='my-2'>
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='GBP'>GBP</option>
              </select>
              <FormButton>Update account</FormButton>
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
