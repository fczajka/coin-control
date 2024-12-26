import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#FAF9F6',
        seafoam: '#9BE5BE',
        sunset: '#F1C685',
        lavender: '#CBACE8',
        night: '#1C1C1C',
      },
      fontFamily: {
        default: ['var(--font-nunito)', 'ui-serif', 'Georgia'],
        headline: ['var(--font-arvo)', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
} satisfies Config;
