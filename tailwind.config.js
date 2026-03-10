/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  // Theme border/card classes are applied via ThemeContext (dynamic strings); safelist so they are generated
  safelist: [
    "border-stone-700",
    "border-gray-200",
    "bg-slate-800",
    "bg-gray-100",
    "bg-stone-950",
    "bg-white",
    "bg-gray-200",
    "bg-gray-900",
    "text-gray-900",
    "text-white",
    "text-gray-600",
    "text-gray-400",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

