module.exports = {
  darkMode: 'class', // This can be 'media' if preferred.
  content: [
    './src/**/*.svelte',
    './src/**/*.html',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        svelte: '#ff3e00',
      },
    },
  },
  plugins: [],
}
