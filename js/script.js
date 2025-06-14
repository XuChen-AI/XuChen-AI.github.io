/**
 * ==========================================
 * 个人学术主页 JavaScript 主文件 (script.js)
 * ==========================================
 * 
 * 作者：[您的姓名]
 * 版本：2.0
 * 创建日期：[创建日期]
 * 最后修改：[修改日期]
 * 
 * 功能描述：
 * 这是个人学术主页的核心JavaScript文件，负责：
 * 1. 动态加载配置文件和个人信息
 * 2. 渲染项目列表和项目详情页
 * 3. 处理图片、视频和文本文件的加载
 * 4. 提供响应式交互功能
 * 5. 支持Markdown文本转HTML显示
 * 
 * 文件结构：
 * - 配置管理：加载和处理配置文件
 * - 页面初始化：设置个人信息和项目数据
 * - 项目展示：动态生成项目卡片和详情页
 * - 文件处理：文本文件加载和Markdown转换
 * - 工具函数：辅助功能和响应式处理
 * 
 * 依赖项：
 * - config/config.json：配置文件
 * - 各项目文件夹中的资源文件
 * - 现代浏览器的 Fetch API 支持
 * 
 * 浏览器兼容性：
 * - Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
 * - 需要支持 ES6+ 语法 (async/await, 模板字符串等)
 */

/* ==========================================
 * 全局变量声明
 * ==========================================
 */

/**
 * 全局配置对象
 * 存储从配置文件加载的所有设置信息
 * @type {Object|null}
 */
let config = null;

/* ==========================================
 * 页面初始化和事件监听
 * ==========================================
 */

/**
 * DOM内容加载完成时的初始化函数
 * 这是整个应用的入口点，负责启动所有核心功能
 */
document.addEventListener('DOMContentLoaded', function() {
    // 尝试从配置文件加载数据，如果失败则使用默认配置
    loadConfig().then(() => {
        initializePage();
    }).catch(() => {
        console.warn('无法加载配置文件，使用默认配置');
        useDefaultConfig();
        initializePage();
    });
});

/* ==========================================
 * 配置管理功能
 * ==========================================
 */

/**
 * 异步加载配置文件
 * 从 config/config.json 文件中读取网站配置信息
 * @returns {Promise} 加载成功或失败的Promise
 * @throws {Error} 当配置文件无法加载时抛出错误
 */
async function loadConfig() {
    try {
        const response = await fetch('config/config.json');
        if (!response.ok) {
            throw new Error(`HTTP错误! 状态: ${response.status}`);
        }
        config = await response.json();
        console.log('配置文件加载成功');
    } catch (error) {
        console.error('配置文件加载失败:', error);
        throw error;
    }
}

/**
 * 使用默认配置数据
 * 当配置文件无法加载时，使用硬编码的默认配置
 * 这确保了网站在任何情况下都能正常显示基本内容
 */
