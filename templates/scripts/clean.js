import { deleteAsync } from "del";
import { DEST } from "./constants.js";

/**
 * delete dist folder first
 */
const clean = async () => await deleteAsync(DEST.default, { force: true });

/**
 * delete dist html files
 */
const cleanHTML = async () => await deleteAsync(DEST.html, { force: true });

/**
 * delete dist css files
 */
const cleanCSS = async () => await deleteAsync(DEST.css, { force: true });

/**
 * delete dist js files
 */
const cleanJS = async () => await deleteAsync(DEST.js, { force: true });

/**
 * delete dist vendor files
 */
const cleanVendor = async () => await deleteAsync(DEST.vendor, { force: true });

/**
 * delete dist assets files
 */
const cleanAssets = async () =>
  await deleteAsync(DEST.assetsClean, { force: true });

export { clean, cleanHTML, cleanCSS, cleanJS, cleanVendor, cleanAssets };
