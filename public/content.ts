import { ButtonTypes, InputTypes } from "~/globals/enums";

export const sidebar = [
  { text: "Home", isPrivate: false, href: "/" },
  { text: "Dashboard", isPrivate: true, href: "/dashboard" },
  { text: "Categories", isPrivate: true, href: "/categories" },
  { text: "Analytics", isPrivate: true, href: "/analytics" },
  { text: "Transactions", isPrivate: true, href: "/transactions" },
  { text: "About", isPrivate: false, href: "/about" },
  { text: "Profile", isPrivate: true, href: "/profile" },
  { text: "Sign up", isPrivate: false, href: "/sign-up" },
  { text: "Sign in", isPrivate: false, href: "/sign-in" },
];

export const signUpForm = {
  fields: [
    { name: "firstName", label: "First name", type: InputTypes.text },
    { name: "lastName", label: "Last name", type: InputTypes.text },
    { name: "email", label: "E - mail", type: InputTypes.text },
    { name: "password", label: "Password", type: InputTypes.password },
  ],
  currencies: ["USD", "EUR", "GBP", "PLN"],
  button: { text: "Sign up", type: ButtonTypes.submit },
};

export const baseCategories = [
  {
    name: "Food & Drinks",
    subcategories: ["Restaurant", "Groceries", "Delivery", "Other"],
  },
  {
    name: "Shopping",
    subcategories: ["Clothes", "Tech & Electronics", "Gifts", "Pets", "Other"],
  },
  {
    name: "Housing",
    subcategories: ["Utilities", "Mortgage & Rent", "Maintenance", "Other"],
  },
  {
    name: "Bills",
    subcategories: ["Mobile", "Internet", "Subscriptions", "Taxes", "Other"],
  },
  {
    name: "Transport",
    subcategories: ["Public", "Taxi", "Long distance", "Other"],
  },
  {
    name: "Vehicle",
    subcategories: [
      "Gas",
      "Parking",
      "Main",
      "Maintenance",
      "Insurance",
      "Other",
    ],
  },
  {
    name: "Lifestyle",
    subcategories: [
      "Entertainment",
      "healthcare",
      "Sports",
      "Hobbies",
      "Trips & Holidays",
      "Other",
    ],
  },
  {
    name: "Other",
    subcategories: ["Other"],
  },
];

export const baseAccounts = [
  { name: "Bank account", amount: 0 },
  { name: "Cash", amount: 0 },
  { name: "Investments", amount: 0 },
];
