/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // تعريف اللون الأساسي للتطبيق
        primary: '#5f6FFF' 
      },
      gridTemplateColumns: {
        // تعريف خاصية شبكة مخصصة (Grid) لتوزيع الكروت بمرونة
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      }
    },
  },
  plugins: [],
}