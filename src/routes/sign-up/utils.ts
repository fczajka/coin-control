import { encryptValue, generateRandomWordArray } from "~/utils";
import type { JSONObject } from "@builder.io/qwik-city";
import type {
  BaseAccount,
  BaseCategories,
  BaseCategory,
  EncryptedBaseAccount,
  EncryptedUserData,
  Password,
  UserBaseAccount,
  UserBaseCategory,
} from "./interface";
import { HmacSHA256, PBKDF2 } from "~/crypto";

export const hashPassword = (password: string): Password => {
  const salt = generateRandomWordArray().toString();
  const secret = PBKDF2(HmacSHA256(password, salt), salt, {
    keySize: 256 / 32,
    iterations: 1000,
  }).toString();
  return { secret, salt };
};

export const encryptCreateUserData = (
  data: JSONObject,
  baseCategories: BaseCategories[],
  baseAccounts: BaseAccount[],
): EncryptedUserData => {
  const hash = hashPassword(data.password.toString());
  const secret = hash.secret;
  const salt = hash.salt;
  const iv = generateRandomWordArray();
  const encrypedFirstName = encryptValue(data.firstName.toString(), secret, iv);
  const encrypedLastName = encryptValue(data.lastName.toString(), secret, iv);
  const enryptedCategories = encryptBaseCategories(baseCategories, secret, iv);
  const encryptedCurrency = encryptValue(data.currency.toString(), secret, iv);
  const encryptedAccounts = encryptBaseAccounts(
    baseAccounts,
    data.currency.toString(),
    secret,
    iv,
  );

  return {
    salt,
    iv,
    encrypedFirstName,
    encrypedLastName,
    enryptedCategories,
    encryptedCurrency,
    encryptedAccounts,
  };
};

const encryptBaseCategories = (
  data: BaseCategory[],
  secret: string,
  iv: CryptoJS.lib.WordArray,
): BaseCategory[] => {
  const enryptedCategories = data.map((category: BaseCategory) => {
    const name = encryptValue(category.name, secret, iv);
    const subcategories = category.subcategories.map((subcategory: string) => {
      return encryptValue(subcategory, secret, iv);
    });
    return { name, subcategories };
  });
  return enryptedCategories;
};

export const addUserIdToBaseCategories = (
  categories: BaseCategory[],
  userId: string,
): UserBaseCategory[] => {
  return categories.map((category: BaseCategory) => ({
    ...category,
    userId: userId,
  }));
};

const encryptBaseAccounts = (
  data: BaseAccount[],
  currency: string,
  secret: string,
  iv: CryptoJS.lib.WordArray,
): EncryptedBaseAccount[] => {
  return data.map((account: BaseAccount) => {
    return {
      name: encryptValue(account.name, secret, iv),
      amount: encryptValue(account.amount.toString(), secret, iv),
      currency: encryptValue(currency, secret, iv),
    };
  });
};

export const addUserIdToBaseAccounts = (
  accounts: EncryptedBaseAccount[],
  userId: string,
): UserBaseAccount[] => {
  return accounts.map((account: EncryptedBaseAccount) => ({
    ...account,
    userId: userId,
  }));
};

export const addAmountToBaseAccounts = (
  accounts: UserBaseAccount[],
): UserBaseAccount[] => {
  return accounts.map((account: UserBaseAccount) => ({
    ...account,
    amount: account.amount,
  }));
};
