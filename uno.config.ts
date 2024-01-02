// uno.config.ts
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetWebFonts,
  presetIcons,
} from "unocss";

export default defineConfig({
  content: {
    filesystem: ["./src/**/*.{ts,tsx}"],
  },
  rules: [
    ["p-primary", { padding: "1rem" }],
    ["p-primary-diff", { padding: "0.5rem 1rem" }],
    ["p-secondary-diff", { padding: "0.25rem 0.5rem" }],
    ["rounded-primary", { "border-radius": "0.75rem" }],
    ["rounded-secondary", { "border-radius": "1rem" }],
    ["rounded-tertiary", { "border-radius": "1.5rem" }],
  ],
  presets: [
    presetUno(),
    presetAttributify({
      prefix: "un-",
      strict: true,
      prefixedOnly: true,
    }),
    presetIcons({
      collections: {
        mdi: () =>
          import("@iconify-json/mdi/icons.json").then((i) => i.default),
      },
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetWebFonts({
      provider: "google",
      fonts: {
        default: [
          { name: "Noto Sans", weights: ["400"] },
          { name: "sans-serif", provider: "none" },
        ],
        headline: [
          { name: "Righteous", weights: ["400"] },
          { name: "display", provider: "none" },
        ],
      },
    }),
  ],
  shortcuts: {
    "flex-column": "flex flex-col",
    "flex-center": "flex items-center justify-center",
    "sidebar-link":
      "block decoration-none p-primary rounded-secondary transition-all text-dark-950 hover:text-slate-100 hover:bg-fuchsia-400",
    "sidebar-link-active": "bg-fuchsia-400 text-slate-50",
  },
});
