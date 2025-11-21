/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Plus Jakarta Sans"', 'sans-serif'],
        'mono': ['"League Spartan"', 'monospace'],
      },
      colors: {
        slate: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617',
        },
        navy: {
          50: '#edf2f7', 100: '#dbe4ee', 200: '#b2c5d9', 300: '#89a6c4', 400: '#6087af', 500: '#376899', 600: '#2c537a', 700: '#213e5c', 800: '#162a3d', 900: '#0b151f', 950: '#050a0f',
        },
        indigo: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b',
        },
      },
      boxShadow: {
        'subtle': '0 4px 14px 0 rgba(0, 0, 0, 0.05)',
        'subtle-hover': '0 6px 20px 0 rgba(0, 0, 0, 0.07)',
        'neumorphic-out': '6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff',
        'neumorphic-in': 'inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #ffffff',
        'neumorphic-sm-out': '3px 3px 6px #c5c5c5, -3px -3px 6px #ffffff',
      },
      keyframes: {
        'bounce-in': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '60%': { transform: 'scale(1.1)', opacity: '1' },
          '80%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        'swing': {
          '0%, 100%': { transform: 'rotate(15deg)' },
          '50%': { transform: 'rotate(-10deg)' },
        },
      },
      animation: {
        'bounce-in': 'bounce-in 0.6s ease-out forwards',
        'swing': 'swing 1.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}