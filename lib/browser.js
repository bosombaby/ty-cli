import { execSync } from "child_process";

function openDefaultBrowser(url) {
  const command =
    process.platform === "win32"
      ? "start"
      : process.platform === "darwin"
      ? "open"
      : "xdg-open";
  const options = { shell: true };

  try {
    execSync(command + " " + url, options);
  } catch (error) {
    console.error("打开浏览器时出错:", error);
  }
}

export { openDefaultBrowser };
