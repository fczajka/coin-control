export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export interface Account {
  id: string;
  name: string;
  currency: string;
}

export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  type: string;
  date: string;
  categoryId: string;
  subcategory: string;
  amount: string;
}

export interface TransactionWithNames extends Transaction {
  accountName?: string;
  categoryName?: string;
}

export interface TransactionWithCurrency extends TransactionWithNames {
  currency: string;
}

export interface TransactionWithDateAndTime extends TransactionWithCurrency {
  time: string;
}

export interface RawTransaction {
  id: string;
  userId: string;
  accountId: string;
  type: string;
  date: string;
  categoryId: string;
  subcategory: string;
  amount: string;
}

export interface RawCatagory {
  id: string;
  userId: string;
  name: string;
  subcategories: string[];
}

export interface RawAccount {
  id: string;
  userId: string;
  name: string;
  amount: string;
  currency: string;
}

export interface EncryptedTransaction {
  userId: string;
  accountId: string;
  type: string;
  date: string;
  categoryId: string;
  subcategory: string;
  amount: string;
}