function useDefaultConfig() {
    console.log('使用默认配置数据');
    config = {
        personalInfo: {
            userName: "您的姓名",
            userBio: "在这里写您的个人简介。介绍您的研究方向、兴趣等。",
            avatarImageUrl: "assets/images/avatar.png",
            headerBackgroundImageUrl: "assets/images/background.jpg"
        },
        projects: [
            {
                id: 'project1',
                thumbnailUrl: 'assets/images/project1-thumb.jpg',
                title: '项目一：AI辅助诊断系统',
                shortDescription: '利用深度学习技术，辅助医生进行早期疾病诊断。',
                detailContent: {
                    images: ['projects/project1/images/demo1.jpg', 'projects/project1/images/architecture.jpg'],
                    videos: ['projects/project1/videos/demo_video.mp4', 'projects/project1/videos/presentation.mp4'],
                    textFile: 'projects/project1/texts/description.md',
                    fullDescription: '<p>这是项目一的详细描述。我们使用了先进的深度学习模型，例如 CNN 和 RNN，来分析医学影像数据。</p><p>系统的准确率达到了95%，有效提高了早期诊断的效率。</p>',
                    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                    githubUrl: 'https://github.com/your-username/ai-diagnosis-system',
                    tags: ['深度学习', '医学影像', 'AI诊断']
                }
            },
            {
                id: 'project2',
                thumbnailUrl: 'assets/images/project2-thumb.jpg',
                title: '项目二：个性化学习推荐引擎',
                shortDescription: '根据学生的学习行为和偏好，智能推荐学习资源。',
                detailContent: {
                    images: ['projects/project2/images/system-overview.jpg'],
                    videos: ['projects/project2/videos/system_demo.mp4', 'projects/project2/videos/user_interface.mp4'],
                    textFile: 'projects/project2/texts/description.md',
                    fullDescription: '<p>项目二专注于构建一个智能学习推荐系统。通过分析用户的学习历史和偏好，系统能够动态调整推荐内容。</p>',
                    videoUrl: null,
                    githubUrl: 'https://github.com/your-username/learning-recommendation',
                    tags: ['推荐系统', '个性化学习', '数据挖掘']
                }
            },
            {
                id: 'project3',
                thumbnailUrl: 'assets/images/project3-thumb.jpg',
                title: '项目三：自动驾驶感知算法研究',
                shortDescription: '研究和开发用于自动驾驶汽车的高精度环境感知算法。',
                detailContent: {
                    images: ['projects/project3/images/perception-pipeline.jpg', 'projects/project3/images/detection-results.jpg'],
                    videos: ['projects/project3/videos/driving_demo.mp4', 'projects/project3/videos/real_road_test.mp4'],
                    textFile: 'projects/project3/texts/description.md',
                    fullDescription: '<p>本项目旨在提升自动驾驶汽车在复杂环境下的感知能力。我们重点研究了多传感器融合技术。</p>',
                    videoUrl: 'https://www.youtube.com/embed/another-video-id',
                    githubUrl: 'https://github.com/your-username/autonomous-perception',
                    tags: ['自动驾驶', '计算机视觉', '传感器融合']
                }
            }
        ]
    };
}

/* ==========================================
 * 页面内容初始化
 * ==========================================
 */

/**
 * 初始化页面所有内容
 * 协调各个模块的初始化过程
 */
function initializePage() {
    console.log('开始初始化页面...');
    
    updatePersonalInfo();
    loadProjects();
    updateFooter();
    
    // 检查是否在项目详情页面
    if (window.location.pathname.includes('/projects/')) {
        loadProjectDetails();
    }
    
    console.log('页面初始化完成');
}

/**
 * 更新个人信息显示
 * 将配置文件中的个人信息应用到页面元素上
 */
function updatePersonalInfo() {
        // 检查配置数据是否存在
    if (!config || !config.personalInfo) {
        console.warn('个人信息配置缺失，跳过个人信息更新');
        return;
    }
    
    const { personalInfo } = config;
    
    // 更新用户姓名
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = personalInfo.userName;
        console.log('用户姓名已更新:', personalInfo.userName);
    }
    
    // 更新个人简介
    const userBioElement = document.getElementById('user-bio');
    if (userBioElement) {
        userBioElement.textContent = personalInfo.userBio;
        console.log('个人简介已更新');
    }
    
    // 更新头像图片
    const avatarElement = document.getElementById('avatar');
    if (avatarElement) {
        avatarElement.src = personalInfo.avatarImageUrl;
        avatarElement.alt = personalInfo.userName + ' 的头像';
        
        // 为头像添加加载错误处理
        avatarElement.onerror = function() {
            console.warn('头像图片加载失败，使用默认占位图');
            this.src = generatePlaceholderImage('头像', 150, 150);
        };
    }
    
    // 更新头部背景图片
    const headerElement = document.getElementById('main-header');
    if (headerElement && personalInfo.headerBackgroundImageUrl) {
        headerElement.style.backgroundImage = `url('${personalInfo.headerBackgroundImageUrl}')`;
        console.log('背景图片已更新');
    }
    
    // 更新页面标题
    if (config.siteSettings && config.siteSettings.title) {
        document.title = config.siteSettings.title;
        console.log('页面标题已更新:', config.siteSettings.title);
    }
}

/* ==========================================
 * 项目展示功能
 * ==========================================
 */

/**
 * 加载并显示项目列表
 * 在主页中动态生成项目卡片网格
 */
