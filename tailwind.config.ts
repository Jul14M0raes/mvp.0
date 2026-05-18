import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#EC008C",
          green: "#00E30F",
          navy: "#130B5C",
          ink: "#101023",
          mist: "#F5F6FA",
        },
      },
      boxShadow: {
        soft: "0 18px 50px rgba(19, 11, 92, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
