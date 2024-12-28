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

export async function editCategory(
  categoryId: string,
  formData: FormData,
): Promise<void> {
  await db.category.update({
    data: { name: formData.get('categoryName') as string },
    where: { id: categoryId },
  });
  revalidatePath('/');
}
