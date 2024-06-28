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
          console.log("退出创建");
        }
      });
  } else {
    selectTemplate();
  }
};

// 选择模板
const selectTemplate = async () => {
  const res = await getTemplateRepository();
  const branches = res.map((item) => item.name);
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
      downloadTemplate(answer.branch);
    });
};

// 下载模板
const git = simpleGit();
export const downloadTemplate = async (branch) => {
  console.log(PROJECT_NAME, FULL_PATH, IS_OVERWRITE, branch);
  // 判断是否需要删除已有文件
  if (IS_OVERWRITE) {
    fs.removeSync(FULL_PATH);
  }
  fs.ensureDirSync(FULL_PATH);
  await git.clone("git@github.com:bosombaby/ty-cli-template.git", FULL_PATH, {
    "--branch": branch,
  });

  console.log(FULL_PATH);
  // 删除 .git 文件
  fs.removeSync(path.join(FULL_PATH, "./.git"));
};

export { handleOptions };
