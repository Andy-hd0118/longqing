@echo off
chcp 65001 >nul
echo ========================================
echo   信息发布与数据管理平台 - 启动脚本
echo ========================================
echo.
echo 正在检查 Python 是否安装...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Python 已安装
    echo.
    echo 正在启动本地服务器...
    echo 请在浏览器访问: http://localhost:8080
    echo.
    echo 按 Ctrl+C 停止服务器
    echo ========================================
    echo.
    cd src\main\resources\static
    python -m http.server 8080
) else (
    echo ✗ Python 未安装
    echo.
    echo 方法1: 直接双击 index.html 文件打开
    echo 方法2: 安装 Python 后再次运行此脚本
    echo 方法3: 使用 Node.js 的 http-server
    echo.
    pause
)
