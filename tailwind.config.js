module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        primary: '#ffa500',
        secondary: '#fff5ee',
        accent: '#fbf9f4'
      }
    },
  },
  variants: {},
  plugins: [
      require('@tailwindcss/ui')
  ],
};