function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) {
        console.warn('未找到项目网格容器元素');
        return;
    }
    
    if (!config.projects || config.projects.length === 0) {
        console.warn('没有项目数据可显示');
        projectsGrid.innerHTML = '<p style="text-align: center; color: #666;">暂无项目展示</p>';
        return;
    }
    
    // 清空现有内容
    projectsGrid.innerHTML = '';
    
    // 为每个项目创建卡片
    config.projects.forEach((project, index) => {
        try {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
            console.log(`项目卡片已创建: ${project.title}`);
        } catch (error) {
            console.error(`创建项目卡片失败 (项目 ${index + 1}):`, error);
        }
    });
    
    console.log(`成功加载 ${config.projects.length} 个项目`);
}

/**
 * 创建单个项目卡片元素
 * @param {Object} project - 项目数据对象
 * @returns {HTMLElement} 项目卡片DOM元素
 */
function createProjectCard(project) {
    // 验证项目数据
    if (!project || !project.title) {
        throw new Error('项目数据无效：缺少必要字段');
    }
    
    // 创建项目卡片容器
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    
    // 创建项目链接
    const projectLink = document.createElement('a');
    projectLink.href = project.detailPageUrl || `projects/${project.id}.html`;
    projectLink.setAttribute('aria-label', `查看项目：${project.title}`);
    
    // 创建缩略图
    const thumbnail = document.createElement('img');
    thumbnail.src = project.thumbnailUrl || '';
    thumbnail.alt = project.title + ' 缩略图';
    thumbnail.classList.add('project-thumbnail');
    
    // 缩略图加载失败处理
    thumbnail.onerror = function() {
        console.warn(`项目缩略图加载失败: ${project.title}`);
        this.src = generatePlaceholderImage('项目图片', 400, 300);
    };
    
    // 创建项目信息容器
    const projectInfo = document.createElement('div');
    projectInfo.classList.add('project-info');
    
    // 创建项目标题
    const title = document.createElement('h3');
    title.textContent = project.title;
    
    // 创建项目描述
    const description = document.createElement('p');
    description.textContent = project.shortDescription || '暂无描述';
    
    // 组装元素
    projectInfo.appendChild(title);
    projectInfo.appendChild(description);
    projectLink.appendChild(thumbnail);
    projectLink.appendChild(projectInfo);
    projectCard.appendChild(projectLink);
    
    return projectCard;
}

/**
 * 更新页脚信息
 * 设置当前年份和个人信息
 */
/**
 * 更新页脚信息
 * 设置当前年份和个人信息
 */
function updateFooter() {
    // 更新当前年份
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        const currentYear = new Date().getFullYear();
        currentYearSpan.textContent = currentYear;
        console.log('页脚年份已更新:', currentYear);
    }
    
    // 如果有个人信息，更新页脚中的姓名
    const footerNameElements = document.querySelectorAll('footer p');
    if (footerNameElements.length > 0 && config && config.personalInfo) {
        footerNameElements[0].innerHTML = footerNameElements[0].innerHTML.replace(
            '您的名字', 
            config.personalInfo.userName
        );
        console.log('页脚姓名已更新');
    }
}

/* ==========================================
 * 项目详情页功能
 * ==========================================
 */

/**
 * 项目详情页加载逻辑
 * 解析URL中的项目ID并加载对应的项目详情
 */
function loadProjectDetails() {
    console.log('开始加载项目详情页...');
    
    // 从 URL 获取项目 ID
    const pathParts = window.location.pathname.split('/');
    const projectIdWithExtension = pathParts[pathParts.length - 1];
    
    // 移除文件扩展名获取纯ID
    const projectId = projectIdWithExtension.substring(0, projectIdWithExtension.lastIndexOf('.'));
    console.log('当前项目ID:', projectId);
    
    // 查找对应的项目数据
    const currentProject = config && config.projects ? 
        config.projects.find(project => project.id === projectId) : null;
    
    if (currentProject && currentProject.detailContent) {
        console.log('找到项目数据，开始渲染详情页');
        renderProjectDetails(currentProject);
    } else {
        console.warn('未找到项目数据，显示404页面');
        renderProjectNotFound();
    }
}

/**
 * 渲染项目详情页内容
 * @param {Object} project - 项目数据对象
 */
