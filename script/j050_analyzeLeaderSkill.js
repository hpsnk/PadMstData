//--------------------------------
// analyzeLeaderSkill.js
//--------------------------------
const AppUtil   = require("./common/AppUtil.js");

const fs = require("fs");
const SkillOfficial = require("./PADDashFormation/parseSkill");
const PadMstSkill   = require("./PadMstSkill");

// check 环境变量
// if (process.env.hpsnk_padmst_offical_json_dir == undefined) {
//   console.error("  Set System Environment First.");
//   console.error("    hpsnk_padmst_offical_json_dir");
//   process.exit(1);
// }

console.log("analyzeLeaderSkill-->start.");

// let DATA_DIR = process.env.hpsnk_padmst_offical_json_dir;
let DATA_DIR = AppUtil.getInJsonDir();
console.log("  USING DATA DIR:");
console.log("    %s", DATA_DIR);

// 读取 monster 信息
const strMonster = fs.readFileSync(
  "../json/monster.json",
  "utf-8",
);

const jsonMonster = JSON.parse(strMonster);
console.log("  PadMst Monster Size = %d.", jsonMonster.length);

// 获取所有 leaderskillId
let arrayId = jsonMonster.map((monster, idx) => {
  return monster.leaderskillId;
});

// leaderskillId 去重
let uniqueArrayId = Array.from(new Set(arrayId.flat(Infinity))).sort(function(a,b){
  return a-b;
});
console.log("  LeaderSkill Size = %d.", uniqueArrayId.length);
// console.log("");


// 读取 offical skill json
const strOfficalSkill = fs.readFileSync(
  DATA_DIR + "/ja-skill.json",
  "utf-8",
);
const jsonOfficalSkill = JSON.parse(strOfficalSkill);
console.log("  Offical Skill Size = %d.", jsonOfficalSkill.skill.length);


// offical skill��û��ID 
// ���� leaderskillId ����
let arrayPadMstLeaderSkill = jsonOfficalSkill.skill.map((os, idx) => {
  // console.log("  Offical Skill Index = %d.", idx);
  // console.log(os);
  let objSkillOfficial = new SkillOfficial(idx, os);

  let objPadMstSkill = new PadMstSkill(objSkillOfficial);
  // 添加 padmst 格式属性: leaderskillId
  objPadMstSkill.leaderskillId = idx;
  
  // 添加 padmst 格式属性: types
  objPadMstSkill.types = [objPadMstSkill.type];

  return objPadMstSkill;
}).filter((os, idx) => {
  return uniqueArrayId.includes(os.leaderskillId);
});

// 保存到 leaderskill.json
fs.writeFileSync("../json/leaderskill.json", JSON.stringify(arrayPadMstLeaderSkill));

console.log("  LeaderSkill Size = %d.", arrayPadMstLeaderSkill.length);

console.log("analyzeLeaderSkill-->end.");
