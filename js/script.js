// 个人学术主页 JavaScript 文件
// 这个文件负责动态加载项目数据和个人信息

// 配置数据 - 可以从外部 JSON 文件加载，或直接在这里修改
let config = null;

// 初始化页面
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

// 加载配置文件
async function loadConfig() {
    try {
        const response = await fetch('config/config.json');
        if (!response.ok) {
            throw new Error('配置文件加载失败');
        }
        config = await response.json();
    } catch (error) {
        throw error;
    }
}

// 使用默认配置（当配置文件无法加载时）
function useDefaultConfig() {
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
                    fullDescription: '<p>本项目旨在提升自动驾驶汽车在复杂环境下的感知能力。我们重点研究了多传感器融合技术。</p>',
                    videoUrl: 'https://www.youtube.com/embed/another-video-id',
                    githubUrl: 'https://github.com/your-username/autonomous-perception',
                    tags: ['自动驾驶', '计算机视觉', '传感器融合']
                }
            }
        ]
    };
}

// 初始化页面内容
function initializePage() {
    updatePersonalInfo();
    loadProjects();
    updateFooter();
    
    // 检查是否在项目详情页
    if (window.location.pathname.includes('/projects/')) {
        loadProjectDetails();
    }
}

// 更新个人信息
function updatePersonalInfo() {
    if (!config || !config.personalInfo) return;
    
    const { personalInfo } = config;
    
    // 更新姓名
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = personalInfo.userName;
    }
    
    // 更新个人简介
    const userBioElement = document.getElementById('user-bio');
    if (userBioElement) {
        userBioElement.textContent = personalInfo.userBio;
    }
    
    // 更新头像
    const avatarElement = document.getElementById('avatar');
    if (avatarElement) {
        avatarElement.src = personalInfo.avatarImageUrl;
        avatarElement.alt = personalInfo.userName + ' 的头像';
    }
    
    // 更新背景图片
    const headerElement = document.getElementById('main-header');
    if (headerElement) {
        headerElement.style.backgroundImage = `url('${personalInfo.headerBackgroundImageUrl}')`;
    }
    
    // 更新页面标题
    if (config.siteSettings && config.siteSettings.title) {
        document.title = config.siteSettings.title;
    }
}

// 加载项目列表
function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid || !config.projects) return;
    
    // 清空现有内容
    projectsGrid.innerHTML = '';
    
    config.projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// 创建项目卡片
function createProjectCard(project) {
    // 创建项目卡片容器
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    
    // 创建项目链接
    const projectLink = document.createElement('a');
    projectLink.href = project.detailPageUrl || `projects/${project.id}.html`;
    
    // 创建缩略图
    const thumbnail = document.createElement('img');
    thumbnail.src = project.thumbnailUrl;
    thumbnail.alt = project.title + ' 缩略图';
    thumbnail.classList.add('project-thumbnail');
    thumbnail.onerror = function() {
        // 如果图片加载失败，显示占位图
        this.src = 'data:image/svg+xml,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                <rect width="400" height="300" fill="#f0f0f0"/>
                <text x="200" y="150" text-anchor="middle" dy="0.3em" font-family="Arial, sans-serif" font-size="14" fill="#999">
                    项目图片占位符
                </text>
            </svg>
        `);
    };
    
    // 创建项目信息容器
    const projectInfo = document.createElement('div');
    projectInfo.classList.add('project-info');
    
    // 创建项目标题
    const title = document.createElement('h3');
    title.textContent = project.title;
    
    // 创建项目描述
    const description = document.createElement('p');
    description.textContent = project.shortDescription;
    
    // 组装元素
    projectInfo.appendChild(title);
    projectInfo.appendChild(description);
    projectLink.appendChild(thumbnail);
    projectLink.appendChild(projectInfo);
    projectCard.appendChild(projectLink);
    
    return projectCard;
}

// 更新页脚信息
function updateFooter() {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // 如果有个人信息，更新页脚中的姓名
    const footerNameElements = document.querySelectorAll('footer p');
    if (footerNameElements.length > 0 && config.personalInfo) {
        footerNameElements[0].innerHTML = footerNameElements[0].innerHTML.replace(
            '您的名字', 
            config.personalInfo.userName
        );
    }
}

// 项目详情页加载逻辑
function loadProjectDetails() {
    // 从 URL 获取项目 ID
    const pathParts = window.location.pathname.split('/');
    const projectIdWithExtension = pathParts[pathParts.length - 1];
    const projectId = projectIdWithExtension.substring(0, projectIdWithExtension.lastIndexOf('.'));
    
    // 查找对应的项目数据
    const currentProject = config.projects ? config.projects.find(project => project.id === projectId) : null;
    
    if (currentProject && currentProject.detailContent) {
        renderProjectDetails(currentProject);
    } else {
        renderProjectNotFound();
    }
}

// 渲染项目详情
function renderProjectDetails(project) {
    const detailContainer = document.getElementById('project-detail-content');
    if (!detailContainer) return;
    
    // 更新页面标题
    document.title = project.title + " - 项目详情";
    
    let htmlContent = `<h1>${project.title}</h1>`;
    
    // 添加项目标签（如果有）
    if (project.detailContent.tags && project.detailContent.tags.length > 0) {
        htmlContent += '<div class="project-tags">';
        project.detailContent.tags.forEach(tag => {
            htmlContent += `<span class="tag">${tag}</span>`;
        });
        htmlContent += '</div>';
    }
    
    // 添加图片
    if (project.detailContent.images && project.detailContent.images.length > 0) {
        project.detailContent.images.forEach(imgPath => {
            htmlContent += `<img src="../${imgPath}" alt="${project.title}详情图片" onerror="this.style.display='none'">`;
        });
    }
    
    // 添加文字描述
    if (project.detailContent.fullDescription) {
        htmlContent += `<div class="project-description">${project.detailContent.fullDescription}</div>`;
    }
    
    // 添加链接按钮
    if (project.detailContent.githubUrl || project.detailContent.paperUrl) {
        htmlContent += '<div class="project-links">';
        
        if (project.detailContent.githubUrl) {
            htmlContent += `<a href="${project.detailContent.githubUrl}" target="_blank" class="project-link-btn github-btn">查看代码</a>`;
        }
        
        if (project.detailContent.paperUrl) {
            htmlContent += `<a href="${project.detailContent.paperUrl}" target="_blank" class="project-link-btn paper-btn">查看论文</a>`;
        }
        
        htmlContent += '</div>';
    }
    
    // 添加视频链接 (嵌入式播放器)
    if (project.detailContent.videoUrl) {
        htmlContent += `
            <div class="project-video-container">
                <h3>项目演示视频</h3>
                <iframe src="${project.detailContent.videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
    }
    
    // 添加返回主页的链接
    htmlContent += `<a href="../index.html" class="back-link">返回主页</a>`;
    
    detailContainer.innerHTML = htmlContent;
}

// 渲染项目未找到页面
function renderProjectNotFound() {
    const detailContainer = document.getElementById('project-detail-content');
    if (!detailContainer) return;
    
    detailContainer.innerHTML = `
        <h1>项目未找到</h1>
        <p>抱歉，未能找到您要查看的项目详情。</p>
        <a href="../index.html" class="back-link">返回主页</a>
    `;
}

// 工具函数：防抖
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

// 响应式处理
window.addEventListener('resize', debounce(() => {
    // 可以在这里添加响应式调整逻辑
    console.log('窗口大小已改变');
}, 250));

// 页面加载完成后的额外处理
window.addEventListener('load', () => {
    // 页面完全加载后的处理
    console.log('页面加载完成');
});
