import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import Footer from "~/components/ui/footer";
import Sidebar from "~/components/ui/sidebar";

// eslint-disable-next-line require-await
export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <div class="w-screen h-screen flex-center p-8 font-default text-dark-950 bg-gradient-to-br from-sky-400 to-fuchsia-400">
      <div
        class="basis-full h-full flex backdrop-blur-2xl rounded-tertiary"
        un-bg="slate-200 opacity-70"
      >
        <Sidebar />
        <div
          class="basis-7/8 flex-column p-primary rounded-r-3xl"
          un-border="~ slate-100 2px solid"
        >
          <main class="basis-11/12">
            <Slot />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
});
