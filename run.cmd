@echo off

cd cmd

@REM 010_convertMonster
@REM ---------------------------------------
echo [010]Convert Monster start.
call cmd /c 010_convertMonster.cmd
if %errorlevel% neq 0 (
    echo "010_convertMonster failed"
    cd ..
    exit /b
) 
echo [010]Convert Monster end.
echo .

@REM 020_analyzeMonsterType
@REM ---------------------------------------
echo [020]Analyze Monster Type start.
call cmd /c 020_analyzeMonsterType.cmd
if %errorlevel% neq 0 (
    echo "020_analyzeMonsterType failed"
    cd ..
    exit /b
)
echo [020]Analyze Monster Type end.
echo .

@REM 025_analyzeMonsterAttr
@REM ---------------------------------------
echo [025]Analyze Monster Attr start.
call cmd /c 025_analyzeMonsterAttr.cmd
if %errorlevel% neq 0 (
    echo "025_analyzeMonsterAttr failed"
    cd ..
    exit /b
)
echo [025]Analyze Monster Attr end.
echo .


@REM 030_analyzeAwakenSkill
@REM ---------------------------------------
echo [030]Analyze Monster AwakenSkill start.
call cmd /c 030_analyzeAwakenSkill.cmd
if %errorlevel% neq 0 (
    echo "030_analyzeAwakenSkill failed"
    cd ..
    exit /b
)
echo [030]Analyze Monster AwakenSkill end.
echo .


@REM 合并030里了
@REM 040_analyzeSuperAwakenSkill
@REM call cmd /c 040_analyzeSuperAwakenSkill.cmd
@REM if %errorlevel% neq 0 (
@REM     echo "040_analyzeSuperAwakenSkill failed"
@REM )


@REM 050_analyzeLeaderSkill
@REM ---------------------------------------
echo [050]Analyze LeaderSkill start.
call cmd /c 050_analyzeLeaderSkill.cmd
if %errorlevel% neq 0 (
    echo "050_analyzeLeaderSkill failed"
    cd ..
    exit /b
)
echo [050]Analyze LeaderSkill end.
echo .


@REM 060_analyzeLeaderSkillCategory
@REM ---------------------------------------
echo [060]Analyze LeaderSkillCategory start.
call cmd /c 060_analyzeLeaderSkillCategory.cmd
if %errorlevel% neq 0 (
    echo "060_analyzeLeaderSkillCategory failed"
    cd ..
    exit /b
)
echo [060]Analyze LeaderSkillCategory end.
echo .


@REM 070_analyzeSkill
@REM ---------------------------------------
echo [070]Analyze Skill start.
call cmd /c 070_analyzeSkill.cmd
if %errorlevel% neq 0 (
    echo "070_analyzeSkill failed"
    cd ..
    exit /b
)
echo [070]Analyze Skill end.
echo .


@REM 090_analyzeCollabo
@REM ---------------------------------------
echo [090]Analyze Collabo start.
call cmd /c 090_analyzeCollabo.cmd
if %errorlevel% neq 0 (
    echo "090_analyzeCollabo failed"
    cd ..
    exit /b
)
echo [090]Analyze Collabo end.
echo .

cd ..
