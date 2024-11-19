import { series } from "gulp";

import { clean } from "./clean.js";

const build = series(clean);

export { build };
