/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {

  plugins: [
      require('flowbite/plugin')
  ]

}
module.exports = {

  content: [
      "./node_modules/flowbite/**/*.js"
  ]

}


module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      armypurple: colors.violet,
    },
  },
}
