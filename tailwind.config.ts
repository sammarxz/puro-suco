import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Recoleta', 'serif'],
      },
      colors: {
        fresh: "#2fa850",
        default: "#222222"
      } 
    }
  }
} satisfies Config;
