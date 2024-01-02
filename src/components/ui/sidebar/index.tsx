import { component$ } from "@builder.io/qwik";
import SidebarLink from "./sidebarLink";
import { sidebar } from "~/content";

export default component$((props) => {
  return (
    <header class="basis-1/8 bg-slate-100 p-primary rounded-l-3xl">
      <ul>
        {!props.isLoggedIn
          ? sidebar.map(
              (link) =>
                !link.isPrivate && (
                  <SidebarLink
                    key={link.text}
                    href={link.href}
                    text={link.text}
                  />
                ),
            )
          : sidebar.map((link) => (
              <SidebarLink key={link.text} href={link.href} text={link.text} />
            ))}
        {props.isLoggedIn && <SidebarLink href="/sign-out" text="Sign out" />}
      </ul>
    </header>
  );
});
