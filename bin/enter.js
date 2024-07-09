#! /usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import { handleOptions } from "../cmd/create.js";
import { openDefaultBrowser } from "../lib/browser.js";
import { getPackageJson } from "../lib/file.js";

const config = getPackageJson();
const program = new Command();
// 版本信息
program
  .name(config.name)
  .usage("<command> [options]")
  .description("A simple CLI tool for string manipulation")
  .version(config.version);

// 帮助信息
program.on("--help", () => {
  console.log(
    `\r\nRun ${chalk.cyan(
      "ty-cli <command> --help"
    )} for detailed usage of given command.\r\n`
  );
  console.log(
    `Ty CLI Docs Address At ${chalk.red("https://ty.cli.vrteam.top/")}\r\n`
  );

  openDefaultBrowser("https://ty.cli.vrteam.top/");
});

// 创建项目命令
program
  .command("create <project-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exists")
  .action((projectName, options) => {
    handleOptions(projectName, options);
  });

program.parse();
