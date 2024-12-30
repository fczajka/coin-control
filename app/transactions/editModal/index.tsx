'use client';

import { MdEdit } from 'react-icons/md';
import { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import type { EditModalProps } from './interface';
import { updateTransaction } from '../actions';

export default function EditModal({
  transactionId,
  accounts,
  categories,
}: EditModalProps) {
  const updateTransactionWithId = updateTransaction.bind(null, transactionId);
  const [isOpen, setIsOpen] = useState(false);

  console.log('test');

  return (
    <>
      <MdEdit
        className='w-5 h-5 ml-4 mr-1 cursor-pointer'
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-night/55'>
          <div className='relative bg-off-white rounded-lg p-4 pr-12'>
            <form action={updateTransactionWithId}>
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
                Update transaction
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
