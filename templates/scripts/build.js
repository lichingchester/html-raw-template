import { series } from "gulp";

import { clean } from "./clean.js";
import { assets, html } from "./bundle.js";

const build = series(clean, assets, html);

export { build };
