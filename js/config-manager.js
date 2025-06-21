/**
 * ==========================================
 * 配置管理工具 (config-manager.js)
 * ==========================================
 * 
 * 功能：统一管理主配置和项目配置的加载与缓存
 * 简化配置文件的管理逻辑
 */

class ConfigManager {
    constructor() {
        this.mainConfig = null;
        this.projectConfigs = new Map();
    }

    /**
     * 加载主配置文件
     * @returns {Promise<Object>} 主配置对象
     */
    async loadMainConfig() {
        if (this.mainConfig) {
            return this.mainConfig;
        }

        try {
            const response = await fetch('config/config.json');
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态: ${response.status}`);
            }
            this.mainConfig = await response.json();
            console.log('主配置文件加载成功');
            return this.mainConfig;
        } catch (error) {
            console.error('主配置文件加载失败:', error);
            throw error;
        }
    }

    /**
     * 加载项目配置文件
     * @param {string} projectId - 项目ID
     * @returns {Promise<Object>} 项目配置对象
     */
    async loadProjectConfig(projectId) {
        if (this.projectConfigs.has(projectId)) {
            return this.projectConfigs.get(projectId);
        }

        try {
            const response = await fetch(`projects/${projectId}/config/config.json`);
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态: ${response.status}`);
            }
            const config = await response.json();
            this.projectConfigs.set(projectId, config);
            console.log(`项目 ${projectId} 配置文件加载成功`);
            return config;
        } catch (error) {
            console.error(`项目 ${projectId} 配置文件加载失败:`, error);
            throw error;
        }
    }

    /**
     * 获取所有项目的基本信息（用于主页显示）
     * @returns {Promise<Array>} 项目信息数组
     */
    async getAllProjectsInfo() {
        const mainConfig = await this.loadMainConfig();
        const projectsInfo = [];

        for (const projectRef of mainConfig.projects) {
            try {
                const projectConfig = await this.loadProjectConfig(projectRef.id);
                projectsInfo.push({
                    ...projectConfig.projectInfo,
                    detailPageUrl: projectRef.detailPageUrl
                });
            } catch (error) {
                console.warn(`跳过项目 ${projectRef.id}:`, error.message);
                // 添加错误占位项目
                projectsInfo.push({
                    id: projectRef.id,
                    title: `项目 ${projectRef.id} (配置错误)`,
                    shortDescription: '配置文件加载失败',
                    thumbnailUrl: '',
                    detailPageUrl: projectRef.detailPageUrl,
                    error: true
                });
            }
        }

        return projectsInfo;
    }

    /**
     * 清除缓存
     */
    clearCache() {
        this.mainConfig = null;
        this.projectConfigs.clear();
        console.log('配置缓存已清除');
    }
}

// 创建全局配置管理器实例
const configManager = new ConfigManager();

// 导出给其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConfigManager;
}
