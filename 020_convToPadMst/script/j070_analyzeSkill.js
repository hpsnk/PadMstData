//--------------------------------
// analyzeSkill.js
//--------------------------------
const fs = require("fs");
const SkillOfficial = require("../../010_officialData/parseSkill");
const PadMstSkill   = require("./PadMstSkill");

// check 环境变量
if (process.env.hpsnk_padmst_offical_json_dir == undefined) {
  console.error("  Set System Environment First.");
  console.error("    hpsnk_padmst_offical_json_dir");
  process.exit(1);
}

console.log("analyzeSkill-->start.");

let DATA_DIR = process.env.hpsnk_padmst_offical_json_dir;
console.log("  USING DATA DIR:");
console.log("    %s", DATA_DIR);

// 读取 monster 信息
const strMonster = fs.readFileSync(
  "json/monster.json",
  "utf-8",
);

const jsonMonster = JSON.parse(strMonster);
console.log("  PadMst Monster Size = %d.", jsonMonster.length);

// 获取所有 skillId
let arrayId = jsonMonster.map((monster, idx) => {
  return monster.skillId;
});

// skillId 去重
let uniqueArrayId = Array.from(new Set(arrayId.flat(Infinity))).sort(function(a,b){
  return a-b;
});
console.log("  Skill Size = %d.", uniqueArrayId.length);
// console.log("");


// 读取 offical skill json
const strOfficalSkill = fs.readFileSync(
  DATA_DIR + "/ja-skill.json",
  "utf-8",
);
const jsonOfficalSkill = JSON.parse(strOfficalSkill);
console.log("  Offical Skill Size = %d.", jsonOfficalSkill.skill.length);


// 
let arrayPadMstSkill = jsonOfficalSkill.skill.map((os, idx) => {
  let objSkillOfficial = new SkillOfficial(os);

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
fs.writeFileSync("json/skill.json", JSON.stringify(arrayPadMstSkill));

console.log("  Skill Size = %d.", arrayPadMstSkill.length);

console.log("analyzeSkill-->end.");
