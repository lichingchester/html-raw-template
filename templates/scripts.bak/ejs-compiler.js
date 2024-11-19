/**
 * EJS template compile js
 */

import { sync } from "glob";
import { parse, join } from "path";
import { mkdirsSync, readFileSync, writeFileSync } from "fs-extra";
import frontMatter from "front-matter";
import ejs from "ejs";
import config, { build } from "../site.config";
const srcPath = build.srcPath;
const distPath = build.outputPath;

/**
 * Compile EJS template
 *
 * @param {Boolean} isProd is production or development
 */
export default function compile(isProd) {
  // read pages
  const files = sync("**/*.@(ejs|html)", {
    cwd: `${srcPath}/pages`,
  });

  // console.log(`${srcPath}/pages`, files);

  files.forEach((file, i) => {
    const fileData = parse(file);
    const destPath = join(distPath, fileData.dir);

    // create destination directory
    mkdirsSync(destPath);

    // read page file
    const data = readFileSync(`${srcPath}/pages/${file}`, "utf-8");

    // render page
    const pageData = frontMatter(data);

    const templateConfig = Object.assign({}, config, {
      page: pageData.attributes,
      isProd: isProd,
    });
    let pageContent;

    // generate page content according to file type
    switch (fileData.ext) {
      case ".ejs":
        pageContent = ejs.render(pageData.body, templateConfig, {
          filename: `${srcPath}/pages/${file}`,
        });
        break;
      default:
        pageContent = pageData.body;
    }

    // render layout with page contents
    const layout = pageData.attributes.layout || "default";
    const layoutFileName = `${srcPath}/layouts/${layout}.ejs`;
    const layoutData = readFileSync(layoutFileName, "utf-8");
    const completePage = ejs.render(
      layoutData,
      Object.assign({}, templateConfig, {
        body: pageContent,
        filename: layoutFileName,
      })
    );

    // save the html file
    writeFileSync(`${destPath}/${fileData.name}.html`, completePage);
    console.error("compiled ", `${destPath}/${fileData.name}.html`);
  });
}
