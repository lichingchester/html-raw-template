import { series } from "gulp";

import { clean } from "./clean.js";
import {
  assets,
  html,
  sass,
  bundleCSS,
  babelJS,
  bundleJS,
  formatHTML,
} from "./bundle.js";

const build = series(
  clean,
  assets,
  html,
  sass,
  bundleCSS,
  babelJS,
  bundleJS,
  formatHTML
);

export { build };
