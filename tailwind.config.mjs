// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  // Dark mode controlado por clase en <html> (no media query)
  // Permite toggle manual + persistencia en localStorage
  darkMode: 'class',

  // Rutas donde Tailwind busca clases para generar CSS
  // ¡Importante! Incluye .astro, .tsx, .jsx
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],

  // Tu Design System — personaliza aquí
  theme: {
    extend: {
      // Colores semánticos (no "blue-500", sino "primary", "expense", "income")
      colors: {
        // Primary brand (Kios)
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // ← Color principal
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Semantic: gastos (rojo), ingresos (verde), transferencias (ámbar)
        expense: {
          light: '#fef2f2',
          DEFAULT: '#ef4444',
          dark: '#991b1b',
        },
        income: {
          light: '#f0fdf4',
          DEFAULT: '#22c55e',
          dark: '#166534',
        },
        transfer: {
          light: '#fffbeb',
          DEFAULT: '#f59e0b',
          dark: '#92400e',
        },
        // Superficie / fondo (se adaptan a dark mode automáticamente)
        surface: {
          light: '#ffffff',
          dark: '#1e1e1e',
        },
        background: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
      },

      // Tipografía
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      // Sombras elevadas para cards/modals
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'modal': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },

      // Animaciones sutiles
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'scale-in': 'scaleIn 150ms ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        scaleIn: { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
      },

      // Border radius consistente
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },

  // Plugins (añadiremos @tailwindcss/forms en siguientes pasos)
  plugins: [],
};