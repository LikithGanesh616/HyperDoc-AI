// frontend/postcss.config.cjs
module.exports = {
    plugins: {
      // use the new package name, not "tailwindcss"
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  };