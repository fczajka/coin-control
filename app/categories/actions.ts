'use server';

import db from '@/db';
import { revalidatePath } from 'next/cache';

export async function create(formData: FormData): Promise<void> {
  const rawFormData = {
    name: formData.get('categoryName'),
  };

  if (!rawFormData.name) return;

  await db.category.create({
    data: { name: rawFormData.name as string, userId: 'root' },
  });

  revalidatePath('/');
}

export async function deleteCategory(id: string): Promise<void> {
  await db.category.delete({
    where: { id: id },
  });
  revalidatePath('/');
}
