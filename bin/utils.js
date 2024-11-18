const fs = require("fs-extra");
const path = require("path");
const { confirm, input } = require("@inquirer/prompts");

module.exports.checkDirectory = async (dir) => {
  const files = await fs.readdir(dir);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
};

module.exports.promptForOverwrite = async () => {
  return await confirm({
    message: "Directory is not empty. Do you want to continue?",
    default: false,
  });
};

module.exports.promptForProjectDetails = async () => {
  const projectName = await input({
    message: "Project name:",
    default: path.basename(process.cwd()),
  });

  const description = await input({
    message: "Project description:",
    default: "A raw HTML project",
  });

  return { projectName, description };
};
