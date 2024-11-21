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

export { assets, html, sass };
