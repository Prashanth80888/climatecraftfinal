/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07100e',
          900: '#0b1613',
          800: '#0f1e1a',
          700: '#152a24',
          600: '#1c3730',
        },
        teal: {
          950: '#04211f',
          900: '#0a3833',
          800: '#0f4a43',
          700: '#166058',
          600: '#1d7a6f',
          500: '#2b9587',
          400: '#4fb3a3',
        },
        gold: {
          900: '#5c3a0e',
          800: '#8a5613',
          700: '#b87418',
          600: '#dd931f',
          500: '#f0a92c',
          400: '#f5c15c',
          300: '#f8d68b',
        },
        cream: {
          100: '#faf7f0',
          200: '#f2ead9',
          300: '#e6d9c0',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rtl': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-rtl': 'marquee-rtl 40s linear infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
