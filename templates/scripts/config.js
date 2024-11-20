import { fileURLToPath } from "url";
import path, { dirname } from "path";

import userConfig from "../config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = path.join(__dirname, "./..");

const defaultConfig = {
  site: {
    title: "Title | Template Base",
    description: "Description | Template Base",
    basePath: ".",
  },
  build: {
    srcPath: path.join(projectRoot, "./src"),
    outputPath: path.join(projectRoot, "./dist"),
  },
  // data,
};

const config = Object.assign({}, defaultConfig, userConfig);

export { config };
