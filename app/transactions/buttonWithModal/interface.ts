import type { Account, Category } from '@prisma/client';

export interface ButtonWithModalProps {
  accounts: Account[];
  categories: Category[];
}
