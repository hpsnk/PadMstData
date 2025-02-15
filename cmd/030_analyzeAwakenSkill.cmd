@echo off

node ../script/j031_analyzeAwakenSkill.js

node ../script/j032_analyzeSuperAwakenSkill.js

node ../script/j033_combineAwakenSkill.js

if %errorlevel% neq 0 (
    echo [WARN]Check New Awaken Skill!
    cd ..
    exit /b
)