import type { HTMLProps, ReactNode } from 'react';

export interface FormButtonProps extends HTMLProps<HTMLButtonElement> {
  children: ReactNode;
  fullFlex?: boolean;
}
