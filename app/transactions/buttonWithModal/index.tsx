'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { IoMdAddCircle, IoMdCloseCircle } from 'react-icons/io';
import type { ButtonWithModalProps } from './interface';
import { create } from '../actions';

export default function ButtonWithModal({
  accounts,
  categories,
}: ButtonWithModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { pending } = useFormStatus();
  return (
    <>
      <button
        disabled={pending}
        onClick={() => setIsOpen(true)}
        className='flex justify-center items-center px-4 py-2 mb-4 bg-lavender rounded-lg disabled:opacity-50'
      >
        Add new transaction
        <IoMdAddCircle className='ml-2 w-5 h-5' />
      </button>
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-night/55'>
          <div className='relative bg-off-white rounded-lg p-4 pr-12'>
            <form action={create}>
              <label htmlFor='amount' className='sr-only'>
                amount
              </label>
              <input
                type='number'
                name='amount'
                id='amount'
                placeholder='Amount'
                className='bg-off-white rounded-lg px-4 py-2 mb-4'
              />
              <select name='category' id='category'>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select name='type' id='type'>
                <option value='Income'>Income</option>
                <option value='Expense'>Expense</option>
              </select>
              <select name='account' id='account'>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
              <input type='date' name='date' id='date' />
              <button className='px-4 py-2 bg-lavender rounded-lg disabled:opacity-50'>
                Add transaction
              </button>
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
