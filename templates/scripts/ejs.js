import { parse, join } from "path";
import { sync } from "glob";
import { readFileSync, writeFileSync } from "fs";
import { mkdirsSync } from "fs-extra/esm";
import frontMatter from "front-matter";
import ejs from "ejs";

import { isProd } from "./env.js";
import { config, projectRoot } from "./config.js";

const configSrcPath = config.build.srcPath;
const configDistPath = config.build.outputPath;

/**
 * Read files in pages directory
 *
 * @return  {Array}  files list
 */
const readFiles = () => {
  const files = sync("**/*.@(ejs|html)", {
    cwd: `${configSrcPath}/pages`,
  });

  return files;
};

const processFile = (file) => {
  const fileData = parse(file);
  const destPath = join(configDistPath, fileData.dir);

  // create destination directory
  mkdirsSync(destPath);

  // read page file
  const data = readFileSync(`${configSrcPath}/pages/${file}`, "utf-8");

  // render page
  const pageData = frontMatter(data);

  // get page config
  const templateConfig = Object.assign({}, config, {
    page: pageData.attributes,
    isProd: isProd,
  });

  // generate page content according to file type
  let pageContent;
  switch (fileData.ext) {
    case ".ejs":
      pageContent = ejs.render(pageData.body, templateConfig, {
        filename: `${configSrcPath}/pages/${file}`,
        root: projectRoot,
      });
      break;
    default:
      pageContent = pageData.body;
  }

  // render layout with page contents
  const layout = pageData.attributes.layout || "default";
  const layoutFileName = `${configSrcPath}/layouts/${layout}.ejs`;
  const layoutData = readFileSync(layoutFileName, "utf-8");
  const completePage = ejs.render(
    layoutData,
    Object.assign({}, templateConfig, {
      body: pageContent,
      filename: layoutFileName,
    }),
    {
      root: projectRoot,
    }
  );

  // save the html file
  writeFileSync(`${destPath}/${fileData.name}.html`, completePage);
  console.error("compiled ", `${destPath}/${fileData.name}.html`);
};

/**
 * Compile EJS template
 */
const compile = () => {
  console.log("start compile");

  const files = readFiles();

  files.forEach((file) => {
    processFile(file);
  });

  console.log("end compile");
};

export { compile };
