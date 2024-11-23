import { fileURLToPath } from "url";
import path, { dirname } from "path";

import userConfig from "../config.js";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = path.join(__dirname, "./..");
const dataRoot = path.join(projectRoot, "./src/data");

/**
 * Get data from JSON files in the data folder
 * Turn them into an object, use the file name as the key
 *
 * @return  {Object}
 */
const getData = () => {
  const dataFiles = fs.readdirSync(dataRoot);

  let data = {};

  dataFiles.forEach((file) => {
    const filePath = path.join(dataRoot, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const fileName = path.parse(file).name;

    try {
      data[fileName] = JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error parsing JSON from file: ${filePath}`, error);
    }
  });

  return data;
};

const defaultConfig = {
  site: {
    title: "Title | Template",
    description: "Description | Template",
    basePath: ".",
  },
  build: {
    srcPath: path.join(projectRoot, "./src"),
    outputPath: path.join(projectRoot, "./dist"),
  },
  data: getData(),
  bundle: {
    js: {
      order: ["jquery-*/**/*.js", "hammer-*/**/*.js", "bootstrap-*/**/*.js"],
    },
  },
};

const config = Object.assign({}, defaultConfig, userConfig);

export { config, projectRoot };
