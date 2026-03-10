/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D1D1F',
        secondary: '#6E6E73',
        accent: '#2D9F5A',
        'accent-light': '#E8F7EE',
        'accent-dark': '#1A7A3E',
        border: '#E5E5EA',
        error: '#FF3B30',
        surface: '#FAFAFA',
        'surface-alt': '#F5F5F7',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        button: '14px',
        card: '16px',
        input: '12px',
      },
      boxShadow: {
        card: '0 2px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 30px rgba(0,0,0,0.1)',
        nav: '0 1px 10px rgba(0,0,0,0.06)',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
