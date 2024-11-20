import minimist from "minimist";

const isProd = minimist(process.argv.slice(2)).env === "production";

export { isProd };
