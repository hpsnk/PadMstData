//--------------------------------
// analyzeSkill.js
//--------------------------------
const AppUtil   = require("./common/AppUtil.js");

const fs = require("fs");
const SkillOfficial = require("./PADDashFormation/parseSkill.js");
const PadMstSkill   = require("./PadMstSkill.js");

const logger = require('../util/Logger.js');

//----------------------------------------------------------------
// 获取批处理传入的第一个参数
const execProgram = process.argv[2];

// check 环境变量
if (process.env.hpsnk_padmst_master_dir == undefined) {
  logger.error(execProgram, "Set System Environment['hpsnk_padmst_master_dir'] First.");
  process.exit(1);
}

logger.info(execProgram, "Analyze Skill-->start.")

// let DATA_DIR = process.env.hpsnk_padmst_offical_json_dir;
let DATA_DIR = AppUtil.getInJsonDir();
logger.debug(execProgram, `Using data dir: ${DATA_DIR}.`)

// 读取 monster 信息
const strMonster = fs.readFileSync(
  "../json/monster.json",
  "utf-8",
);

const jsonMonster = JSON.parse(strMonster);
logger.info(execProgram, `PadMst Monster Size = ${jsonMonster.length}.`)

// 获取所有 skillId
let arrayId = jsonMonster.map((monster, idx) => {
  return monster.skillId;
});

// skillId 去重
let uniqueArrayId = Array.from(new Set(arrayId.flat(Infinity))).sort(function(a,b){
  return a-b;
});
logger.info(execProgram, `Skill Size = ${uniqueArrayId.length}.`)

// 读取 offical skill json
const strOfficalSkill = fs.readFileSync(
  DATA_DIR + "/ja-skill.json",
  "utf-8",
);
const jsonOfficalSkill = JSON.parse(strOfficalSkill);
logger.info(execProgram, `Offical Skill Size = ${jsonOfficalSkill.skill.length}.`)

// 
let arrayPadMstSkill = jsonOfficalSkill.skill.map((os, idx) => {  
  let objSkillOfficial = new SkillOfficial(idx, os);

  let objPadMstSkill = new PadMstSkill(objSkillOfficial);
  // 添加 padmst 格式属性: skillId
  objPadMstSkill.skillId = idx;
  
  // 添加 padmst 格式属性: types
  objPadMstSkill.types = [objPadMstSkill.type];

  return objPadMstSkill;
}).filter((os, idx) => {
  return uniqueArrayId.includes(os.skillId);
});

// 保存到 leaderskill.json
fs.writeFileSync("../json/skill.json", JSON.stringify(arrayPadMstSkill));

logger.info(execProgram, `Skill Size = ${arrayPadMstSkill.length}.`)

logger.info(execProgram, "Analyze Skill-->end.")
