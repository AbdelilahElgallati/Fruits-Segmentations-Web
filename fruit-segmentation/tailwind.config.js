/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Custom colors based on CSS variables
          'primary-orange': '#f97316',
          'secondary-green': '#22c55e',
          'accent-purple': '#a855f7',
          'background-light': '#fef3e7',
          'card-bg': '#ffffff',
          'text-dark': '#1f2937',
          'text-muted': '#6b7280',
          'border-light': '#e5e7eb',
        },
      },
    },
    plugins: [],
  }
  