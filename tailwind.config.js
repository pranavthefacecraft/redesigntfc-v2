module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['NeometricBold', 'sans-serif'],
      }
    },
  },
  plugins: [ require("tailwind-scrollbar") ],
};