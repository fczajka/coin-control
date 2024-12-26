import db from '@/db';

export default async function Transactions() {
  'use server';
  const transactions = await db.transaction.findMany({
    select: {
      id: true,
      category: true,
    },
    where: { userId: 'root' },
  });
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>{transaction.category.name}</li>
        ))}
      </ul>
    </div>
  );
}
