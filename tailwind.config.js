/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          base: 'var(--bg-base)',
          surface: 'var(--bg-surface)',
        },
        brand: {
          electric: 'var(--brand-electric)',
          orange: 'var(--brand-orange)',
        },
        destructive: {
          base: 'var(--destructive-base)',
          hover: 'var(--destructive-hover)',
        },
        text: {
          main: 'var(--text-main)',
          muted: 'var(--text-muted)',
        },
      },
      borderColor: {
        glass: 'var(--border-glass)',
      }
    },
  },
  plugins: [],
}
