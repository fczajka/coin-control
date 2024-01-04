import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { checkForALoggedUser } from "~/utils";
import TransactionCard from "./components/transactionCard";
import AddTransactionFormFields from "./components/addTransactionFormFields";
import {
  addCurrencyToTransactions,
  addNamesToIdsInTransactions,
  createEncryptedTransaction,
  decryptAccounts,
  decryptCategories,
  decryptTransactions,
  findByName,
  getAccounts,
  getCategories,
  getTransactions,
  splitDate,
} from "./utils";
import type {
  Account,
  Category,
  Transaction,
  TransactionWithCurrency,
  TransactionWithDateAndTime,
  TransactionWithNames,
} from "./interface";
import { db } from "~/db";

export const useGetTransactions = routeLoader$(async ({ cookie }) => {
  const jwt = await checkForALoggedUser(cookie);
  if (!jwt) return null;

  const transactions = await getTransactions(jwt.id);

  const categories = await getCategories(jwt.id);

  const accounts = await getAccounts(jwt.id);

  const decryptedTransactions: Transaction[] = decryptTransactions(
    transactions,
    jwt,
  );

  const decryptedCategories: Category[] = decryptCategories(categories, jwt);

  const decryptedAccounts: Account[] = decryptAccounts(accounts, jwt);

  const transactionsWithNames: TransactionWithNames[] =
    addNamesToIdsInTransactions(
      decryptedTransactions,
      decryptedCategories,
      decryptedAccounts,
    );

  const transactionsWithCurrency: TransactionWithCurrency[] =
    addCurrencyToTransactions(transactionsWithNames, decryptedAccounts);

  const transactionWithDateAndTime: TransactionWithDateAndTime[] = splitDate(
    transactionsWithCurrency,
  );

  return transactionWithDateAndTime;
});

export const useCreateTransaction = routeAction$(async (data, { cookie }) => {
  const jwt = await checkForALoggedUser(cookie);
  if (!jwt) return null;

  const categories = await getCategories(jwt.id);

  const accounts = await getAccounts(jwt.id);

  const decryptedAccounts = decryptAccounts(accounts, jwt);

  const decryptedCategories = decryptCategories(categories, jwt);

  const accountId = findByName(decryptedAccounts, data.Account.toString());

  if (!accountId) return null;

  const desiredCategoryId = findByName(
    decryptedCategories,
    data.Category.toString(),
  );

  if (!desiredCategoryId) return null;

  const transaction = await db.transaction.create({
    data: createEncryptedTransaction(jwt, accountId, desiredCategoryId, data),
  });

  return transaction;
});

export default component$(() => {
  const transactions = useGetTransactions();
  const createTransactionAction = useCreateTransaction();

  return !transactions.value?.length ? (
    <div>
      <div>No transactions</div>
      <div class="flex">
        <Form action={createTransactionAction} class="flex-column">
          <AddTransactionFormFields />
        </Form>
      </div>
    </div>
  ) : (
    <div class="flex">
      <div class="flex basis-1/2">
        <ul class="flex-column">
          {transactions.value.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              account={transaction.accountName}
              category={transaction.categoryName}
              subcategory={transaction.subcategory}
              amount={transaction.amount}
              currency={transaction.currency}
              time={transaction.time}
            />
          ))}
        </ul>
      </div>
      <div class="flex justify-end basis-1/2">
        <Form action={createTransactionAction} class="flex-column">
          <AddTransactionFormFields />
        </Form>
      </div>
    </div>
  );
});
