//--------------------------------
// analyzeLeaderSkill.js
//--------------------------------
const fs = require("fs");
const SkillOfficial = require("../parseOfficialJson/parseSkill");

let DATA_DIR = '';
if (process.argv.length>2) {
  DATA_DIR = process.argv[2];
}

console.log("analyzeLeaderSkill-->start.");

const strMonster = fs.readFileSync(
  "json/monster.json",
  "utf-8",
);

const jsonMonster = JSON.parse(strMonster);
console.log("  Monster size = %d.", jsonMonster.length);

let arrayId = jsonMonster.map((monster, idx) => {
  return monster.leaderskillId;
});
console.log("  LeaderSkill size = %d.", arrayId.length);

let uniqueArray = Array.from(new Set(arrayId.flat(Infinity))).sort(function(a,b){
  return a-b;
});
console.log("  LeaderSkill size = %d.", uniqueArray.length);

// 读取 offical skill json
const strOfficalSkill = fs.readFileSync(
  DATA_DIR + "/ja-skill.json",
  "utf-8",
);

const jsonOfficalSkill = JSON.parse(strOfficalSkill);
console.log("  OfficalSkill size = %d.", jsonOfficalSkill.skill.length);

console.log("");

// offical skill，没有ID 
// 增加 leaderskillId 属性
let arrayOfficalSkillWithId = jsonOfficalSkill.skill.map((os, idx) => {
  let objSkillOfficial = new SkillOfficial(os);
  return {
    leaderskillId: idx,
    name: objSkillOfficial.name,
    gameDesc: objSkillOfficial.description,
    type: objSkillOfficial.type,
  }
});
console.log("  arrayOfficalSkillWithId size = %d.", arrayOfficalSkillWithId.length);


// 过滤 对象 leader skill
let filteredSkill = arrayOfficalSkillWithId.filter(os => {
  return uniqueArray.includes(os.leaderskillId);
});
console.log("  filteredSkill size = %d.", filteredSkill.length);

console.log("  filteredSkill size = %o.", filteredSkill[1]);
console.log("  filteredSkill size = %o.", filteredSkill[5879]);



// let arrayType = uniqueArray.map(valId => {
//   return {
//     leaderskillId : valId
//   }
// });
// // console.log(arrayType);

// fs.writeFileSync("json/leaderskill.json", JSON.stringify(arrayType));

console.log("analyzeLeaderSkill-->end.");
