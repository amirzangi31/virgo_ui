/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@amirzangi31/package/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007E7B",
<<<<<<< HEAD
        secondary: "red"
=======
        gray: {
          100: "#EFF1F0",
          200: "#E6E9E8",
          300: "#D1D1D1",
          400: "#C4C7C6",
          450: "#C9C5CA",
          DEFAULT: "#C5C5C5",
          500: "#8E9190",
          550: "#EBEBEB",
          600: "#444747",
          650: "#f2f2f2",
          700: "#f8f8f8",
          800: "#79767A",
        },
        error: {
          light: "#FFEFEF",
          100: "#FB6C6C",
          DEFAULT: "#E0342A",
          dark: "#CE1B1B",
        }
>>>>>>> 8fda717d82c536fc667d300d5932d3ab96666765
      }
    },
  },
  plugins: [],
}

