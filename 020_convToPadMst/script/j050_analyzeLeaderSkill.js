//--------------------------------
// analyzeLeaderSkill.js
//--------------------------------
const fs = require("fs");
const SkillOfficial = require("../../010_officialData/parseSkill");

// check 环境变量
if (process.env.hpsnk_padmst_offical_json_dir == undefined) {
  console.error("  Set System Environment First.");
  console.error("    hpsnk_padmst_offical_json_dir");
  process.exit(1);
}

console.log("analyzeLeaderSkill-->start.");

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
let arrayOfficalLeaderSkill = jsonOfficalSkill.skill.filter((os, idx) => {
  return uniqueArrayId.includes(idx);
}).map((os, idx) => {
  let objSkillOfficial = new SkillOfficial(os);
  return {
    leaderskillId: idx,
    name: objSkillOfficial.name,
    gameDesc: objSkillOfficial.description,
    type: objSkillOfficial.type,
  }
});

// 保存到 leaderskill.json
fs.writeFileSync("json/leaderskill.json", JSON.stringify(arrayOfficalLeaderSkill));

console.log("  LeaderSkill Size = %d.", arrayOfficalLeaderSkill.length);

console.log("analyzeLeaderSkill-->end.");
