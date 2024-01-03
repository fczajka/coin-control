import { component$ } from "@builder.io/qwik";
import type { NotificationProps } from "./interface";

export default component$<NotificationProps>((props) => {
  return (
    <>
      {props.data &&
        props.data.firstName !== "" &&
        props.data.firstName !== "Error" && (
          <div class="flex-column">
            Successfully logged in, you will be redirected to home page soon
          </div>
        )}
      {props.data?.email === "Error" && (
        <div class="flex-column">Wrong credentials!</div>
      )}
      {props.data?.firstName === "" && (
        <div class="flex-column">Wrong credentials!</div>
      )}
    </>
  );
});
