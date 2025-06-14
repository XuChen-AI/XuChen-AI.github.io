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
      // 1. 项目名称
    let htmlContent = `<h1 class="project-title">${project.title}</h1>`;
    
    // 2. 项目背景图片（在标题后面显示）
    htmlContent += `
        <div class="project-background-image">
            <img src="images/${PROJECT_ID}-bg.svg" alt="${project.title} Background" class="project-bg-img" onerror="this.style.display='none'">
        </div>
    `;
    
    // 3. 项目主图片（使用第一张图片作为主图片）
    if (project.detailContent.images && project.detailContent.images.length > 0) {
        const mainImagePath = project.detailContent.images[0];
        htmlContent += `
            <div class="project-main-image">
                <img src="${mainImagePath}" alt="${project.title} Main Image" class="main-project-img" onerror="this.style.display='none'">
            </div>
        `;
    }    // 4. PDF和GitHub图标链接
    htmlContent += renderProjectResources(project);    // 5. 异步加载Markdown文件内容（摘要和方法）
    if (project.detailContent.textFile) {
        htmlContent += '<div id="project-text-content" class="project-text-content"><p>正在加载项目详细描述...</p></div>';
    } else {
        htmlContent += '<div id="project-text-content" class="project-text-content"><p>暂无项目描述</p></div>';
    }

    // 6. 方法框架图
    htmlContent += `
        <div class="methodology-framework">
            <h3>Methodology Framework</h3>
            <div class="framework-image">
                <img src="images/methodology-framework.svg" alt="Methodology Framework" class="framework-img" onerror="this.style.display='none'">
            </div>
        </div>
    `;

    // 7. 示例视频（只显示第一个视频）
    if (project.detailContent.videos && project.detailContent.videos.length > 0) {
        const firstVideo = project.detailContent.videos[0];
        htmlContent += `
            <div class="project-demo-video">
                <h3>Demo Video</h3>
                <div class="video-container">
                    <video controls width="100%" style="max-width: 800px;">
                        <source src="${firstVideo}" type="video/mp4">
                        Your browser does not support video playback.
                    </video>
                </div>
            </div>
        `;
    }

    // 8. 返回主页按键
    htmlContent += `<a href="../../index.html" class="back-link">← Back to Homepage</a>`;
    
    // 设置基础HTML结构
    detailContainer.innerHTML = htmlContent;    // 9. 异步加载Markdown文件内容
    if (project.detailContent.textFile) {
        loadTextFile(project.detailContent.textFile).then(textContent => {
            const textContainer = document.getElementById('project-text-content');
            if (textContainer) {
                if (textContent) {
                    const cleanedContent = removeInlineIcons(textContent);
                    textContainer.innerHTML = markdownToHtml(cleanedContent);
                    console.log('项目文本内容已从Markdown文件加载');
                } else {
                    // 如果无法加载文件，显示默认内容
                    textContainer.innerHTML = markdownToHtml(getDefaultProjectDescription());
                    console.log('使用默认项目描述内容');
                }
            }
        }).catch(error => {
            console.error('加载Markdown文件时出错:', error);
            const textContainer = document.getElementById('project-text-content');
            if (textContainer) {
                textContainer.innerHTML = markdownToHtml(getDefaultProjectDescription());
            }
        });
    }
    
    console.log('项目详情页渲染完成');
}

function renderProjectResources(project) {
    let resourcesHTML = '<div class="project-resources">';
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
        console.log('尝试加载文本文件:', filePath);
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP错误! 状态: ${response.status}`);
        }
        const textContent = await response.text();
        console.log('文本文件加载成功:', filePath);
        console.log('文件内容长度:', textContent.length);
        return textContent;
    } catch (error) {
        console.error(`文本文件加载失败: ${error.message}`);
        // 尝试提供后备内容
        return getDefaultProjectDescription();
    }
}

function getDefaultProjectDescription() {
    return `## Abstract

This project develops an advanced deep learning-based AI-assisted medical imaging diagnosis system to enhance the accuracy and efficiency of early disease detection for healthcare professionals. The system achieves 95%+ diagnostic accuracy with 300% speed improvement over traditional methods.

## Methodology

**Deep Learning Architecture**: End-to-end CNN-RNN hybrid model with attention mechanisms for medical image feature extraction and temporal sequence processing.

**Multi-Modal Data Processing**: Integration of CT, MRI, X-ray, and pathological imaging data through advanced preprocessing and normalization techniques.

**Transfer Learning Strategy**: Pre-trained ImageNet models fine-tuned on medical datasets with domain-specific augmentation strategies.

**Clinical Validation Framework**: 5-fold cross-validation with IRB-approved clinical trials across 3 medical centers involving 500+ patients and 100,000+ annotated images.`;
}

function removeInlineIcons(markdown) {
    // 移除Markdown中的内联图标HTML代码
    return markdown.replace(/<div class="project-icons"[\s\S]*?<\/div>/g, '');
}

function markdownToHtml(markdown) {
    if (!markdown) return '';
    
    // 首先处理多行内容，按双换行符分段
    let html = markdown
        // 处理标题
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // 处理粗体文本
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // 处理列表项
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        // 按段落分割
        .split('\n\n')
        .map(paragraph => {
            paragraph = paragraph.trim();
            if (!paragraph) return '';
            
            // 如果段落包含标题标签，直接返回
            if (paragraph.match(/^<h[1-6]>/)) {
                return paragraph;
            }
            
            // 如果段落包含列表项，包装在ul标签中
            if (paragraph.includes('<li>')) {
                return '<ul>' + paragraph + '</ul>';
            }
            
            // 普通段落包装在p标签中
            return '<p>' + paragraph + '</p>';
        })
        .filter(p => p.length > 0)
        .join('\n');
    
    return html;
}

console.log('Project 1 JavaScript文件加载完成');
