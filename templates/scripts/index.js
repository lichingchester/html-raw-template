import { build } from "./build.js";

function dev(cb) {
  console.log("dev task");
  cb();
}

export { dev, build };
