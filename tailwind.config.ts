/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Proporção de imagem típica de moda (Portrait)
      aspectRatio: {
        'product': '3/4',
      },
      colors: {
        'lamoda-black': '#111111',
        'lamoda-gray': '#767676',
        'lamoda-light': '#F5F5F5',
      },
      // Configuração de animações para melhor UX no hover dos cards
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}