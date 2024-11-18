const gulp = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();
const { deleteAsync } = require("del");

const minimist = require("minimist");

const ejs = require("./ejs-compiler.js");

const reload = browserSync.reload;
const $ = gulpLoadPlugins();

// check if production
let isProd = minimist(process.argv.slice(2)).env === "production";

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

const DEST = {
  default: "../dist",
  html: "../dist/*.html",
  assets: "../dist/web",
  assetsClean: ["!../dist/web/js", "!../dist/web/css", "!../dist/web/vendor"],
  js: "../dist/web/js",
  css: "../dist/web/css",
  vendor: "../dist/web/vendor",
};

/**
 * delete dist folder first
 */
const clean = () => deleteAsync(DEST.default, { force: true });

/**
 * delete specific folder
 */
const cleanHTML = () => deleteAsync(DEST.html, { force: true });
const cleanCSS = () => deleteAsync(DEST.css, { force: true });
const cleanJS = () => deleteAsync(DEST.js, { force: true });
const cleanVendor = () => deleteAsync(DEST.vendor, { force: true });
const cleanAssets = () => deleteAsync(DEST.assetsClean, { force: true });

/**
 * copy assets file
 */
const assets = () => gulp.src(SOURCE.assets).pipe(gulp.dest(DEST.assets));

/**
 * compile scss file with expanded and minify version
 */
const sass = () => {
  return gulp
    .src(SOURCE.scss)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        outputStyle: "expanded",
      })
    )
    .pipe($.postcss([autoprefixer(), require("postcss-easings")]))
    .pipe(gulp.dest(DEST.css))
    .pipe($.cleanCss())
    .pipe($.rename({ extname: ".min.css" }))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(DEST.css))
    .pipe(browserSync.stream());
};

/**
 * bundle css file
 */
const bundleCSS = () => {
  return gulp
    .src(SOURCE.vendor.css)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.concat("bundle.min.css"))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(DEST.vendor))
    .pipe(browserSync.stream());
};

/**
 * compile es6 js to es5
 */
const babelJS = () => {
  return gulp
    .src(SOURCE.js)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.babel({
        presets: ["@babel/env"],
      })
    )
    .pipe($.concat("app.js"))
    .pipe(gulp.dest(DEST.js))
    .pipe(
      $.uglify({
        compress: {
          drop_console: true,
        },
      })
    )
    .pipe($.rename({ extname: ".min.js" }))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(DEST.js))
    .pipe(browserSync.stream());
};

/**
 * bundle js file
 */
const bundleJS = () => {
  return gulp
    .src(SOURCE.vendor.js)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.order([
        "jquery-v*/**/*.js",
        "hammer-v*/**/*.js",
        "bootstrap-v*/**/*.js",
      ])
    )
    .pipe($.concat("bundle.min.js"))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(DEST.vendor))
    .pipe(browserSync.stream());
};

/**
 * compile ejs template and reload the browser
 * @param {Function} cb callback function
 */
const html = (cb) => {
  ejs(isProd);
  reload();
  cb();
};

/**
 * format html files
 */
const formatHTML = () => {
  return gulp
    .src(SOURCE.html)
    .pipe($.plumber())
    .pipe(
      $.htmlBeautify({
        indentSize: 4,
      })
    )
    .pipe(gulp.dest(DEST.default));
};

/**
 * create locale server target to dist folder
 */
const browser = () => {
  browserSync.init({
    server: {
      baseDir: "../dist",
      reloadDebounce: 2000,
    },
  });
};

/**
 * watch file changes
 */
const watch = () => {
  gulp.watch(SOURCE.watch.html, gulp.series(cleanHTML, html));
  gulp.watch(SOURCE.watch.scss, gulp.series(cleanCSS, sass, cleanHTML, html));
  gulp.watch(SOURCE.watch.js, gulp.series(cleanJS, babelJS, cleanHTML, html));
  gulp.watch(
    SOURCE.watch.bundle,
    gulp.series(
      cleanVendor,
      gulp.parallel(bundleCSS, bundleJS, cleanHTML, html)
    )
  );
  gulp.watch(
    SOURCE.watch.assets,
    gulp.series(cleanAssets, assets, cleanHTML, html)
  );
  // gulp.watch(SOURCE.watch.data, gulp.series(cleanHTML, html));
};

/**
 * npm run dev tasks
 */
exports.dev = gulp.series(
  gulp.series(clean, assets),
  gulp.parallel(html, sass, bundleCSS, babelJS, bundleJS),
  gulp.parallel(watch, browser)
);

/**
 * npm run build tasks
 */
exports.build = gulp.series(
  clean,
  assets,
  html,
  sass,
  bundleCSS,
  babelJS,
  bundleJS,
  formatHTML
);

/**
 * npm run start tasks
 */
exports.start = gulp.series(browser);
