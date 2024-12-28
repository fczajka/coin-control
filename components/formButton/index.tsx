'use client';

import { useFormStatus } from 'react-dom';
import type { FormButtonProps } from './interface';

export default function FormButton({ children, fullFlex }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`px-4 py-2 bg-lavender rounded-lg disabled:opacity-50 ${fullFlex && 'flex justify-center items-center'}`}
    >
      {children}
    </button>
  );
}
