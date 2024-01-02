import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>Home</div>;
});

export const head: DocumentHead = {
  title: "Coin Control",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
