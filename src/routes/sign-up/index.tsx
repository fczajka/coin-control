import { component$, useSignal } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import Field from "~/components/ui/field";
import { baseAccounts, baseCategories, signUpForm } from "~/content";
import {
  addAmountToBaseAccounts,
  addUserIdToBaseAccounts,
  addUserIdToBaseCategories,
  encryptCreateUserData,
} from "./utils";
import { ButtonTypes, InputTypes } from "~/enums";
import { db } from "~/db";

export const useCreateUser = routeAction$(async (data) => {
  const encryptedData = encryptCreateUserData(
    data,
    baseCategories,
    baseAccounts,
  );

  const user = await db.user.create({
    data: {
      email: data.email.toString(),
      firstName: encryptedData.encrypedFirstName,
      lastName: encryptedData.encrypedLastName,
      salt: encryptedData.salt,
      iv: encryptedData.iv.toString(),
    },
  });

  const encryptedBaseCategories = await db.category.createMany({
    data: addUserIdToBaseCategories(encryptedData.enryptedCategories, user.id),
  });

  const encryptedUserBaseAccounts = addUserIdToBaseAccounts(
    encryptedData.encryptedAccounts,
    user.id,
  );

  const encryptedBaseAccounts = await db.account.createMany({
    data: addAmountToBaseAccounts(encryptedUserBaseAccounts),
  });

  return { user, encryptedBaseCategories, encryptedBaseAccounts };
});

export default component$(() => {
  const createUserAction = useCreateUser();
  const chosenCurrency = useSignal<string>("USD");
  return (
    <div class="flex">
      <Form action={createUserAction} class="flex-column">
        {signUpForm.fields.map((field) => (
          <Field
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
          />
        ))}
        <div class="mt-6">Choose your currency:</div>
        <input
          name="currency"
          type={InputTypes.text}
          value={chosenCurrency.value}
          hidden
        />
        <div class="flex gap-2">
          {signUpForm.currencies.map((currency) => (
            <button
              key={currency}
              type={ButtonTypes.button}
              onClick$={() => (chosenCurrency.value = currency)}
              class={`bg-fuchsia-400 p-primary-diff rounded-full transition-all cursor-pointer hover:bg-sky-400 focus:bg-sky-400 ${
                currency === chosenCurrency.value && "bg-sky-400"
              }`}
            >
              {currency}
            </button>
          ))}
        </div>
        <button class="btn" type={signUpForm.button.type}>
          {signUpForm.button.text}
        </button>
      </Form>
    </div>
  );
});
