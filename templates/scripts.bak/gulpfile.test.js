import { series } from "gulp";
// const { deleteAsync } = require("del");

// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
function clean(cb) {
  // body omitted
  console.log("clean task");
  cb();
}

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
  // body omitted
  console.log("build task");
  cb();
}

export { build };
export default series(clean, build);
