import ora from "ora";
import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import { simpleGit } from "simple-git";
import { getTemplateRepository } from "../api/index.js";

// 全局变量
let PROJECT_NAME = "";
let FULL_PATH = "";
let IS_OVERWRITE = false;
let TEMPLATE_BRANCH = "";

// 先判断是否存在同名目录
const isExistSameNameDir = () => {
  const cwd = process.cwd();
  FULL_PATH = path.join(cwd, PROJECT_NAME);
  if (fs.existsSync(FULL_PATH)) {
    IS_OVERWRITE = true;
    return;
  }
  IS_OVERWRITE = false;
};

// 处理用户选型
const handleOptions = (name, options) => {
  const { force } = options;
  PROJECT_NAME = name;
  isExistSameNameDir();
  if (IS_OVERWRITE) {
    if (force) {
      selectTemplate();
      return;
    }
    inquirer
      .prompt([
        {
          name: "isOverwrite",
          type: "list",
          message:
            "The project directory already exists, do you want to overwrite it?",
          choices: [
            {
              name: "Yes",
              value: true,
            },
            {
              name: "No",
              value: false,
            },
          ],
        },
      ])
      .then((answer) => {
        if (answer.isOverwrite) {
          selectTemplate();
        } else {
          console.log("Quit creating...");
        }
      });
  } else {
    selectTemplate();
  }
};

// 选择模板
const selectTemplate = async () => {
  const spinner = ora("Fetching template...").start();
  const res = await getTemplateRepository();
  const branches = res.map((item) => item.name);
  spinner.succeed("Template fetched successfully");
  inquirer
    .prompt([
      {
        name: "branch",
        type: "list",
        message: "Please select a template",
        choices: branches,
      },
    ])
    .then((answer) => {
      TEMPLATE_BRANCH = answer.branch;
      downloadTemplate();
    });
};

// 下载模板
const git = simpleGit();
const downloadTemplate = async () => {
  const spinner = ora("Downloading file...").start();
  // 判断是否需要删除已有文件
  if (IS_OVERWRITE) {
    fs.removeSync(FULL_PATH);
  }
  fs.ensureDirSync(FULL_PATH);
  git
    .clone("https://github.com/bosombaby/ty-cli-template.git", FULL_PATH, {
      "--branch": TEMPLATE_BRANCH,
    })
    .then(() => {
      fs.removeSync(path.join(FULL_PATH, "./.git"));
      spinner.succeed("File downloaded successfully");
      createHelp();
    })
    .catch((err) => {
      spinner.fail("File downloaded failed");
      console.log(chalk.red(err));
    });
};

// 提示命令
const createHelp = () => {
  console.log(
    `\r\nSuccessfully created project ${chalk.cyan(
      PROJECT_NAME
    )}, please run the following commands:`
  );
  console.log(`\r\n  cd ${chalk.cyan(PROJECT_NAME)}`);
  console.log("  pnpm install");
  // 这里区分不同模板的命令
  if (TEMPLATE_BRANCH.includes("weapp-native")) {
    console.log(`  构建 ${chalk.cyan("miniprogram_npm")} 包 \r\n`);
    console.log("  编译执行代码 \r\n");
    return;
  }

  console.log("  pnpm run dev \r\n");
};

export { handleOptions };
