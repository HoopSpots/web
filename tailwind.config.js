module.exports = {
  future: 'all',
  experimental: 'all',
  purge: ['./pages/**/*.js', './components/**/*.js'],
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

