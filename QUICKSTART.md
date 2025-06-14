# 快速配置向导

## 第一步：替换个人信息

### 方法1：修改配置文件（推荐）

编辑 `config/config.json` 文件：

```json
{
    "personalInfo": {
        "userName": "您的真实姓名",
        "userBio": "您的个人简介，描述您的研究方向和兴趣",
        "email": "您的邮箱地址",
        "university": "您的大学",
        "department": "您的学院/系"
    }
}
```

### 方法2：直接修改 JavaScript

如果配置文件无法加载，可以直接修改 `js/script.js` 中的 `useDefaultConfig()` 函数。

## 第二步：替换图片文件

### 必需替换的图片：

1. **背景图片**：`assets/images/background.jpg`
   - 建议尺寸：1920x1080
   - 格式：JPG、PNG、WebP

2. **个人头像**：`assets/images/avatar.png`
   - 建议尺寸：400x400（正方形）
   - 格式：PNG、JPG

3. **项目缩略图**：
   - `assets/images/project1-thumb.jpg`
   - `assets/images/project2-thumb.jpg`
   - `assets/images/project3-thumb.jpg`
   - 建议尺寸：400x300
   - 格式：JPG、PNG

### 项目详情图片：

在相应的项目文件夹中添加详情图片：
- `projects/project1/images/`
- `projects/project2/images/`
- `projects/project3/images/`

## 第三步：修改项目内容

### 在 `config/config.json` 中更新项目信息：

```json
{
    "projects": [
        {
            "id": "project1",
            "title": "您的项目标题",
            "shortDescription": "项目简短描述",
            "detailContent": {
                "fullDescription": "<p>项目详细描述（可以包含HTML）</p>",
                "videoUrl": "YouTube嵌入链接",
                "githubUrl": "GitHub仓库链接",
                "tags": ["标签1", "标签2", "标签3"]
            }
        }
    ]
}
```

## 第四步：添加视频（可选）

### YouTube 视频：
1. 在 YouTube 上找到您的视频
2. 点击"分享" → "嵌入"
3. 复制 `src` 属性的链接
4. 格式应该是：`https://www.youtube.com/embed/视频ID`

### 其他视频平台：
如果使用其他平台，确保使用嵌入格式的链接。

## 第五步：添加社交链接（可选）

在 `config/config.json` 中添加：

```json
{
    "socialLinks": {
        "github": "https://github.com/您的用户名",
        "linkedin": "https://linkedin.com/in/您的资料",
        "googleScholar": "https://scholar.google.com/citations?user=您的ID",
        "orcid": "https://orcid.org/您的ORCID",
        "researchGate": "https://www.researchgate.net/profile/您的资料"
    }
}
```

## 检查清单

部署前请确认：

- [ ] 已替换背景图片
- [ ] 已替换个人头像
- [ ] 已更新个人信息（姓名、简介等）
- [ ] 已替换所有项目缩略图
- [ ] 已更新项目标题和描述
- [ ] 已添加项目详情图片
- [ ] 已测试所有链接是否正常工作
- [ ] 已检查在不同设备上的显示效果

## 本地测试

在上传到 GitHub 之前，建议先在本地测试：

1. 使用本地服务器运行网站（如 Live Server 扩展）
2. 检查所有功能是否正常
3. 确认图片和链接都能正确加载
4. 测试响应式设计

## 需要帮助？

如果遇到问题：
1. 检查浏览器控制台的错误信息
2. 确认文件路径大小写正确
3. 验证 JSON 语法是否正确
4. 参考 `README.md` 中的详细说明
