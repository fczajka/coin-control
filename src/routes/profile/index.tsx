import { component$, useSignal } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { validateJWT } from "~/auth";
import crypto from "crypto-js";
import Field from "~/components/ui/field";
import { ButtonTypes, InputTypes } from "~/enums";
import { decryptValue, encryptValue } from "~/utils";
import type { DecryptedUser, RawUser } from "./interface";
import { db } from "~/db";

export const useGetUser = routeLoader$(
  async ({ cookie }): Promise<DecryptedUser | null> => {
    const jwt = cookie.get("jwt");
    if (!jwt) return null;
    const jwtValue = await validateJWT(jwt.value);
    const user = await db.user.findUnique({ where: { id: jwtValue.id } });
    if (!user) return null;

    const decryptedUser = {
      firstName: decryptValue(user.firstName, jwtValue.pass, jwtValue.iv),
      lastName: decryptValue(user.lastName, jwtValue.pass, jwtValue.iv),
      email: user.email,
    };

    return decryptedUser;
  },
);

export const useEditUser = routeAction$(
  async (data, { cookie }): Promise<RawUser | null> => {
    const jwt = cookie.get("jwt");
    if (!jwt) return null;
    const jwtValue = await validateJWT(jwt.value);
    const user = await db.user.update({
      where: { id: jwtValue.id },
      data: {
        email: String(data.email),
        firstName: encryptValue(
          String(data.firstName),
          jwtValue.pass,
          crypto.enc.Utf8.parse(jwtValue.iv),
        ),
        lastName: encryptValue(
          String(data.lastName),
          jwtValue.pass,
          crypto.enc.Utf8.parse(jwtValue.iv),
        ),
      },
    });
    return user;
  },
);

export default component$(() => {
  const editUserAction = useEditUser();
  const user = useGetUser();
  const isOpen = useSignal<boolean>(false);

  return user.value ? (
    <div>
      <div>
        Hello {user.value.firstName} {user.value.lastName}!
      </div>
      <button
        class="inline-block btn"
        onClick$={() => (isOpen.value = !isOpen.value)}
      >
        Edit your profile
      </button>
      {isOpen.value && (
        <Form action={editUserAction} class="flex-column w-fit">
          <Field label="E - mail" name="email" type={InputTypes.text} />
          <Field label="First name" name="firstName" type={InputTypes.text} />
          <Field label="Last name" name="lastName" type={InputTypes.text} />
          <button class="btn" type={ButtonTypes.submit}>
            Edit your profile
          </button>
        </Form>
      )}
    </div>
  ) : (
    <div>User not found</div>
  );
});
