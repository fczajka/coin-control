import db from '@/db';
import ButtonWithModal from './buttonWithModal';
import type { Account, Category } from '@prisma/client';

export default async function Transactions() {
  'use server';

  const transactions = await db.transaction.findMany({
    select: { id: true, category: true, amount: true },
    where: { userId: 'root' },
  });

  const accounts: Account[] = await db.account.findMany({
    where: { userId: 'root' },
    orderBy: { name: 'asc' },
  });

  const categories: Category[] = await db.category.findMany({
    where: { userId: 'root' },
    orderBy: { name: 'asc' },
  });

  return (
    <div>
      <h2 className='font-headline text-xl mb-12'>Transactions</h2>
      <ButtonWithModal accounts={accounts} categories={categories} />
      <ul className='flex flex-col gap-4'>
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className='w-80 flex justify-between items-center bg-lavender rounded-lg px-4 py-2'
          >
            {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
