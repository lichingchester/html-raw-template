import { series } from "gulp";

import { browser } from "./server.js";

const start = series(browser);

export { start };
