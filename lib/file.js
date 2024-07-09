import fs from "fs-extra";

// 获取 package.json 数据
const getPackageJson = () => {
  const data = fs.readFileSync("../package.json", "utf-8");
  return JSON.parse(data);
};

getPackageJson();

export { getPackageJson };
