/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            scale: '90w',
          },
          '50%': {
            opacity: '0.1',
            scale: '95',
          },
          '100%': {
            opacity: '1',
            scale: '100',
          },
        },
      },
    },
  },
  plugins: [],
};
