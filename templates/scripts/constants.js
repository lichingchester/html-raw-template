/**
 * Destination paths for the build process.
 *
 * @var {[type]}
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
