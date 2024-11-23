import { deleteAsync } from "del";
import { DEST } from "./constants.js";

/**
 * delete dist folder first
 */
const clean = async () => await deleteAsync(DEST.default, { force: true });

/**
 * delete dist html files
 */
const cleanHTML = async () => await del(DEST.html, { force: true });

/**
 * delete dist css files
 */
const cleanCSS = async () => await del(DEST.css, { force: true });

/**
 * delete dist js files
 */
const cleanJS = async () => await del(DEST.js, { force: true });

/**
 * delete dist vendor files
 */
const cleanVendor = async () => await del(DEST.vendor, { force: true });

/**
 * delete dist assets files
 */
const cleanAssets = async () => await del(DEST.assetsClean, { force: true });

export { clean, cleanHTML, cleanCSS, cleanJS, cleanVendor, cleanAssets };
