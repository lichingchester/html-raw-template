import gulp from "gulp";
import autoprefixer from "autoprefixer";
import browserSync from "browser-sync";
import plumber from "gulp-plumber";
import sourcemaps from "gulp-sourcemaps";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import postcss from "gulp-postcss";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import concat from "gulp-concat";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import order from "gulp-order";

import { SOURCE, DEST } from "./constants.js";
import { compile } from "./ejs.js";

const _sass = gulpSass(dartSass);

browserSync.create();

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
    .pipe(cleanCSS())
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
    .pipe(
      // TODO: custom ordering on user config
      order(["jquery-v*/**/*.js", "hammer-v*/**/*.js", "bootstrap-v*/**/*.js"])
    )
    .pipe(concat("bundle.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(DEST.vendor))
    .pipe(browserSync.stream());
};

export { assets, html, sass, bundleCSS, babelJS, bundleJS };
