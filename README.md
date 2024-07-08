# 基础命令

```bash
1. npm 全局安装
npm i ty-cli-market -g

2. 快捷键 ty/ty-cli

3. 帮助命令 ty -h
Usage: ty-cli <command> [options]

A simple CLI tool for string manipulation

Options:
-V, --version                    output the version number
-h, --help                       display help for command

Commands:
create [options] <project-name>  create a new project
help [command]                   display help for command

Run ty-cli <command> --help for detailed usage of given command.

4. 版本查看 ty -V
1.1.0
```

# 模板创建

create 命令也就是脚手架的核心指令，用来选择不同的执行模板并下载

1. 配置命令的基本信息
2. 解析后面的 options 响应参数
   1. 存在 force 参数，直接下载
   2. 不存在 force 参数，判断是否有重名的模板，给用户选择是否覆盖
      1. 退出本次操作
      2. 覆盖当前文件
3. 一步步确认模板的类型
4. github 拉取项目信息
5. 下载模板到本地

## 命令帮助

![5.png](https://cdn.nlark.com/yuque/0/2024/png/27367619/1720404698191-5a62cba4-6852-426b-9559-b5d2933041f8.png#averageHue=%232c3139&clientId=ue832ca8a-f87c-4&from=ui&id=u5199f62c&originHeight=225&originWidth=715&originalType=binary&ratio=0.8999999761581421&rotation=0&showTitle=false&size=19820&status=done&style=none&taskId=ufcbee229-d8fa-4504-8a2e-e81b72a2b58&title=)

## 选择模板

![6.png](https://cdn.nlark.com/yuque/0/2024/png/27367619/1720404742110-4c2f0901-eadd-40d1-8e88-a19ca62fe0e4.png#averageHue=%232b3039&clientId=ue832ca8a-f87c-4&from=ui&id=ubcd5711f&originHeight=201&originWidth=728&originalType=binary&ratio=0.8999999761581421&rotation=0&showTitle=false&size=20481&status=done&style=none&taskId=u877f9174-bbc1-44ba-816a-249df8a2608&title=)

## 开始创建

![7.png](https://cdn.nlark.com/yuque/0/2024/png/27367619/1720404845007-11c160f6-1bd3-41e2-8b13-f6e2c2065ffb.png#averageHue=%232c323b&clientId=ue832ca8a-f87c-4&from=ui&id=u6c7e4b7e&originHeight=141&originWidth=641&originalType=binary&ratio=0.8999999761581421&rotation=0&showTitle=false&size=14980&status=done&style=none&taskId=ub2b49727-5e45-4142-832e-79119faa719&title=)

![9.png](https://cdn.nlark.com/yuque/0/2024/png/27367619/1720406197814-b9b26710-35ff-49c2-91a6-a47c96c5725b.png#averageHue=%232a2f38&clientId=ue832ca8a-f87c-4&from=ui&id=u9aa49d0d&originHeight=349&originWidth=949&originalType=binary&ratio=0.8999999761581421&rotation=0&showTitle=false&size=33577&status=done&style=none&taskId=uc8c01e14-1673-4271-bc1b-5888805b7e5&title=)

## 开发模板

![10.png](https://cdn.nlark.com/yuque/0/2024/png/27367619/1720408913964-680c6871-5e2e-436f-bc72-34e77f96dc11.png#averageHue=%23282d35&clientId=ue832ca8a-f87c-4&from=ui&id=u14cfe0c0&originHeight=711&originWidth=634&originalType=binary&ratio=0.8999999761581421&rotation=0&showTitle=false&size=53228&status=done&style=none&taskId=uaab4db97-8176-4b81-9214-a0da43e4c4f&title=)
当前是小程序的开发模板，具体模板使用说明可以查看相关文档。

# 开发背景

目前团队内部后台管理系统过多，需求开发的页面逻辑或者相关组件重复率过高，跨项目开发很容易遇到重复编写大量代码、不同项目的技术栈/版本不统一、相关样式不统一等问题，迫切需要一款标准化、高扩展、简单便捷的脚手架工具来协助开发。
该工具要求具备的核心能力如下：

1. 命令行运行，多种配置可选，可自定义
2. 配色方案、核心布局、组件、方法、hooks、http 请求封装完备
3. 设计高扩展性，同程内部的工具链路完备

# 问题记录

## 模板创建超时

![8.png](https://cdn.nlark.com/yuque/0/2024/png/27367619/1720405490961-559053d1-5eb9-463a-b43f-55eafd650561.png#averageHue=%23282d35&clientId=ue832ca8a-f87c-4&from=ui&id=uf1f47aa8&originHeight=132&originWidth=1709&originalType=binary&ratio=0.8999999761581421&rotation=0&showTitle=false&size=20292&status=done&style=none&taskId=u540f33be-d85a-4b8e-8a28-2e38a4b5d90&title=)
Git 客户端无法在指定的时间内连接到 GitHub 服务器上的 443 端口

```bash
取消全局 Git 配置中设置的 HTTPS 代理服务器
git config --global --unset http.proxy
git config --global --unset https.proxy
```

# 更新日志

1. **2024-6-30 V1.0.0 第一版上线**
2. **2024-7-1 后续 create 命令优化**
3. **2024-7-3 说明文档 V1.0.1**
4. **2024-7-8 GitHub API 权限认证 V1.1.0**

- [ ] **GitHub 会有网络问题，后续整体迁移到 GitLab**
- [ ] **模板定制化选择，维度包括：语言版本、组件库、功能细分**
- [ ] **后台管理系统模板优化开发**
