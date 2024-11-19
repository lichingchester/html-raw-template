// ref: https://github.com/doug2k1/nanogen

const path = require("path");

/**
 * Load all json data in ../data folder as page.data
 */
var data = require("require-all")({
  dirname: path.join(__dirname, "./data"),
});

module.exports = {
  site: {
    title: "Template Base",
    description: "",
    basePath: ".",
  },
  build: {
    srcPath: path.join(__dirname, "./src"),
    outputPath: path.join(__dirname, "./dist"),
  },
  data,
};
