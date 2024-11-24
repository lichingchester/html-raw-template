#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");

const {
  checkDirectory,
  promptForOverwrite,
  promptForProjectDetails,
} = require("./utils");

program.version("0.1.0").description("Welcome to HTMLRawTemplate!");

program
  .command("init")
  .description("Initialize a new raw HTML project")
  .action(async () => {
    try {
      const currentDir = process.cwd();

      // Check if directory is empty
      const isEmpty = await checkDirectory(currentDir);
      if (!isEmpty) {
        console.log("Directory is not empty. Please clean it up first.");
        process.exit(0);
      }

      // Get project details
      // const projectDetails = await promptForProjectDetails();

      // Copy template files
      const templateDir = path.join(__dirname, "..", "templates");
      await fs.copy(templateDir, currentDir);

      // Create package.json
      // const packageJson = {
      //   name: projectDetails.projectName,
      //   version: "1.0.0",
      //   description: projectDetails.description,
      //   scripts: {
      //     start: "your-start-command",
      //     build: "your-build-command",
      //   },
      // };

      // await fs.writeJSON(path.join(currentDir, "package.json"), packageJson, {
      //   spaces: 2,
      // });

      console.log("\n✨ Project initialized successfully!");
      console.log("\nNext steps:");
      console.log("1. npm install");
      console.log("2. npm run dev\n");
    } catch (error) {
      console.error("Error initializing project:", error);
      process.exit(1);
    }
  });

program.parse(process.argv);
