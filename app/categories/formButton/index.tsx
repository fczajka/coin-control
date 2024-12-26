'use client';

import { useFormStatus } from 'react-dom';
import { IoMdAddCircle } from 'react-icons/io';

export default function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className='flex justify-center items-center px-4 py-2 mb-4 bg-lavender rounded-lg disabled:opacity-50'
    >
      Add new category <IoMdAddCircle className='ml-2 w-5 h-5' />
    </button>
  );
}
