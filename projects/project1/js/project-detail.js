/**
 * ==========================================
 * Project 1 Detail Page JavaScript
 * ==========================================
 * 
 * 项目一详情页专用JavaScript文件
 * 功能：渲染项目详情页内容和交互功能
 */

/* ==========================================
 * 全局变量
 * ==========================================
 */

let config = null;
const PROJECT_ID = 'project1';

/* ==========================================
 * 页面初始化
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Project 1 详情页开始初始化...');
    loadConfig().then(() => {
        initializeProjectPage();
    }).catch(() => {
        console.warn('无法加载配置文件，使用默认配置');
        useDefaultConfig();
        initializeProjectPage();
    });
});

/* ==========================================
 * 配置管理
 * ==========================================
 */

async function loadConfig() {
    try {
        const response = await fetch('../../config/config.json');
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

function useDefaultConfig() {
    config = {
        projects: [{
            id: PROJECT_ID,
            title: 'AI-Assisted Medical Diagnosis System',
            detailContent: {
                images: ['images/demo1.svg', 'images/architecture.svg'],
                videos: ['videos/demo_video.mp4'],
                textFile: 'texts/description.md',
                githubUrl: 'https://github.com/your-username/ai-diagnosis-system',
                tags: ['Deep Learning', 'Medical Imaging', 'AI Diagnosis']
            }
        }]
    };
}

/* ==========================================
 * 页面渲染
 * ==========================================
 */

function initializeProjectPage() {
    const project = config.projects.find(p => p.id === PROJECT_ID);
    if (project) {
        renderProjectDetails(project);
    } else {
        renderProjectNotFound();
    }
}

function renderProjectDetails(project) {
    const detailContainer = document.getElementById('project-detail-content');
    if (!detailContainer) {
        console.error('未找到项目详情容器元素');
        return;
    }

    console.log('开始渲染项目详情:', project.title);
    
    // 更新页面标题
    document.title = project.title + " - Project Details";
    
    let htmlContent = `<h1>${project.title}</h1>`;
    
    // 添加项目背景图片
    const projectBgPath = `images/${PROJECT_ID}-bg.svg`;
    htmlContent += `
        <div class="project-background-image">
            <img src="${projectBgPath}" alt="${project.title} Background Image" class="project-bg-img" onerror="this.style.display='none'">
        </div>
    `;

    // 添加项目标签
    if (project.detailContent.tags && project.detailContent.tags.length > 0) {
        htmlContent += '<div class="project-tags">';
        project.detailContent.tags.forEach(tag => {
            htmlContent += `<span class="tag">${tag}</span>`;
        });
        htmlContent += '</div>';
    }

    // 添加项目图片
    if (project.detailContent.images && project.detailContent.images.length > 0) {
        htmlContent += '<div class="project-images">';
        project.detailContent.images.forEach(imgPath => {
            htmlContent += `<img src="${imgPath}" alt="${project.title}详情图片" onerror="this.style.display='none'">`;
        });
        htmlContent += '</div>';
    }

    // 异步加载文本内容
    if (project.detailContent.textFile) {
        htmlContent += '<div id="project-text-content" class="project-text-content"></div>';
        
        loadTextFile(project.detailContent.textFile).then(textContent => {
            if (textContent) {
                const textContainer = document.getElementById('project-text-content');
                if (textContainer) {
                    // 移除文本中的内联图标HTML（我们将在页面中直接显示）
                    const cleanedContent = removeInlineIcons(textContent);
                    textContainer.innerHTML = markdownToHtml(cleanedContent);
                    console.log('项目文本内容已从Markdown文件加载');
                }
            }
        });
    }

    // 添加本地视频
    if (project.detailContent.videos && project.detailContent.videos.length > 0) {
        htmlContent += '<div class="project-videos"><h3>Project Demo Videos</h3>';
        project.detailContent.videos.forEach((videoPath, index) => {
            htmlContent += `
                <div class="video-container">
                    <video controls width="100%" style="max-width: 800px;">
                        <source src="${videoPath}" type="video/mp4">
                        Your browser does not support video playback.
                    </video>
                    <p class="video-caption">Video ${index + 1}: ${videoPath.split('/').pop()}</p>
                </div>
            `;
        });
        htmlContent += '</div>';
    }

    // 添加项目资源图标（直接在网页中显示，不在MD文件中）
    htmlContent += renderProjectResources(project);

    // 添加YouTube视频
    if (project.detailContent.videoUrl) {
        htmlContent += `
            <div class="project-video-container">
                <h3>Online Demo Video</h3>
                <iframe src="${project.detailContent.videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
    }

    // 添加返回主页链接
    htmlContent += `<a href="../../index.html" class="back-link">Back to Homepage</a>`;
    
    detailContainer.innerHTML = htmlContent;
    console.log('项目详情页渲染完成');
}

function renderProjectResources(project) {
    let resourcesHTML = '<div class="project-resources">';
    resourcesHTML += '<h3>Project Resources</h3>';
    resourcesHTML += '<div class="resource-icons">';

    // PDF图标 - 链接到项目的pdfs文件夹
    resourcesHTML += `
        <div class="resource-item">
            <a href="pdfs/" target="_blank" class="resource-link" title="View Project PDFs">
                <img src="icons/pdf-icon.svg" alt="PDF" class="resource-icon">
                <span>Research Papers</span>
            </a>
        </div>
    `;

    // GitHub图标
    if (project.detailContent.githubUrl) {
        resourcesHTML += `
            <div class="resource-item">
                <a href="${project.detailContent.githubUrl}" target="_blank" class="resource-link" title="View Source Code">
                    <img src="icons/github-icon.svg" alt="GitHub" class="resource-icon">
                    <span>Source Code</span>
                </a>
            </div>
        `;
    }

    // 方法论框架图
    resourcesHTML += `
        <div class="resource-item">
            <a href="images/methodology-framework.svg" target="_blank" class="resource-link" title="View Methodology Framework">
                <svg viewBox="0 0 24 24" class="resource-icon methodology-icon" fill="currentColor">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM5 19V5H19V19H5ZM17 12H15V17H17V12ZM13 7H11V17H13V7ZM9 10H7V17H9V10Z"/>
                </svg>
                <span>Methodology</span>
            </a>
        </div>
    `;

    resourcesHTML += '</div>';
    resourcesHTML += '</div>';
    
    return resourcesHTML;
}

function renderProjectNotFound() {
    const detailContainer = document.getElementById('project-detail-content');
    if (!detailContainer) return;
    
    detailContainer.innerHTML = `
        <h1>Project Not Found</h1>
        <p>Sorry, we couldn't find the project details you're looking for.</p>
        <a href="../../index.html" class="back-link">Back to Homepage</a>
    `;
    document.title = "Project Not Found";
}

/* ==========================================
 * 工具函数
 * ==========================================
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

function removeInlineIcons(markdown) {
    // 移除Markdown中的内联图标HTML代码
    return markdown.replace(/<div class="project-icons"[\s\S]*?<\/div>/g, '');
}

function markdownToHtml(markdown) {
    if (!markdown) return '';
    
    return markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[h|u|l])(.*)$/gim, '<p>$1</p>')
        .replace(/<p><\/p>/g, '')
        .replace(/<p>(<[h|u])/g, '$1')
        .replace(/(<\/[h|u][^>]*>)<\/p>/g, '$1');
}

console.log('Project 1 JavaScript文件加载完成');
