import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#687dac',
        'light-bg': '#d2e0ee',
        'accent-warm': '#f2e3d2',
        'soft-neutral': '#c8d9d3',
        'secondary-accent': '#84a29f',
      },
    },
  },
  plugins: [],
};

export default config;
