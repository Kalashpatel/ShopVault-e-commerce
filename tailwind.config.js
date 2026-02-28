/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg:       { DEFAULT: '#0a0a0f', light: '#f4f4f8' },
        surface:  { DEFAULT: '#111118', 2: '#1a1a24', 3: '#222230', light: '#ffffff', 'light-2': '#f0f0f6' },
        border:   { DEFAULT: '#2a2a3a', light: '#d8d8e8' },
        accent:   { DEFAULT: '#6c63ff', 2: '#ff6584', 3: '#43e97b' },
        primary:  '#6c63ff',
      },
      borderRadius: { xl2: '16px' },
      animation: {
        'slide-up':  'slideUp 0.4s ease',
        'fade-in':   'fadeIn 0.3s ease',
        'shimmer':   'shimmer 1.5s infinite',
        'pulse-dot': 'pulseDot 2s infinite',
      },
      keyframes: {
        slideUp:  { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
        shimmer:  { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(100%)' } },
        pulseDot: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
      },
    },
  },
  plugins: [],
}
