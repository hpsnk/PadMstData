@echo off

@REM // 解析 觉醒
node ../script/j031_analyzeAwakenSkill.js
if %errorlevel% neq 0 (
    echo [WARN]Check New Awaken Skill!
    cd ..
    exit /b
)

@REM // 解析 超觉醒
node ../script/j032_analyzeSuperAwakenSkill.js
if %errorlevel% neq 0 (
    echo [WARN]Check New Super Awaken Skill!
    cd ..
    exit /b
)

@REM // 合并 觉醒，超觉醒
node ../script/j033_combineAwakenSkill.js
if %errorlevel% neq 0 (
    echo [WARN]Check New Awaken Skill!
    cd ..
    exit /b
)

@REM // 附加信息：等效觉醒
node ../script/j034_addAwakenSkillEquivalent.js
if %errorlevel% neq 0 (
    echo [ERROR]Failed in j034_addAwakenSkillEquivalent
    cd ..
    exit /b
)
