import gulp from "gulp";
import { SOURCE, DEST } from "./constants.js";
import { compile } from "./ejs.js";
import { isProd } from "./env.js";

/**
 * copy assets file
 */
const assets = () => gulp.src(SOURCE.assets).pipe(gulp.dest(DEST.assets));

/**
 * html
 */
const html = (cb) => {
  compile(isProd);
  // reload();
  cb();
};

export { assets, html };
