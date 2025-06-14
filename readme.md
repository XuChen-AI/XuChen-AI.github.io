# 个人学术主页模板

这是一个简单、优雅的个人学术主页模板，专为学术研究人员设计。模板支持 GitHub Pages 部署，可以通过 `用户名.github.io` 访问。

## ✨ 特性

- 📱 **响应式设计** - 适配各种设备屏幕
- 🎨 **简洁美观** - 现代化的设计风格
- 🔧 **易于定制** - 解耦的配置文件，方便修改
- 📁 **项目展示** - 支持项目详情页，包含图片、文字、视频
- 🚀 **快速部署** - 一键部署到 GitHub Pages

## 📁 项目结构

```
personalWeb/
├── index.html              # 主页文件
├── README.md               # 项目说明文档
├── css/
│   └── style.css          # 主要样式文件
├── js/
│   └── script.js          # 主要 JavaScript 文件
├── config/
│   └── config.json        # 配置文件（可选，用于集中管理内容）
├── assets/
│   └── images/            # 通用图片资源
│       ├── background.jpg # 背景图片（需要您替换）
│       ├── avatar.png     # 个人头像（需要您替换）
│       ├── project1-thumb.jpg # 项目1缩略图（需要您替换）
│       ├── project2-thumb.jpg # 项目2缩略图（需要您替换）
│       └── project3-thumb.jpg # 项目3缩略图（需要您替换）
└── projects/              # 项目相关文件
    ├── project1.html      # 项目1详情页
    ├── project2.html      # 项目2详情页
    ├── project3.html      # 项目3详情页
    ├── project1/          # 项目1资源文件夹
    │   └── images/        # 项目1的详情图片
    ├── project2/          # 项目2资源文件夹
    │   └── images/        # 项目2的详情图片
    └── project3/          # 项目3资源文件夹
        └── images/        # 项目3的详情图片
```

## 🛠️ 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/你的用户名/你的用户名.github.io.git
cd 你的用户名.github.io
```

### 2. 替换个人信息

#### 修改基本信息
在 `js/script.js` 文件中找到以下部分并修改：

```javascript
// 修改这些变量为您的信息
const projects = [
    {
        id: 'project1',
        thumbnail: 'assets/images/project1-thumb.jpg',
        title: '您的项目标题',
        description: '您的项目简短描述。'
    },
    // 添加更多项目...
];
```

#### 修改页面显示的个人信息
在 `js/script.js` 中修改：

```javascript
const userName = '您的姓名';
const userBio = '您的个人简介...';
```

### 3. 替换图片资源

**必须替换的图片文件：**
- `assets/images/background.jpg` - 页面顶部背景图（推荐尺寸：1920x1080）
- `assets/images/avatar.png` - 个人头像（推荐尺寸：400x400 正方形）
- `assets/images/project1-thumb.jpg` - 项目1缩略图（推荐尺寸：400x300）
- `assets/images/project2-thumb.jpg` - 项目2缩略图（推荐尺寸：400x300）
- `assets/images/project3-thumb.jpg` - 项目3缩略图（推荐尺寸：400x300）

**为项目详情页添加图片：**
- 将项目详情图片放入对应的 `projects/project[N]/images/` 文件夹
- 在 `js/script.js` 中更新图片路径

### 4. 自定义项目内容

#### 添加新项目
1. **在主页添加项目**：修改 `js/script.js` 中的 `projects` 数组
2. **创建项目详情页**：复制 `projects/project1.html` 并重命名
3. **添加项目数据**：在 `js/script.js` 中的 `projectData` 对象中添加项目信息

#### 修改现有项目
在 `js/script.js` 中找到 `projectData` 对象，修改对应项目的：
- `title`: 项目标题
- `images`: 项目详情图片路径数组
- `description`: 项目详细描述（支持 HTML）
- `videoUrl`: 视频链接（YouTube 嵌入链接格式）

### 5. 自定义样式

所有样式都在 `css/style.css` 中，您可以修改：
- 颜色主题
- 字体样式
- 布局尺寸
- 动画效果

## 🚀 部署到 GitHub Pages

### 方法一：直接上传到 GitHub

1. 在 GitHub 创建一个名为 `你的用户名.github.io` 的仓库
2. 将所有文件上传到仓库根目录
3. 在仓库设置中启用 GitHub Pages（选择 main 分支）
4. 访问 `https://你的用户名.github.io`

### 方法二：使用 Git 命令

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Personal academic homepage"

# 添加远程仓库
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git

# 推送到 GitHub
git push -u origin main
```

## 📝 详细自定义指南

### 修改个人信息

**方式一：直接修改 JavaScript（推荐新手）**
在 `js/script.js` 中直接修改变量值。

**方式二：使用配置文件（推荐进阶用户）**
修改 `config/config.json` 文件，然后更新 JavaScript 来读取配置文件。

### 添加项目视频

支持 YouTube 视频嵌入：
1. 获取 YouTube 视频的嵌入链接（格式：`https://www.youtube.com/embed/视频ID`）
2. 在项目数据中设置 `videoUrl` 字段

### 修改页面标题和 SEO

在 `index.html` 中修改：
- `<title>` 标签：页面标题
- `<meta>` 标签：页面描述、关键词等

### 添加更多页面

1. 创建新的 HTML 文件
2. 确保 CSS 和 JS 文件路径正确
3. 在主页添加导航链接

## 🎨 样式自定义

### 颜色主题
在 `css/style.css` 中查找颜色值并替换：
- 主色调：`#007bff`
- 背景色：`#f4f4f4`
- 文字色：`#333`

### 字体
修改 `body` 选择器中的 `font-family` 属性。

### 布局
调整 `.project-card`、`#profile` 等选择器的样式。

## 📱 响应式设计

模板已包含响应式设计，支持：
- 桌面端（1200px+）
- 平板端（768px-1199px）
- 手机端（<768px）

## 🔧 故障排除

### 图片不显示
1. 检查图片文件路径是否正确
2. 确保图片文件已上传到正确位置
3. 检查图片文件名是否与代码中的引用一致

### 项目详情页无法加载
1. 检查项目 ID 是否与文件名匹配
2. 确保 JavaScript 中的项目数据包含对应项目
3. 检查浏览器控制台是否有错误信息

### GitHub Pages 部署失败
1. 确保仓库名为 `用户名.github.io`
2. 检查文件是否都在根目录
3. 等待几分钟让 GitHub Pages 更新

## 📄 许可证

此项目使用 MIT 许可证。您可以自由使用、修改和分发。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个模板！

## 📞 联系方式

如有问题，请通过以下方式联系：
- 创建 GitHub Issue
- 发送邮件至：[您的邮箱]

---

**注意：** 部署前请务必替换所有占位图片和个人信息！
