/**
 * Tailwind configuration
 *
 * Add extra classes to tailwind via this object
 *
 * @link https://tailwindcss.com/docs/configuration
 */
module.exports = {
  purge: {
    enabled: false, // Set to true for production builds
    content: [
      './components/**/*.twig',
      './assets/styles/**/*.scss',
      './**/*.php'
    ]
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: []
};