@echo off
setlocal enabledelayedexpansion

:: 切换控制台代码页为 UTF-8 并隐藏输出
chcp 65001 > nul

:: 确保工作路径始终以当前脚本所在目录为准
cd /d "%~dp0"

:: 检查是否存在 cmd 目录
if not exist "cmd" (
    echo [ERROR] cmd 目录不存在！
    exit /b 1
)

:: 进入工作目录
cd cmd

:: --------------------------------------------------
:: 依次执行各任务 (步骤编号, 显示名称, 脚本文件名)
:: --------------------------------------------------
call :run_step "010" "Convert Monster start"       "010_convertMonster.cmd" || goto :ERROR
call :run_step "020" "Analyze Monster Type"        "020_analyzeMonsterType.cmd" || goto :ERROR
call :run_step "025" "Analyze Monster Attr"        "025_analyzeMonsterAttr.cmd" || goto :ERROR
call :run_step "030" "Analyze Monster AwakenSkill" "030_analyzeAwakenSkill.cmd" || goto :ERROR
call :run_step "050" "Analyze LeaderSkill"         "050_analyzeLeaderSkill.cmd" || goto :ERROR
call :run_step "060" "Analyze LeaderSkillCategory" "060_analyzeLeaderSkillCategory.cmd" || goto :ERROR
call :run_step "070" "Analyze Skill"               "070_analyzeSkill.cmd" || goto :ERROR
call :run_step "090" "Analyze Collabo"             "090_analyzeCollabo.cmd" || goto :ERROR
call :run_step "100" "Analyze Serie"               "100_analyzeSeries.cmd" || goto :ERROR

:: --------------------------------------------------
:: 执行完成
:: --------------------------------------------------
echo [ALL SUCCESS] 所有任务执行完毕！
cd ..
exit /b 0

:: --------------------------------------------------
:: 子函数：执行单个任务模块
:: --------------------------------------------------
:run_step
set "STEP_NUM=%~1"
set "STEP_NAME=%~2"
set "SCRIPT_FILE=%~3"

echo [%STEP_NUM%] %STEP_NAME% start.

if not exist "%SCRIPT_FILE%" (
    echo [ERROR] 找不到脚本: %SCRIPT_FILE%
    exit /b 1
)

call "%SCRIPT_FILE%"
if !errorlevel! neq 0 (
    echo [ERROR] 010_convertMonster.cmd 执行失败 ^(错误码: !errorlevel!^)
    exit /b 1
)

echo [%STEP_NUM%] %STEP_NAME% end.
echo.
exit /b 0

:: --------------------------------------------------
:: 错误处理入口
:: --------------------------------------------------
:ERROR
echo.
echo [FATAL ERROR] 流程因错误中断！
cd ..

exit /b 1
