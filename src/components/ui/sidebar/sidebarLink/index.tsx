import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { LinkProps } from "./interface";

export default component$<LinkProps>((props) => {
  const location = useLocation();
  const currentPath = location.url.pathname.replaceAll("/", "");

  return (
    <li key={props.text} class="w-full" un-m="y-2 first:t-0">
      <a
        href={props.href}
        class={`sidebar-link ${
          props.href.replaceAll("/", "") === currentPath &&
          "sidebar-link-active"
        }`}
      >
        {props.text}
      </a>
    </li>
  );
});
