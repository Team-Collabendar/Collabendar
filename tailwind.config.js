/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/components/**/*.{js,ts,jsx,tsx,mdx}", 
    "./client/server/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

