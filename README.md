# PadMstData

| 环境变量名                 | 说明        | zzz                         |
| ---                       | ---         | ---                        |
| hpsnk_padmst_master_dir   | 源数据目录   | PADDashFormation的本地目录  |


## 使用环境变量以及json文件

* hpsnk_padmst_offical_json_dir
    * ja-card.json
    * ja-skill.json

## 生成json文件一览

1. monster.json
2. monster_type.json
3. awakenskill.json
4. superawakenskill.json
5. leaderskill.json
6. leaderskillcategory.json
7. skill.json
8. skillcategory.json
9. collabo.json
10. series.json

----

* [机能别入出力一览](./docs/010_IF.md)

----

# 机能别状态一览

| xx                                  | yy   |
| ----------------------------------- | ---- |
| j010_convertMonsterToJson.js        | yy   |
| j020_analyzeMonsterType.js          | yy   |
| j025_analyzeMonsterAttr.js          | yy   |

| j030_analyzeAwakenSkill.js          | yy   |
| j040_analyzeSuperAwakenSkill.js     | yy   |

| j031_analyzeAwakenSkill.js          | yy   |
| j032_analyzeSuperAwakenSkill.js     | yy   |
| j033_combineAwakenSkill.js          | yy   |

| j050_analyzeLeaderSkill.js          | yy   |
| j060_analyzeLeaderSkillCategory.js  | yy   |
| j070_analyzeSkill.js                | ing  |
| j080_analyzeSkillCategory.js        | yy   |
| j090_analyzeCollabo.js              | over |
| j100_analyzeSeries.js               | yy  |
