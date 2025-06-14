# GitHub Pages 部署指南

## 快速部署步骤

### 1. 准备您的 GitHub 仓库

1. 在 GitHub 上创建一个新仓库，仓库名必须为：`您的用户名.github.io`
   - 例如：如果您的 GitHub 用户名是 `zhangsan`，那么仓库名应该是 `zhangsan.github.io`

2. 确保仓库是公开的（Public）

### 2. 上传网站文件

您可以选择以下任一方式：

#### 方法 A：使用 Git 命令行

```bash
# 克隆您的仓库到本地
git clone https://github.com/您的用户名/您的用户名.github.io.git

# 进入仓库目录
cd 您的用户名.github.io

# 将本项目的所有文件复制到这个目录中

# 添加所有文件到 Git
git add .

# 提交更改
git commit -m "Initial commit: Personal academic homepage"

# 推送到 GitHub
git push origin main
```

#### 方法 B：直接在 GitHub 网页上传

1. 进入您的 `您的用户名.github.io` 仓库
2. 点击 "uploading an existing file" 
3. 将本项目的所有文件和文件夹拖拽到上传区域
4. 提交更改

### 3. 启用 GitHub Pages

1. 进入仓库的 Settings 页面
2. 滚动到 "Pages" 部分
3. 在 "Source" 下选择 "Deploy from a branch"
4. 选择 "main" 分支
5. 点击 "Save"

### 4. 访问您的网站

部署完成后（通常需要几分钟），您可以通过以下地址访问您的网站：
`https://您的用户名.github.io`

## 自定义内容

### 替换个人信息

在部署前，请务必替换以下内容：

1. **个人信息**：
   - 修改 `config/config.json` 中的个人信息
   - 或直接修改 `js/script.js` 中的默认配置

2. **图片文件**：
   - 替换 `assets/images/background.jpg` - 背景图片
   - 替换 `assets/images/avatar.png` - 个人头像
   - 替换 `assets/images/project[N]-thumb.jpg` - 项目缩略图
   - 在 `projects/project[N]/images/` 中添加项目详情图片

3. **项目内容**：
   - 修改项目标题、描述、图片路径等
   - 更新视频链接（YouTube 嵌入格式）
   - 添加 GitHub 仓库链接和论文链接

### 配置文件说明

主要配置文件是 `config/config.json`，包含：
- `personalInfo`: 个人基本信息
- `siteSettings`: 网站设置
- `projects`: 项目列表和详情
- `socialLinks`: 社交媒体链接

## 常见问题

### Q: 网站显示 404 错误
A: 检查仓库名是否正确（必须是 `您的用户名.github.io`），并确保文件在仓库根目录。

### Q: 图片不显示
A: 检查图片文件路径是否正确，确保图片文件已上传到对应位置。

### Q: 样式不正常
A: 检查 CSS 和 JavaScript 文件的路径是否正确。

### Q: 配置文件无法加载
A: 如果 `config.json` 无法加载，网站会自动使用 JavaScript 中的默认配置。

## 进阶自定义

### 添加新页面
1. 创建新的 HTML 文件
2. 确保引用正确的 CSS 和 JS 文件
3. 在主页添加导航链接

### 修改样式
编辑 `css/style.css` 文件：
- 修改颜色主题
- 调整布局和字体
- 添加动画效果

### 添加更多项目
1. 在 `config/config.json` 中添加新项目信息
2. 创建对应的项目详情页 HTML 文件
3. 添加项目图片到相应文件夹

## 技术支持

如有问题，请：
1. 检查浏览器控制台是否有错误信息
2. 确认所有文件路径正确
3. 参考 GitHub Pages 官方文档
4. 在项目仓库中创建 Issue
