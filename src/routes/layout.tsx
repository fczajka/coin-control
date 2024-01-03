import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import Sidebar from "~/components/ui/sidebar";
import Footer from "~/components/ui/footer";
import { sidebar } from "~/content";

export const onGet: RequestHandler = ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export const onRequest: RequestHandler = ({ cookie, redirect, request }) => {
  if (cookie.get("jwt")) return;

  const isPrivateRoute: boolean = !!sidebar.find(
    ({ isPrivate, href }) => isPrivate && request.url.includes(href),
  );

  if (isPrivateRoute) throw redirect(302, "/sign-in/");
};

export const useLoginStatus = routeLoader$(({ cookie }) => {
  const jwt = cookie.get("jwt");
  return jwt ? true : false;
});

export default component$(() => {
  const loginStatus = useLoginStatus();
  return (
    <div class="w-screen h-screen flex-center p-8 font-default text-dark-950 bg-gradient-to-br from-sky-400 to-fuchsia-400">
      <div
        class="basis-full h-full flex backdrop-blur-2xl rounded-tertiary"
        un-bg="slate-200 opacity-70"
      >
        <Sidebar isLoggedIn={loginStatus.value} />
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
