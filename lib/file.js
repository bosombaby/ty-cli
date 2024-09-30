import fs from "fs-extra";

// 获取 package.json 数据
// 这里注意路径是相对于执行命令的路径，而不是当前文件的路径，所以这里是相对于项目根目录的路径
// TODO：后续统一绝对路径
const getPackageJson = () => {
  const data = fs.readFileSync("./package.json", "utf-8");
  return JSON.parse(data);
};

getPackageJson();

export { getPackageJson };
