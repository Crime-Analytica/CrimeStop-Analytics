module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      
    },
    extend: {
      width: {
        '128': '59.9rem',
      }
    },
  },
  plugins: [
     require('daisyui'),
  ],
};
