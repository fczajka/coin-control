import { component$ } from "@builder.io/qwik";
import Field from "~/components/ui/field";
import { ButtonTypes, InputTypes } from "~/enums";

export default component$(() => {
  return (
    <>
      <Field name="Account" label="Account" type={InputTypes.text} />
      <Field name="Category" label="Category" type={InputTypes.text} />
      <Field name="Subcategory" label="Subcategory" type={InputTypes.text} />
      <Field name="Type" label="Type" type={InputTypes.text} />
      <Field name="Amount" label="Amount" type={InputTypes.number} />
      <Field name="Date" label="Date" type={InputTypes.dateTimeLocal} />
      <button class="btn" type={ButtonTypes.submit}>
        Add transaction
      </button>
    </>
  );
});
