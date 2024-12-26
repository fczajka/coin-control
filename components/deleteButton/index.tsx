'use client';

import { MdDelete } from 'react-icons/md';
import type { DeleteButtonProps } from './interface';

export default function DeleteButton({ id, callback }: DeleteButtonProps) {
  return (
    <MdDelete className='w-5 h-5 cursor-pointer' onClick={() => callback(id)} />
  );
}