function renderProjectDetails(project) {
    const detailContainer = document.getElementById('project-detail-content');
    if (!detailContainer) {
        console.error('未找到项目详情容器元素');
        return;
    }
    
    console.log('开始渲染项目详情:', project.title);
      // 更新页面标题
    document.title = project.title + " - Project Details";
      let htmlContent = `<h1>${project.title}</h1>`;    // 添加项目背景图片
    const projectBgPath = `../projects/${project.id}/images/${project.id}-bg.svg`;
    htmlContent += `
        <div class="project-background-image">
            <img src="${projectBgPath}" alt="${project.title} Background Image" class="project-bg-img" onerror="this.style.display='none'">
        </div>
    `;
    console.log('项目背景图片已添加:', projectBgPath);
    
    // 添加项目标签（如果存在）
    if (project.detailContent.tags && project.detailContent.tags.length > 0) {
        htmlContent += '<div class="project-tags">';
        project.detailContent.tags.forEach(tag => {
            htmlContent += `<span class="tag">${tag}</span>`;
        });
        htmlContent += '</div>';
        console.log('项目标签已添加:', project.detailContent.tags.length, '个');
    }
    
    // 添加项目图片
    if (project.detailContent.images && project.detailContent.images.length > 0) {
        htmlContent += '<div class="project-images">';
        project.detailContent.images.forEach(imgPath => {
            htmlContent += `<img src="../${imgPath}" alt="${project.title}详情图片" onerror="this.style.display='none'">`;
        });
        htmlContent += '</div>';
        console.log('项目图片已添加:', project.detailContent.images.length, '张');
    }
    
    // 异步加载并显示文本文件内容
    if (project.detailContent.textFile) {
        loadTextFile(`../${project.detailContent.textFile}`).then(textContent => {
            if (textContent) {
                const textContainer = document.getElementById('project-text-content');
                if (textContainer) {
                    textContainer.innerHTML = markdownToHtml(textContent);
                    console.log('项目文本内容已加载');
                }
            }
        });
        htmlContent += '<div id="project-text-content" class="project-text-content"></div>';
    }
    
    // 添加原有的文字描述（作为备用内容）
    if (project.detailContent.fullDescription) {
        htmlContent += `<div class="project-description">${project.detailContent.fullDescription}</div>`;
        console.log('项目描述已添加');
    }
      // 添加本地视频文件
    if (project.detailContent.videos && project.detailContent.videos.length > 0) {
        htmlContent += '<div class="project-videos"><h3>Project Demo Videos</h3>';
        project.detailContent.videos.forEach((videoPath, index) => {
            htmlContent += `
                <div class="video-container">
                    <video controls width="100%" style="max-width: 800px;">
                        <source src="../${videoPath}" type="video/mp4">
                        Your browser does not support video playback.
                    </video>
                    <p class="video-caption">Video ${index + 1}: ${videoPath.split('/').pop()}</p>
                </div>
            `;
        });
        htmlContent += '</div>';
        console.log('本地视频已添加:', project.detailContent.videos.length, '个');
    }
    
    // 添加外部链接按钮
    if (project.detailContent.githubUrl || project.detailContent.paperUrl) {
        htmlContent += '<div class="project-links">';
          if (project.detailContent.githubUrl) {
            htmlContent += `<a href="${project.detailContent.githubUrl}" target="_blank" class="project-link-btn github-btn">View Code</a>`;
        }
        
        if (project.detailContent.paperUrl) {
            htmlContent += `<a href="${project.detailContent.paperUrl}" target="_blank" class="project-link-btn paper-btn">View Paper</a>`;
        }
          htmlContent += '</div>';
        console.log('外部链接已添加');
    }
    
    // 添加 YouTube 视频嵌入
    if (project.detailContent.videoUrl) {
        htmlContent += `
            <div class="project-video-container">
                <h3>Online Demo Video</h3>
                <iframe src="${project.detailContent.videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
        console.log('YouTube视频已添加');
    }
    
    // 添加返回主页的链接
    htmlContent += `<a href="../index.html" class="back-link">Back to Homepage</a>`;
    
    // 将生成的HTML内容插入到页面中
    detailContainer.innerHTML = htmlContent;
    console.log('项目详情页渲染完成');
}

/**
 * 渲染项目未找到页面
 * 当项目ID无效或项目数据缺失时显示
 */
function renderProjectNotFound() {
    const detailContainer = document.getElementById('project-detail-content');
    if (!detailContainer) {
        console.error('未找到项目详情容器元素');
        return;
    }
    
    console.log('渲染项目未找到页面');
      detailContainer.innerHTML = `
        <h1>Project Not Found</h1>
        <p>Sorry, we couldn't find the project details you're looking for. Possible reasons:</p>
        <ul>
            <li>Project ID does not exist</li>
            <li>Project data configuration error</li>
            <li>Configuration file loading failed</li>
        </ul>
        <a href="../index.html" class="back-link">Back to Homepage</a>
    `;
    
    // 更新页面标题
    document.title = "Project Not Found - Error Page";
}

/* ==========================================
 * 文件处理功能
 * ==========================================
 */

/**
 * 异步加载文本文件内容
 * @param {string} filePath - 文件路径
 * @returns {Promise<string|null>} 文件内容或null（如果加载失败）
 */
async function loadTextFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP错误! 状态: ${response.status}`);
        }
        const textContent = await response.text();
        console.log('文本文件加载成功:', filePath);
        return textContent;
    } catch (error) {
        console.warn(`文本文件加载失败: ${error.message}`);
        return null;
    }
}

