import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#002d5b',
        lavender: '#695ca5'
      }
    }
  },
  plugins: []
};

export default config;
