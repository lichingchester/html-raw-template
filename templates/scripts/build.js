import { series } from "gulp";

import { clean } from "./clean.js";
import { assets, html, sass, bundleCSS, babelJS, bundleJS } from "./bundle.js";

const build = series(clean, assets, html, sass, bundleCSS, babelJS, bundleJS);

export { build };
