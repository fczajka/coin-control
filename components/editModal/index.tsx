'use client';

import { MdEdit } from 'react-icons/md';
import { useState } from 'react';
import type { EditButtonProps } from './interface';
import { IoMdCloseCircle } from 'react-icons/io';
import { editCategory } from '@/app/categories/actions';
import FormButton from '../formButton';

export default function EditModal({ categoryId, name }: EditButtonProps) {
  const editCategoryWithId = editCategory.bind(null, categoryId);
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
            <form action={editCategoryWithId}>
              <label htmlFor='category' className='sr-only'>
                Category
              </label>
              <input
                type='text'
                id='categoryName'
                name='categoryName'
                className='w-full bg-off-white rounded-lg px-4 py-2 mb-4'
                placeholder='Category'
                defaultValue={name}
              />
              <FormButton>Update category</FormButton>
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
