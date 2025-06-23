/**
 * ==========================================
 * Academic Homepage JavaScript (script.js)
 * ==========================================
 * 
 * Author: Xu Chen
 * Version: 4.0
 * Last Modified: 2025年6月21日
 * 
 * Description:
 * Clean, minimal JavaScript for academic homepage
 * Only contains main page functionality
 * Projects display with GitHub links only
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
        const yamlText = await response.text();
        const yamlData = jsyaml.load(yamlText);
        
        // Convert YAML structure to expected format
        return {
            projectInfo: {
                title: yamlData.title,
                shortDescription: yamlData.description
            },
            links: {
                githubUrl: yamlData.github
            }
        };
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
    
    const projectContent = document.createElement('div');
    projectContent.classList.add('project-content');
    
    const thumbnail = document.createElement('img');
    thumbnail.src = projectRef.imagePath || '';
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
    
    // Create GitHub link if available
    let githubLink = null;
    if (projectConfig.links && projectConfig.links.githubUrl) {
        githubLink = document.createElement('a');
        githubLink.href = projectConfig.links.githubUrl;
        githubLink.textContent = 'GitHub';
        githubLink.classList.add('github-link');
        githubLink.target = '_blank';
        githubLink.rel = 'noopener noreferrer';
    }
    
    projectInfo.appendChild(title);
    projectInfo.appendChild(description);
    if (githubLink) {
        projectInfo.appendChild(githubLink);
    }
    
    projectContent.appendChild(thumbnail);
    projectContent.appendChild(projectInfo);
    projectCard.appendChild(projectContent);
    
    return projectCard;
}

function createErrorProjectCard(projectRef) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    
    const projectContent = document.createElement('div');
    projectContent.classList.add('project-content');
    
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
    projectContent.appendChild(projectInfo);
    projectCard.appendChild(projectContent);
    
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
    ctx.font = '14px Arial, sans-serif';
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
