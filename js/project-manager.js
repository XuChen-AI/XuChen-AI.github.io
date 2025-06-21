/**
 * ==========================================
 * 项目管理工具 (project-manager.js)
 * ==========================================
 * 
 * 功能：帮助管理和创建新项目的配置文件
 * 使用方法：在浏览器控制台中调用相关函数
 */

class ProjectManager {
    constructor() {
        this.projectTemplate = {
            projectInfo: {
                id: "",
                title: "",
                shortDescription: "",
                thumbnailUrl: "images/project-thumb.svg",
                backgroundUrl: "images/project-bg.svg"
            },
            content: {
                images: [],
                videos: [],
                textFile: "texts/description.md",
                fullDescription: ""
            },
            links: {
                videoUrl: null,
                githubUrl: "",
                paperUrl: ""
            },
            tags: []
        };
    }

    /**
     * 生成新项目配置模板
     * @param {string} projectId - 项目ID
     * @param {string} title - 项目标题
     * @param {string} description - 项目描述
     * @param {Array} tags - 标签数组
     * @returns {Object} 项目配置对象
     */
    generateProjectConfig(projectId, title, description, tags = []) {
        const config = JSON.parse(JSON.stringify(this.projectTemplate));
        
        config.projectInfo.id = projectId;
        config.projectInfo.title = title;
        config.projectInfo.shortDescription = description;
        config.projectInfo.thumbnailUrl = `images/${projectId}-thumb.svg`;
        config.projectInfo.backgroundUrl = `images/${projectId}-bg.svg`;
        config.tags = tags;
        
        return config;
    }

    /**
     * 生成项目引用配置（用于主配置文件）
     * @param {string} projectId - 项目ID
     * @returns {Object} 项目引用对象
     */
    generateProjectReference(projectId) {
        return {
            id: projectId,
            configPath: `projects/${projectId}/config/config.json`,
            detailPageUrl: `projects/${projectId}/index.html`
        };
    }

    /**
     * 验证项目配置
     * @param {Object} config - 项目配置
     * @returns {Object} 验证结果
     */
    validateProjectConfig(config) {
        const errors = [];
        const warnings = [];

        // 必需字段检查
        if (!config.projectInfo?.id) errors.push('缺少项目ID');
        if (!config.projectInfo?.title) errors.push('缺少项目标题');
        if (!config.projectInfo?.shortDescription) warnings.push('缺少项目描述');

        // 文件路径检查
        if (!config.content?.textFile) warnings.push('缺少文本文件路径');
        if (!config.projectInfo?.thumbnailUrl) warnings.push('缺少缩略图路径');

        // 链接检查
        if (config.links?.githubUrl && !this.isValidUrl(config.links.githubUrl)) {
            warnings.push('GitHub链接格式可能不正确');
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }

    /**
     * 检查URL格式
     * @param {string} url - URL字符串
     * @returns {boolean} 是否为有效URL
     */
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * 打印配置到控制台（用于复制）
     * @param {Object} config - 配置对象
     */
    printConfig(config) {
        console.log('项目配置 JSON:');
        console.log(JSON.stringify(config, null, 2));
    }

    /**
     * 生成项目文件夹结构说明
     * @param {string} projectId - 项目ID
     * @returns {string} 文件夹结构
     */
    generateFolderStructure(projectId) {
        return `
项目文件夹结构：
projects/${projectId}/
├── config/
│   └── config.json         # 项目配置文件
├── css/
│   └── project-detail.css  # 项目样式文件
├── icons/
│   ├── github-icon.svg     # GitHub图标
│   └── pdf-icon.svg        # PDF图标
├── images/
│   ├── ${projectId}-thumb.svg    # 缩略图
│   ├── ${projectId}-bg.svg       # 背景图
│   └── methodology-framework.svg # 其他图片
├── js/
│   └── project-detail.js   # 项目脚本文件
├── texts/
│   └── description.md      # 项目描述文件
├── videos/
│   └── README.txt          # 视频说明
└── index.html              # 项目详情页
        `.trim();
    }

    /**
     * 快速创建项目配置
     * @param {string} projectId - 项目ID
     * @param {string} title - 项目标题
     * @param {string} description - 项目描述
     * @param {Array} tags - 标签
     */
    quickCreate(projectId, title, description, tags = []) {
        const config = this.generateProjectConfig(projectId, title, description, tags);
        const reference = this.generateProjectReference(projectId);
        const validation = this.validateProjectConfig(config);
        
        console.log('=== 新项目配置 ===');
        console.log('项目ID:', projectId);
        console.log('项目标题:', title);
        console.log('验证结果:', validation.isValid ? '✅ 通过' : '❌ 失败');
        
        if (validation.warnings.length > 0) {
            console.warn('警告:', validation.warnings);
        }
        
        if (validation.errors.length > 0) {
            console.error('错误:', validation.errors);
            return;
        }

        console.log('\n=== 文件夹结构 ===');
        console.log(this.generateFolderStructure(projectId));
        
        console.log('\n=== 项目配置文件内容 ===');
        this.printConfig(config);
        
        console.log('\n=== 主配置文件中添加的引用 ===');
        console.log(JSON.stringify(reference, null, 2));
        
        console.log('\n=== 使用说明 ===');
        console.log('1. 创建项目文件夹结构');
        console.log('2. 将项目配置保存为 projects/' + projectId + '/config/config.json');
        console.log('3. 在主配置文件的 projects 数组中添加项目引用');
        console.log('4. 复制并修改项目详情页文件');
    }
}

// 创建全局实例
const projectManager = new ProjectManager();

// 使用示例
console.log(`
=== 项目管理工具已加载 ===

使用示例：
1. 快速创建项目配置：
   projectManager.quickCreate('project4', '新项目标题', '项目描述', ['标签1', '标签2']);

2. 生成配置模板：
   const config = projectManager.generateProjectConfig('project4', '标题', '描述');

3. 验证配置：
   const result = projectManager.validateProjectConfig(config);

4. 生成文件夹结构：
   console.log(projectManager.generateFolderStructure('project4'));
`);

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectManager;
}
