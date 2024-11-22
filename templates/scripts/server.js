import browserSync from "browser-sync";

browserSync.create();

const getBrowserSync = () => {
  return browserSync;
};

/**
 * create locale server target to dist folder
 */
const browser = () => {
  browserSync.init({
    server: {
      baseDir: "../dist",
      reloadDebounce: 2000,
    },
  });
};

export { getBrowserSync, browser };
