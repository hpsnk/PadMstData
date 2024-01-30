@echo off

cd 020_convToPadMst

@REM 010_convertMonster
call cmd /c 010_convertMonster.cmd
if %errorlevel% neq 0 (
    echo "010_convertMonster failed"
)

@REM 020_analyzeMonsterType
call cmd /c 020_analyzeMonsterType.cmd
if %errorlevel% neq 0 (
    echo "020_analyzeMonsterType failed"
)

@REM 030_analyzeAwakenSkill
call cmd /c 030_analyzeAwakenSkill.cmd
if %errorlevel% neq 0 (
    echo "030_analyzeAwakenSkill failed"
)

@REM 040_analyzeSuperAwakenSkill
call cmd /c 040_analyzeSuperAwakenSkill.cmd
if %errorlevel% neq 0 (
    echo "040_analyzeSuperAwakenSkill failed"
)

@REM 050_analyzeLeaderSkill
call cmd /c 050_analyzeLeaderSkill.cmd
if %errorlevel% neq 0 (
    echo "050_analyzeLeaderSkill failed"
)

@REM 060_analyzeLeaderSkillCategory
call cmd /c 060_analyzeLeaderSkillCategory.cmd
if %errorlevel% neq 0 (
    echo "060_analyzeLeaderSkillCategory failed"
)

@REM 070_analyzeSkill
call cmd /c 070_analyzeSkill.cmd
if %errorlevel% neq 0 (
    echo "070_analyzeSkill failed"
)

@REM 090_analyzeCollabo
call cmd /c 090_analyzeCollabo.cmd
if %errorlevel% neq 0 (
    echo "090_analyzeCollabo failed"
)

cd ..
