/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-shadow": "0px 0px 10px 3px #F9F9F980",
        "price-white-shadow": "0px 0px 10px 3px #F9F9F980",
        "tab-shadow": "0px 0px 2.39px 0px #0000001A inset",
        'nav': '0 8px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        sm: "320px",
      },
      colors: {
        light: "#F5F5F7",
        dark: "#454545",
        blue: "#0071E3",
      },
      backgroundImage: {
        "gradient-custom":
          "linear-gradient(217.59deg, rgba(131, 131, 131, 0.4) 14.14%, rgba(255, 255, 255, 0.04) 124.21%);",
        AiAgent: "url('/assets/svg/background.svg')",
        "price-bg": " linear-gradient(180deg, #001F3F -2.54%, #FFFFFF 107.6%)",
      },
    },
  },
  plugins: [],
};
