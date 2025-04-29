# 扣子空间 jsx 模板工程

扣子空间生成的网页是 jsx 格式的，在扣子空间内可以正常打开，如果想要部署到自己的服务器，则需要经过编译。

本项目提供一个模板，只需将扣子空间生成的 jsx 重命名为 `coze.tsx`（注意后缀要改为 tsx）放入本项目 `src` 目录，即可编译出可静态部署的 dist 产物。

## 详细步骤

1. 从扣子空间下载 jsx 文件

![](/img/1745907200269.webp)

2. 下载本项目
3. 安装 Node.js
4. 进入本项目所在目录，运行 `npm install -g pnpm` 安装 pnpm 包管理器
5. 运行 `pnpm install` 安装依赖
6. 将扣子空间生成的 jsx 重命名为 `coze.tsx`（注意后缀要改为 tsx），放入 `src` 目录，覆盖原有的 `coze.tsx` 文件

![](/img/1745898560927.webp)

7. 检查 `coze.tsx` 中的 `import` 语句，确保所有第三方包都已经安装，举例：如果 `coze.tsx` 中有 `import Mermaid from 'mermaid';`，就执行安装 `pnpm install mermaid`
运行 `pnpm run dev` 查看效果

![](/img/1745898552039.webp)

8. 运行 `pnpm run build` 编译
9. 编译完成后，在 `dist` 目录下即可找到编译后的产物
