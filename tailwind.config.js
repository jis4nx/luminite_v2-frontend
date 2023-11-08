const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "site-primary": "#6366f1",
        "site-blue": "#1c4c96",
        "site-secondary": "#CC0C39",
      },
      screens: {
        "xs": { "max": "330px" },
      },
    },
  },
  plugins: [],
});
