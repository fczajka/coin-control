import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import Field from "~/components/ui/field";
import { signInForm } from "~/content";
import { hashPassword } from "./utils";
import Notification from "~/components/ui/notification";
import { decryptValue } from "~/utils";
import { createJWT } from "~/auth";
import { db } from "~/db";

export const useGetUser = routeAction$(async (data, { cookie }) => {
  const user = await db.user.findUnique({
    where: { email: data.email.toString() },
  });

  const errorData = {
    userId: "Error",
    secret: "Error",
    email: "Error",
    firstName: "Error",
    lastName: "Error",
    iv: "Error",
  };

  if (!user) return errorData;

  try {
    const secret = hashPassword(data.password.toString(), user.salt);
    const firstName = decryptValue(user.firstName, secret, user.iv);
    const lastName = decryptValue(user.lastName, secret, user.iv);

    if (!firstName || !lastName) return errorData;

    const decryptedData = {
      firstName,
      lastName,
    };

    const jwtData = {
      id: user.id,
      secret: secret,
      iv: user.iv,
    };

    const jwt: string = await createJWT(jwtData);

    cookie.set("jwt", jwt, {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });

    return decryptedData;
  } catch (e) {
    return errorData;
  }
});

export default component$(() => {
  const getUserAction = useGetUser();

  return (
    <div class="flex">
      <Form action={getUserAction} class="flex-column">
        {signInForm.fields.map((field) => (
          <Field
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
          />
        ))}
        <button class="btn" type={signInForm.button.type}>
          {signInForm.button.text}
        </button>
      </Form>
      <Notification data={getUserAction.value} />
    </div>
  );
});
