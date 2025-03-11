module.exports = {
  darkMode: "class",
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
        "chat-button-shadow": "2px 4px 12px 0px #00000014",
        "file-tab-shadow": "0px 0px 48px 0px #1927590F",
        // "logout-them": "6px 6px 12px 0px rgba(0, 0, 0, 1), -6px -6px 12px 0px rgba(255, 255, 255, 1)",
        "logout-them":
          "6px 6px 12px 0px #00000040,-6px -6px 12px 0px #FFFFFF40",
        "links-light-shadow": "14px 17px 40px 4px #EAEAEA",
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
};
