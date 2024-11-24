import gulp from "gulp";
import autoprefixer from "autoprefixer";
import plumber from "gulp-plumber";
import sourcemaps from "gulp-sourcemaps";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import postcss from "gulp-postcss";
import gulpCleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import concat from "gulp-concat";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import order from "gulp-order";
import htmlBeautify from "gulp-html-beautify";

import { SOURCE, DEST } from "./constants.js";
import { compile } from "./ejs.js";
import { getConfig } from "./config.js";
import {
  cleanHTML,
  cleanCSS,
  cleanJS,
  cleanVendor,
  cleanAssets,
} from "./clean.js";
import { getBrowserSync } from "./server.js";

const _sass = gulpSass(dartSass);

const browserSync = getBrowserSync();

/**
 * copy assets file
 */
const assets = () => gulp.src(SOURCE.assets).pipe(gulp.dest(DEST.assets));

/**
 * html
 */
const html = (cb) => {
  compile();
  // reload();
  cb();
};

/**
 * compile scss file with expanded and minify version
 */
const sass = () => {
  return gulp
    .src(SOURCE.scss)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      _sass({
        outputStyle: "expanded",
      })
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(DEST.css))
    .pipe(gulpCleanCSS())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(DEST.css))
    .pipe(browserSync.stream());
};

/**
 * bundle css file
 */
const bundleCSS = () => {
  return gulp
    .src(SOURCE.vendor.css)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat("bundle.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(DEST.vendor))
    .pipe(browserSync.stream());
};

/**
 * compile es6 js to es5
 */
const babelJS = () => {
  return gulp
    .src(SOURCE.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("app.js"))
    .pipe(gulp.dest(DEST.js))
    .pipe(
      uglify({
        compress: {
          drop_console: true,
        },
      })
    )
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(DEST.js))
    .pipe(browserSync.stream());
};

/**
 * bundle js file
 */
const bundleJS = () => {
  return gulp
    .src(SOURCE.vendor.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(order(getConfig().bundle.js.order))
    .pipe(concat("bundle.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(DEST.vendor))
    .pipe(browserSync.stream());
};

/**
 * format html files
 */
const formatHTML = () => {
  return gulp
    .src(SOURCE.html)
    .pipe(plumber())
    .pipe(
      htmlBeautify({
        indentSize: 4,
      })
    )
    .pipe(gulp.dest(DEST.default));
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
  gulp.watch(SOURCE.watch.data, gulp.series(cleanHTML, html));
};

export { assets, html, sass, bundleCSS, babelJS, bundleJS, formatHTML, watch };
