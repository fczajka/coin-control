import { type Cookie } from "@builder.io/qwik-city";
import crypto from "crypto-js";
import { validateJWT } from "~/auth";
import type { Payload } from "~/auth/interface";
import { db } from "~/db";

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

export const checkForALoggedUser = async (
  cookie: Cookie,
): Promise<Payload | undefined> => {
  const jwt = cookie.get("jwt");
  if (!jwt) return;

  const jwtValue = await validateJWT(jwt.value);
  const user = await db.user.findUnique({ where: { id: jwtValue.id } });
  if (!user) return;

  // eslint-disable-next-line consistent-return
  return jwtValue;
};
