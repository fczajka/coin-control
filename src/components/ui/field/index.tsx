import { component$ } from "@builder.io/qwik";
import type { InputProps } from "./interface";

export default component$<InputProps>((props) => {
  return (
    <label class={`mt-6 ${props.hidden ? "hidden" : "flex-column"}`}>
      {props.label}:
      <input
        class="mt-1 rounded-primary p-secondary-diff"
        name={props.name}
        type={props.type}
        value={props.value}
        onKeyUp$={props.onKeyUp$}
      />
    </label>
  );
});
