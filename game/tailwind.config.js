import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{svelte,js,ts,html,svg}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        title: ["RocknRoll One"],
      },
    },
    fontFamily: {
      sans: ["RocknRoll One"],
    },
  },
  plugins: [
    daisyui,
  ],
};
