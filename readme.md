# 🎓 Academic Homepage

一个简洁优雅的学术个人主页模板，专为研究人员和学者设计。

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

## ✨ 特性

- 📱 **响应式设计** - 完美适配桌面、平板和移动设备
- 🎨 **学术风格** - 简洁专业的设计语言
- ⚡ **快速加载** - 轻量级代码，无外部依赖
- 🔧 **配置驱动** - JSON/YAML配置文件，易于维护
- 📂 **模块化** - 清晰的项目结构，便于扩展

## 🏗️ 项目结构

```
WEB/
├── 📄 index.html           # 主页面
├── 📋 readme.md           # 项目说明
├── 📁 assets/             # 静态资源
│   └── 📁 images/
│       └── avatar.svg     # 头像图片
├── ⚙️ config/             # 配置文件
│   └── config.json        # 主配置
├── 🎨 css/                # 样式文件
│   └── homepage.css       # 主样式
├── 📜 js/                 # JavaScript文件
│   └── script.js          # 主脚本
└── 📁 project/            # 项目配置
    ├── project1/
    │   ├── config.yaml
    │   └── picture.svg
    ├── project2/
    │   ├── config.yaml
    │   └── picture.svg
    └── project3/
        ├── config.yaml
        └── picture.svg
```

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd WEB
```

### 2. 配置个人信息
编辑 `config/config.json` 文件：

```json
{
  "personalInfo": {
    "userName": "您的姓名",
    "userBio": "您的学术简介和研究兴趣",
    "avatarImageUrl": "assets/images/avatar.svg"
  }
}
```

### 3. 添加研究项目
在 `project/` 目录下创建新项目文件夹，包含：
- `config.yaml` - 项目配置
- `picture.svg` - 项目缩略图

项目配置示例：
```yaml
title: "项目名称"
description: "项目详细描述"
github: "https://github.com/username/repository"
```

### 4. 运行项目
使用本地服务器运行：
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve .

# 使用 Live Server (VS Code扩展)
# 右键 index.html -> "Open with Live Server"
```

访问 `http://localhost:8000` 查看效果。

## ⚙️ 配置说明

### 主配置文件 (`config/config.json`)

| 字段 | 说明 | 类型 |
|------|------|------|
| `personalInfo.userName` | 显示姓名 | string |
| `personalInfo.userBio` | 个人简介（支持HTML） | string |
| `personalInfo.avatarImageUrl` | 头像图片路径 | string |
| `projects` | 项目列表配置 | array |
| `siteSettings.title` | 网站标题 | string |

### 项目配置 (`project/*/config.yaml`)

```yaml
title: "项目标题"
description: "项目描述"
github: "GitHub仓库链接"
```

## 🎨 自定义样式

主要样式变量位于 `css/homepage.css` 顶部：

```css
/* 色彩方案 */
- 主色调: #2c3e50 (深蓝灰)
- 次要色: #3498db (蓝色)
- 背景色: #ffffff (白色)
- 文本色: #2c3e50 (深色)
- 强调色: #e74c3c (红色)
```

## 📱 响应式断点

- **桌面端**: > 768px
- **平板端**: ≤ 768px
- **移动端**: ≤ 480px

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **配置**: JSON, YAML
- **图标**: SVG
- **字体**: Times New Roman (学术标准)

## 📝 使用许可

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📧 联系方式

- 作者: Xu Chen
- 邮箱: 22325069@zju.edu.cn
- GitHub: [@XuChen-AI](https://github.com/XuChen-AI)

---

⭐ 如果这个项目对您有帮助，请给它一个星标！