'use server';

import db from '@/db';
import { revalidatePath } from 'next/cache';

export async function create(formData: FormData): Promise<void> {
  const rawFormData = {
    amount: formData.get('amount'),
    categoryId: formData.get('category'),
    accountId: formData.get('account'),
    type: formData.get('type'),
    date: formData.get('date'),
  };

  if (!rawFormData.amount) return;
  if (!rawFormData.categoryId) return;
  if (!rawFormData.accountId) return;
  if (!rawFormData.type) return;
  if (!rawFormData.date) return;

  await db.transaction.create({
    data: {
      userId: 'root',
      accountId: 'rootAcc',
      type: rawFormData.type as 'Income' | 'Expense',
      date: rawFormData.date as string,
      amount: rawFormData.amount as string,
      categoryId: rawFormData.categoryId as string,
    },
  });

  revalidatePath('/');
}

export async function deleteTansaction(id: string): Promise<void> {
  await db.transaction.delete({ where: { id } });
  revalidatePath('/');
}
