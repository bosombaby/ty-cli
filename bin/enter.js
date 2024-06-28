#! /usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import { handleOptions } from "../lib/create.js";

const program = new Command();
// 版本信息
program
  .name("ty-cli")
  .usage("<command> [options]")
  .description("A simple CLI tool for string manipulation")
  .version("0.0.1");

// 帮助信息
program.on("--help", () => {
  console.log(
    `\nRun ${chalk.cyan(
      "ty-cli <command> --help"
    )} for detailed usage of given command.\n`
  );
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
