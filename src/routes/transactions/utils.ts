import type { JSONObject } from "@builder.io/qwik-city";
import { decryptValue, encryptValue } from "~/utils";
import type {
  Category,
  Account,
  Transaction,
  TransactionWithNames,
  TransactionWithDateAndTime,
  TransactionWithCurrency,
  RawTransaction,
  RawCatagory,
  RawAccount,
  EncryptedTransaction,
} from "./interface";
import type { Payload } from "~/auth/interface";
import type { Item } from "./type";
import { db } from "~/db";
import crypto from "crypto-js";

export const extractDate = (dateTime: string): string => {
  return dateTime.split("T")[0];
};

export const extractTime = (dateTime: string): string => {
  return dateTime.split("T")[1];
};

export const getTransactions = async (
  userId: string,
): Promise<RawTransaction[]> => {
  const transactions = await db.transaction.findMany({
    where: { userId: userId },
  });

  if (!transactions.length) return [];

  return transactions;
};

export const getCategories = async (userId: string): Promise<RawCatagory[]> => {
  const categories = await db.category.findMany({
    where: { userId: userId },
  });

  if (!categories.length) return [];

  return categories;
};

export const getAccounts = async (userId: string): Promise<RawAccount[]> => {
  const accounts = await db.account.findMany({
    where: { userId: userId },
  });

  if (!accounts.length) return [];

  return accounts;
};

export const decryptTransactions = (
  transactions: Transaction[],
  jwt: Payload,
): Transaction[] => {
  const decryptedTransactions = transactions.map(
    (transaction: Transaction): Transaction => {
      return {
        id: transaction.id,
        userId: transaction.userId,
        categoryId: transaction.categoryId,
        accountId: transaction.accountId,
        amount: decryptValue(transaction.amount, jwt.pass, jwt.iv),
        date: decryptValue(transaction.date, jwt.pass, jwt.iv),
        subcategory: decryptValue(transaction.subcategory, jwt.pass, jwt.iv),
        type: decryptValue(transaction.type, jwt.pass, jwt.iv),
      };
    },
  );

  if (!decryptedTransactions.length) return [];

  return decryptedTransactions;
};

export const decryptCategories = (
  categories: Category[],
  jwt: Payload,
): Category[] => {
  const decryptedCategories = categories.map((category: Category): Category => {
    return {
      id: category.id,
      name: decryptValue(category.name, jwt.pass, jwt.iv),
      subcategories: category.subcategories.map((subcategory) => {
        return decryptValue(subcategory, jwt.pass, jwt.iv);
      }),
    };
  });

  if (!decryptedCategories.length) return [];

  return decryptedCategories;
};

export const decryptAccounts = (
  accounts: Account[],
  jwt: Payload,
): Account[] => {
  const decryptedAccounts = accounts.map((account): Account => {
    return {
      id: account.id,
      name: decryptValue(account.name, jwt.pass, jwt.iv),
      currency: decryptValue(account.currency, jwt.pass, jwt.iv),
    };
  });

  if (!decryptedAccounts.length) return [];

  return decryptedAccounts;
};

export const addNamesToIdsInTransactions = (
  transactions: Transaction[],
  categories: Category[],
  accounts: Account[],
): TransactionWithNames[] => {
  const transactionsWithNames = transactions.map(
    (transaction: Transaction): TransactionWithNames => {
      const accountName = accounts.find(
        (account) => account.id === transaction.accountId,
      )?.name;

      const categoryName = categories.find(
        (category) => category.id === transaction.categoryId,
      )?.name;

      return {
        ...transaction,
        accountName,
        categoryName,
      };
    },
  );

  if (!transactionsWithNames.length) return [];

  return transactionsWithNames;
};

export const addCurrencyToTransactions = (
  transactions: TransactionWithNames[],
  accounts: Account[],
): TransactionWithCurrency[] => {
  const transactionsWithCurrency = transactions.map(
    (transaction: TransactionWithNames): TransactionWithCurrency => {
      const currency = accounts.find(
        (account) => account.id === transaction.accountId,
      )?.currency;

      if (!currency)
        throw new Error(`Account with id ${transaction.accountId} not found`);

      return {
        ...transaction,
        currency,
      };
    },
  );

  if (!transactionsWithCurrency.length) return [];

  return transactionsWithCurrency;
};

export const findByName = <T extends Item>(
  items: T[],
  searchedItem: string,
): string | null => {
  const item = items.find((item) => item.name === searchedItem);

  if (!item) return null;

  return item.id;
};

export const createEncryptedTransaction = (
  jwt: Payload,
  accountId: string,
  categoryId: string,
  data: JSONObject,
): EncryptedTransaction => {
  return {
    userId: jwt.id,
    accountId: accountId,
    type: encryptValue(
      data.Type.toString(),
      jwt.pass,
      crypto.enc.Utf8.parse(jwt.iv),
    ),
    date: encryptValue(
      data.Date.toString(),
      jwt.pass,
      crypto.enc.Utf8.parse(jwt.iv),
    ),
    categoryId: categoryId,
    subcategory: encryptValue(
      data.Subcategory.toString(),
      jwt.pass,
      crypto.enc.Utf8.parse(jwt.iv),
    ),
    amount: encryptValue(
      data.Amount.toString(),
      jwt.pass,
      crypto.enc.Utf8.parse(jwt.iv),
    ),
  };
};

export const splitDate = (
  transactions: TransactionWithCurrency[],
): TransactionWithDateAndTime[] => {
  const transactionsWithDateAndTime = transactions.map(
    (transaction): TransactionWithDateAndTime => {
      const date = extractDate(transaction.date);
      const time = extractTime(transaction.date);
      return { ...transaction, date, time };
    },
  );

  if (!transactionsWithDateAndTime.length) return [];

  return transactionsWithDateAndTime;
};
