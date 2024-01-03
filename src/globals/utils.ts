import crypto from "crypto-js";

export const generateRandomWordArray = (): crypto.lib.WordArray => {
  return crypto.lib.WordArray.random(128 / 8);
};

export const encryptValue = (
  value: string,
  secret: string,
  iv: crypto.lib.WordArray,
): string => {
  return crypto.AES.encrypt(value, secret, {
    iv: iv,
  }).toString();
};

export const decryptValue = (
  data: string,
  secret: string,
  iv: string,
): string => {
  return crypto.AES.decrypt(data, secret, {
    iv: crypto.enc.Utf8.parse(iv),
  }).toString(crypto.enc.Utf8);
};
