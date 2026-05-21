/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        saffron: {
          50: '#FFF7ED',
          100: '#FED7AA',
          500: '#EA580C',
          600: '#DC4A00',
          700: '#C2410C',
          900: '#7C2D12',
        },
        sacred: {
          brown: '#2D1B08',
          warm: '#4A3728',
          cream: '#FFF9F2',
        }
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'saffron': '0 20px 60px rgba(234, 88, 12, 0.2)',
        'saffron-lg': '0 30px 80px rgba(234, 88, 12, 0.3)',
        'card': '0 10px 40px rgba(45, 27, 8, 0.08)',
        'card-hover': '0 20px 60px rgba(234, 88, 12, 0.15)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}