import { PBKDF2, HmacSHA256 } from "~/crypto";

export const hashPassword = (password: string, salt: string): string => {
  const key = PBKDF2(HmacSHA256(password, salt), salt, {
    keySize: 256 / 32,
    iterations: 1000,
  }).toString();
  return key;
};
