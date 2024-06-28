import path from "path";
import chalk from "chalk";
import fs from "fs-extra";

// 先判断是否存在同名目录
const isExistSameNameDir = (projectName) => {
  const cwd = process.cwd();
  const fullPath = path.join(cwd, projectName);
  console.log(fullPath);
  if (fs.existsSync(fullPath)) {
    console.log(chalk.red(`The directory ${projectName} is already exist`));
    return true;
  }
  return false;
};

// 处理用户选型
const handleOptions = (projectName, options) => {
  const { force } = options;
  if (isExistSameNameDir(projectName) && !force) {
    console.log("用户选择");
  } else {
    console.log("用户不选择");
  }
};

// 选择模板
const selectTemplate = () => {};

// 拉取 GitHub 信息
const fetchRepoList = async () => {};

// 下载模板
const download = async () => {};

export { handleOptions };
