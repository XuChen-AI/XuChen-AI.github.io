/**
 * ==========================================
 * Academic Homepage JavaScript (script.js)
 * ==========================================
 * 
 * Author: Dr. Xu Chen
 * Version: 3.0
 * Last Modified: 2025年6月21日
 * 
 * Description:
 * Clean, minimal JavaScript for academic homepage
 * Focuses on content loading and basic functionality
 * Removed decorative elements for academic simplicity
 */

/* ==========================================
 * Global Variables
 * ==========================================
 */

let config = null;

/* ==========================================
 * Page Initialization
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', async function() {
    try {
        await loadConfig();
        await initializePage();
    } catch (error) {
        console.warn('Failed to load config, using defaults');
        useDefaultConfig();
        await initializePage();
    }
});

/* ==========================================
 * Configuration Management
 * ==========================================
 */

async function loadConfig() {
    try {
        const response = await fetch('config/config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        config = await response.json();
        console.log('Configuration loaded successfully');
    } catch (error) {
        console.error('Failed to load configuration:', error);
        throw error;
    }
}

function useDefaultConfig() {
    config = {
        personalInfo: {
            userName: "Your Name",
            userBio: "Your academic bio and research interests.",
            avatarImageUrl: "assets/images/avatar.svg"
        },
        projects: []
    };
}

/* ==========================================
 * Page Content Initialization
 * ==========================================
 */

async function initializePage() {
    console.log('Initializing page...');
    
    updatePersonalInfo();
    await loadProjects();
    updateFooter();
    
    console.log('Page initialization complete');
}

function updatePersonalInfo() {
    if (!config || !config.personalInfo) {
        console.warn('Personal info configuration missing');
        return;
    }
    
    const { personalInfo } = config;
    
    // Update user name
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = personalInfo.userName;
    }
      // Update bio
    const userBioElement = document.getElementById('user-bio');
    if (userBioElement) {
        userBioElement.innerHTML = personalInfo.userBio;
    }
    
    // Update avatar
    const avatarElement = document.getElementById('avatar');
    if (avatarElement) {
        avatarElement.src = personalInfo.avatarImageUrl;
        avatarElement.alt = personalInfo.userName + "'s photo";
        
        avatarElement.onerror = function() {
            console.warn('Avatar image failed to load');
            this.src = generatePlaceholderImage('Avatar', 120, 120);
        };
    }
    
    // Update page title
    if (config.siteSettings && config.siteSettings.title) {
        document.title = config.siteSettings.title;
    }
}

/* ==========================================
 * Projects Display
 * ==========================================
 */

async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) {
        console.warn('Projects grid container not found');
        return;
    }
    
    if (!config.projects || config.projects.length === 0) {
        console.warn('No projects to display');
        projectsGrid.innerHTML = '<p style="text-align: center; color: #7f8c8d; font-style: italic;">No projects available</p>';
        return;
    }
    
    projectsGrid.innerHTML = '';
    
    for (const projectRef of config.projects) {
        try {
            const projectConfig = await loadProjectConfig(projectRef.configPath);
            const projectCard = createProjectCard(projectConfig, projectRef);
            projectsGrid.appendChild(projectCard);
            console.log(`Project card created: ${projectConfig.projectInfo.title}`);
        } catch (error) {
            console.error(`Failed to load project config (${projectRef.id}):`, error);
            const errorCard = createErrorProjectCard(projectRef);
            projectsGrid.appendChild(errorCard);
        }
    }
    
    console.log(`Successfully loaded ${config.projects.length} projects`);
}

async function loadProjectConfig(configPath) {
    try {
        const response = await fetch(configPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to load project config: ${configPath}`, error);
        throw error;
    }
}

function createProjectCard(projectConfig, projectRef) {
    if (!projectConfig || !projectConfig.projectInfo || !projectConfig.projectInfo.title) {
        throw new Error('Invalid project data: missing required fields');
    }
    
    const project = projectConfig.projectInfo;
    
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    
    const projectLink = document.createElement('a');
    projectLink.href = projectRef.detailPageUrl || `projects/${project.id}/index.html`;
    projectLink.setAttribute('aria-label', `View project: ${project.title}`);
    
    const thumbnail = document.createElement('img');
    thumbnail.src = `projects/${project.id}/${project.thumbnailUrl}` || '';
    thumbnail.alt = project.title + ' thumbnail';
    thumbnail.classList.add('project-thumbnail');
    
    thumbnail.onerror = function() {
        console.warn(`Project thumbnail failed to load: ${project.title}`);
        this.src = generatePlaceholderImage('Project Image', 160, 100);
    };
    
    const projectInfo = document.createElement('div');
    projectInfo.classList.add('project-info');
    
    const title = document.createElement('h3');
    title.textContent = project.title;
    
    const description = document.createElement('p');
    description.textContent = project.shortDescription || 'No description available';
    
    projectInfo.appendChild(title);
    projectInfo.appendChild(description);
    projectLink.appendChild(thumbnail);
    projectLink.appendChild(projectInfo);
    projectCard.appendChild(projectLink);
    
    return projectCard;
}

/**
 * 创建错误项目卡片（当项目配置加载失败时使用）
 * @param {Object} projectRef - 项目引用对象
 * @returns {HTMLElement} 错误卡片DOM元素
 */
function createErrorProjectCard(projectRef) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card', 'error-card');
    
    const projectInfo = document.createElement('div');
    projectInfo.classList.add('project-info');
    
    const title = document.createElement('h3');
    title.textContent = `项目 ${projectRef.id}`;
    
    const description = document.createElement('p');
    description.textContent = '项目配置加载失败';
    description.style.color = '#e74c3c';
    
    projectInfo.appendChild(title);
    projectInfo.appendChild(description);
    projectCard.appendChild(projectInfo);
    
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
 * 工具函数
 * ==========================================
 */

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
function createErrorProjectCard(projectRef) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    
    const projectInfo = document.createElement('div');
    projectInfo.classList.add('project-info');
    projectInfo.style.textAlign = 'center';
    projectInfo.style.padding = '20px';
    
    const title = document.createElement('h3');
    title.textContent = 'Project Unavailable';
    title.style.color = '#e74c3c';
    
    const description = document.createElement('p');
    description.textContent = 'Unable to load project information';
    
    projectInfo.appendChild(title);
    projectInfo.appendChild(description);
    projectCard.appendChild(projectInfo);
    
    return projectCard;
}

/* ==========================================
 * Utility Functions
 * ==========================================
 */

function generatePlaceholderImage(text, width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#ecf0f1';
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = '#7f8c8d';
    ctx.font = '14px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText(text, width / 2, height / 2 + 5);
    
    return canvas.toDataURL();
}

function updateFooter() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}
