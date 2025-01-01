'use server';

import db from '@/db';
import { revalidatePath } from 'next/cache';

export async function deleteProfile(id: string): Promise<void> {
  await db.category.delete({
    where: { id: id },
  });
  revalidatePath('/');
}

export async function updateProfile(
  userId: string,
  formData: FormData,
): Promise<void> {
  await db.user.update({
    data: {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
    },
    where: { id: userId },
  });
  revalidatePath('/');
}

export async function updatePassword(
  userId: string,
  formData: FormData,
): Promise<void> {
  await db.user.update({
    data: {
      key: formData.get('newPassword') as string,
    },
    where: { id: userId },
  });
  revalidatePath('/');
}

export async function createAccount(
  userId: string,
  formData: FormData,
): Promise<void> {
  await db.account.create({
    data: {
      userId: userId,
      name: formData.get('accountName') as string,
      amount: formData.get('accountBalance') as string,
      currency: formData.get('currency') as string,
    },
  });
  revalidatePath('/');
}

export async function updateAccount(
  accountId: string,
  formData: FormData,
): Promise<void> {
  await db.account.update({
    data: {
      name: formData.get('accountName') as string,
      amount: formData.get('accountBalance') as string,
      currency: formData.get('currency') as string,
    },
    where: { id: accountId },
  });
  revalidatePath('/');
}

export async function deleteAccount(accountId: string): Promise<void> {
  await db.account.delete({
    where: { id: accountId },
  });
  revalidatePath('/');
}
