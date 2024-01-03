import { SignJWT, jwtVerify } from "jose";
import type { Payload, Secrets } from "./interface";

export const createJWT = (user: Secrets): Promise<string> => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({
    payload: { id: user.id, pass: user.secret, iv: user.iv },
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string): Promise<Payload> => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET),
  );

  return payload.payload as Payload;
};
