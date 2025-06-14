@echo off
:: 个人学术主页快速启动脚本
:: 自动检测Python版本并启动HTTP服务器

echo ========================================
echo 个人学术主页 - 本地测试服务器启动器
echo ========================================
echo.

:: 检查Python是否安装
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到Python，请先安装Python
    echo 下载地址: https://www.python.org/downloads/
    pause
    exit /b 1
)

:: 显示Python版本
echo [信息] 检测到Python版本:
python --version

:: 检查当前目录是否包含index.html
if not exist "index.html" (
    echo [错误] 请在包含index.html的目录中运行此脚本
    pause
    exit /b 1
)

echo.
echo [信息] 正在启动HTTP服务器...
echo [信息] 服务器地址: http://localhost:8000
echo [信息] 按 Ctrl+C 可停止服务器
echo.

:: 启动HTTP服务器
python -m http.server 8000

pause
