module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'cssnano': {
      preset: 'default',
    },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
}
