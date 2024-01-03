export interface BaseCategory {
  name: string;
  subcategories: string[];
}

export interface UserBaseCategory {
  name: string;
  subcategories: string[];
  userId: string;
}

export interface BaseAccount {
  name: string;
  amount: number;
}

export interface EncryptedBaseAccount {
  name: string;
  amount: string;
  currency: string;
}

export interface UserBaseAccount {
  userId: string;
  name: string;
  amount: string;
  currency: string;
}
export interface Password {
  secret: string;
  salt: string;
}
export interface EncryptedUserData {
  salt: string;
  iv: CryptoJS.lib.WordArray;
  encrypedFirstName: string;
  encrypedLastName: string;
  enryptedCategories: BaseCategory[];
  encryptedCurrency: string;
  encryptedAccounts: EncryptedBaseAccount[];
}

export interface BaseCategories {
  name: string;
  subcategories: string[];
}