/**
 * 将Markdown文本转换为HTML
 * 这是一个简化版的Markdown解析器，支持基本的Markdown语法
 * @param {string} markdown - Markdown格式的文本
 * @returns {string} 转换后的HTML文本
 */
function markdownToHtml(markdown) {
    if (!markdown) {
        console.warn('Markdown内容为空');
        return '';
    }
    
    console.log('开始转换Markdown为HTML');
    
    return markdown
        // 标题转换 (###, ##, #)
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // 无序列表转换
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        // 段落转换
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[h|u|l])(.*)$/gim, '<p>$1</p>')
        // 清理多余的标签
        .replace(/<p><\/p>/g, '')
        .replace(/<p>(<[h|u])/g, '$1')
        .replace(/(<\/[h|u][^>]*>)<\/p>/g, '$1');
}

/**
 * 生成占位图片的SVG数据URL
 * 当图片加载失败时使用
 * @param {string} text - 占位图上显示的文字
 * @param {number} width - 图片宽度
 * @param {number} height - 图片高度
 * @returns {string} SVG数据URL
 */
function generatePlaceholderImage(text, width, height) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <rect width="${width}" height="${height}" fill="#f0f0f0"/>
            <text x="${width/2}" y="${height/2}" text-anchor="middle" dy="0.3em" 
                  font-family="Arial, sans-serif" font-size="14" fill="#999">
                ${text}
            </text>
        </svg>
    `;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

/* ==========================================
 * 工具函数和事件处理
 * ==========================================
 */

/**
 * 防抖函数
 * 限制函数的执行频率，防止频繁触发
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ==========================================
 * 全局事件监听器
 * ==========================================
 */

/**
 * 窗口大小改变事件监听器
 * 使用防抖处理响应式调整
 */
window.addEventListener('resize', debounce(() => {
    console.log('窗口大小已改变，触发响应式调整');
    // 可以在这里添加响应式调整逻辑
    // 例如：重新计算项目网格布局、调整图片大小等
}, 250));

/**
 * 页面完全加载完成事件监听器
 * 在所有资源（包括图片、样式表等）加载完成后触发
 */
window.addEventListener('load', () => {
    console.log('页面及所有资源加载完成');
    // 可以在这里添加需要在所有资源加载完成后执行的逻辑
    // 例如：性能监控、用户行为追踪等
});

/**
 * 页面卸载前事件监听器
 * 在用户离开页面前进行清理工作
 */
window.addEventListener('beforeunload', () => {
    console.log('页面即将卸载，执行清理工作');
    // 可以在这里添加清理逻辑
    // 例如：保存用户状态、清理定时器等
});

/* ==========================================
 * 性能优化和错误处理
 * ==========================================
 */

/**
 * 全局错误处理器
 * 捕获和记录未处理的JavaScript错误
 */
window.addEventListener('error', (event) => {
    console.error('全局错误捕获:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
    
    // 在生产环境中，可以将错误信息发送到日志服务
    // 这里只是在控制台记录
});

/**
 * Promise错误处理器
 * 捕获未处理的Promise rejection
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('未处理的Promise rejection:', event.reason);
    
    // 防止在控制台显示默认的错误信息
    event.preventDefault();
});

// 文件结束标记
console.log('个人学术主页JavaScript文件加载完成 - Version 2.0');
