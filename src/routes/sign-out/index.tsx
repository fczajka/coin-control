import { component$ } from "@builder.io/qwik";
import { server$, useNavigate } from "@builder.io/qwik-city";

const signOut = server$(function (cookieName: string) {
  this.cookie.delete(cookieName, {
    path: "/",
  });
  if (this.cookie.get(cookieName)) return true;

  return false;
});

export default component$(() => {
  const nav = useNavigate();
  return (
    <div class="flex">
      <button
        class="btn"
        type="submit"
        onClick$={async () => {
          const isSignedOut = await signOut("jwt");
          if (!isSignedOut) nav("/");
        }}
      >
        Sign out
      </button>
    </div>
  );
});
