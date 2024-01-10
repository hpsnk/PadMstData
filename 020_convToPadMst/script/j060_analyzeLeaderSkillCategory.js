//--------------------------------
// analyzeLeaderSkillCategory.js
//--------------------------------
const fs = require("fs");

console.log("analyzeLeaderSkillCategory-->start.");

// 读取 leaderskill 信息
const strLeaderskill = fs.readFileSync(
  "json/leaderskill.json",
  "utf-8",
);

const jsonLeaderskill = JSON.parse(strLeaderskill);
console.log("  Leaderskill size = %d.", jsonLeaderskill.length);

let arrayTpye = jsonLeaderskill.map((ls, idx) => {
  return ls.type;
});

let arrayUniqueType = Array.from(new Set(arrayTpye.flat(Infinity))).sort(function(a,b){
  return a-b;
});

console.log("  LeaderskillCategory size = %d.", arrayUniqueType.length);

// TODO

process.exit(0);

// 获取所有 leaderskillId
let arrayId = jsonMonster.map((monster, idx) => {
  return monster.leaderskillId;
});

// leaderskillId 去重
let uniqueArrayId = Array.from(new Set(arrayId.flat(Infinity))).sort(function(a,b){
  return a-b;
});
console.log("  LeaderSkill size = %d.", uniqueArrayId.length);

console.log("");



// 读取 offical skill json
const strOfficalSkill = fs.readFileSync(
  DATA_DIR + "/ja-skill.json",
  "utf-8",
);
const jsonOfficalSkill = JSON.parse(strOfficalSkill);
console.log("  OfficalSkill size = %d.", jsonOfficalSkill.skill.length);


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

console.log("  arrayLeaderSkill size = %d.", arrayOfficalLeaderSkill.length);

console.log("analyzeLeaderSkill-->end.");
