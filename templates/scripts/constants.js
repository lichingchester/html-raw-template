/**
 * Source paths for the build process.
 */
const SOURCE = {
  // all assets path, eg. images, videos, fonts
  assets: "../src/web/**/*",

  // all js
  js: "../src/assets/js/*.js",

  // app.scss will import all other scss files
  scss: "../src/assets/scss/app.scss",

  // all html
  html: "../dist/*.html",

  // all downloaded modules such as bootstrap, jquery, etc.
  vendor: {
    css: "../src/assets/modules/**/*.css",
    js: "../src/assets/modules/**/*.js",
  },

  // all ejs template
  ejs: {
    layouts: "../src/layouts/*.ejs",
    pages: "../src/pages/*.ejs",
  },

  // all watch files by task
  watch: {
    html: "../src/**/*.@(ejs|html|json)",
    scss: "../src/assets/scss/**/*.scss",
    js: "../src/assets/js/*.js",
    bundle: "../src/assets/modules/**/*.@(css|js)",
    assets: "../src/web",
    data: "../data/*.json",
  },
};

/**
 * Destination paths for the build process.
 */
const DEST = {
  default: "../dist",
  html: "../dist/*.html",
  assets: "../dist/web",
  assetsClean: ["!../dist/web/js", "!../dist/web/css", "!../dist/web/vendor"],
  js: "../dist/web/js",
  css: "../dist/web/css",
  vendor: "../dist/web/vendor",
};

export { SOURCE, DEST };
