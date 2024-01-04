import { component$ } from "@builder.io/qwik";
import type { TransactionCardProps } from "./interface";

export default component$<TransactionCardProps>((props) => {
  const { account, category, subcategory, amount, currency, time } = props;
  const setSubcategory = category !== "Other" && ` • ${subcategory}`;

  return (
    <li class="w-72 flex justify-between p-primary my-2 rounded-primary bg-slate-100 first:mt-0">
      <div>
        <div>
          {category}
          {setSubcategory}
        </div>
        <div>{account}</div>
      </div>
      <div class="text-right">
        <div>{`${amount} ${currency}`}</div>
        <div>{time}</div>
      </div>
    </li>
  );
});
