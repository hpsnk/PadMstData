@echo off
setlocal enabledelayedexpansion

:: 切换工作路径到当前脚本所在目录
cd /d "%~dp0"

node ../script/j025_analyzeMonsterAttr.js

:: 显式检查并抛出异常码
if %errorlevel% neq 0 (
    echo [ERROR] JS 脚本执行失败，错误码: %errorlevel%
    exit /b %errorlevel%
)

echo [SUCCESS] 执行成功！
exit /b 0
