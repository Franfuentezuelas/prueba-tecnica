const config = {
  plugins: ['@tailwindcss/postcss'],
}

export default config

// const isTest = process.env.NODE_ENV === 'test';

// const config = {
//   plugins: [],
// };

// if (isTest) {
//   const tailwindcss = await import('tailwindcss');
//   const autoprefixer = await import('autoprefixer');
//   config.plugins = [tailwindcss.default, autoprefixer.default];
// } else {
//   config.plugins = ["@tailwindcss/postcss"];
// }

// export default config;
