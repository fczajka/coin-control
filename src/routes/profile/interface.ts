export interface RawUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  salt: string;
  iv: string;
  deleted: boolean;
}

export interface DecryptedUser {
  firstName: string;
  lastName: string;
  email: string;
}
