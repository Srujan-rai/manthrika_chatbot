/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // ✅ Add autoprefixer (important for Next.js builds)
  },
};

export default config;
