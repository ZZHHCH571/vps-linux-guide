# 🐧 Ubuntu 服务器入门指南

> 面向零基础用户的 Ubuntu 服务器交互式学习网站 —— 我的个人作品集项目

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)

---

## ✨ 项目简介

你是不是也有过这些疑问：

- "我买了个 VPS，然后呢？"
- "SSH 是什么？和 FTP 有啥区别？"
- "Nginx、域名、HTTPS……这些词怎么一堆一堆冒出来？"

本项目就是为**完全没接触过服务器的小白**准备的，用生活化类比 + 交互式课程，带你从零开始认识 Ubuntu 服务器。

> 💡 本项目采用 **Vibe Coding**（AI 辅助开发）方式完成 —— 编程小白靠 AI 从零做到完整网站。欢迎反馈！

---

## 📸 预览

| 🏠 首页 | 📖 课程页 | 📱 移动端 |
|---------|-----------|-----------|
| ![首页截图待补充](https://via.placeholder.com/400x250?text=Home+Page) | ![课程页截图待补充](https://via.placeholder.com/400x250?text=Lesson+Page) | ![移动端截图待补充](https://via.placeholder.com/200x400?text=Mobile) |

> 📝 启动开发服务器后访问 http://localhost:3266 查看实际效果，截图待补充。

---

## 🗺️ 课程体系

共 **26 节课程**，分为 **7 个阶段**，循序渐进：

| 阶段 | 📚 内容 | 关键词 |
|------|---------|--------|
| 1️⃣ 购买前的认知准备 | 服务器概念、购买推荐、Linux 基础 | 🛒 选购、🐧 Linux 入门 |
| 2️⃣ 首次登录的必做配置 | SSH 连接、端口、防火墙、密钥认证 | 🔐 SSH、🛡️ 安全加固 |
| 3️⃣ 网络基础篇 | DNS 解析、HTTP/HTTPS、域名绑定 | 🌐 DNS、🔒 HTTPS |
| 4️⃣ 日常运维与部署 | 包管理器、Nginx 部署、数据库、监控日志 | 📦 apt、🚀 Nginx |
| 5️⃣ 实用工具篇 | Vim/Nano 编辑器、Crontab、Systemd | ✏️ Vim、⏰ 定时任务 |
| 6️⃣ 进阶技能 | 文件权限、进程管理、备份恢复 | 🔑 权限、💾 备份 |
| 7️⃣ 故障排查篇 | 网络故障、磁盘空间、CPU/内存分析 | 🔍 排查、📊 监控 |

---

## 🎯 功能特性

| 功能 | 说明 |
|------|------|
| 📖 **交互式课程** | 每节课带命令演示、逐行解析、输出说明 |
| 💡 **生活化类比** | 用快递站、门牌号等日常例子解释技术概念 |
| ✅ **学习进度** | 标记已完成课程，刷新页面不丢失 |
| ⭐ **收藏功能** | 一键收藏重要课程，方便回顾 |
| 📝 **课程笔记** | 每节课可写个人笔记，本地保存 |
| 🔍 **全局搜索** | 搜索课程标题、内容、命令、术语 |
| 🔤 **字体调节** | 命令区域支持小/中/大三档切换 |
| 📱 **响应式设计** | 桌面端、平板、手机全适配 |
| 🧪 **随堂测验** | 每章配备选择题，巩固知识点 |

---

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| ⚛️ 前端框架 | React 18 + TypeScript |
| 🌐 路由 | React Router v6 |
| 🎨 样式 | Tailwind CSS 3 + PostCSS |
| 🎞️ 动画 | Framer Motion |
| 🔣 图标 | Lucide React |
| 💾 数据存储 | localStorage（无后端、无须登录） |
| ⚡ 构建工具 | Vite 8 |
| 📦 包管理 | npm / pnpm |

---

## 🚀 快速开始

### 环境要求

- Node.js >= 20
- npm 或 pnpm

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 **http://localhost:3266** 查看网站 🎉

### 生产构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录，可部署到任意静态托管服务。

### 类型检查

```bash
npm run typecheck
```

---

## 📦 部署

构建产物为纯静态文件，可部署到任意静态托管平台：

| 平台 | 推荐指数 |
|------|---------|
| 🐙 GitHub Pages | ⭐⭐⭐⭐⭐ 免费、简单 |
| ▲ Vercel | ⭐⭐⭐⭐⭐ 零配置 |
| 🟣 Netlify | ⭐⭐⭐⭐ |
| ☁️ Cloudflare Pages | ⭐⭐⭐⭐ |

### Nginx 部署示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/vps-guide;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 📂 项目结构

```
src/
├── App.tsx                  # 主应用（路由 + 课程数据）
├── index.tsx                # 入口文件
├── styles/
│   └── index.css            # 全局样式
├── hooks/
│   ├── useFavorites.ts      # 收藏功能
│   ├── useProgress.ts       # 学习进度
│   ├── useNotes.ts          # 用户笔记
│   └── useSearch.ts         # 全局搜索
└── components/
    ├── CommandBlock.tsx      # 命令演示卡片（含符号解析）
    ├── FavoriteButton.tsx    # 收藏按钮
    ├── ProgressBar.tsx       # 进度条
    ├── SearchModal.tsx       # 搜索弹窗
    ├── QuizCard.tsx          # 随堂测验卡片
    └── ...                   # 更多组件
```

---

## 💾 数据存储说明

本项目**无需注册、无需登录**，所有数据存储在浏览器本地：

| 存储项 | 说明 |
|--------|------|
| 📊 学习进度 | 已完成课程列表 |
| ⭐ 收藏 | 收藏的课程 ID |
| 📝 笔记 | 每门课的笔记内容 |
| 🧪 测验成绩 | 历史测验记录 |

> ⚠️ 清除浏览器缓存会导致数据丢失，重要笔记请及时备份！

---

## 🧪 测试

```bash
npm test              # 运行全部测试
npm run test:watch    # 监听模式（开发时自动重跑）
```

当前测试覆盖：`useSearch` / `ProgressBar` / `ErrorBoundary` / 课程数据完整性校验。

---

## 📝 License

[MIT](LICENSE) © 2026
