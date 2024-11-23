import { series, parallel } from "gulp";

import { clean } from "./clean.js";
import {
  assets,
  html,
  sass,
  bundleCSS,
  babelJS,
  bundleJS,
  formatHTML,
  watch,
} from "./bundle.js";
import { browser } from "./server.js";

const dev = series(
  clean,
  parallel(html, assets, sass, bundleCSS, babelJS, bundleJS),
  formatHTML,
  parallel(watch, browser)
);

export { dev };
