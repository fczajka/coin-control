import type { Account, Category } from '@prisma/client';

export interface EditModalProps {
  transactionId: string;
  accounts: Account[];
  categories: Category[];
}
