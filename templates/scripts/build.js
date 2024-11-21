import { series } from "gulp";

import { clean } from "./clean.js";
import { assets, html, sass } from "./bundle.js";

const build = series(clean, assets, html, sass);

export { build };
