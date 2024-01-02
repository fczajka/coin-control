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
});
