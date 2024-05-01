//--------------------------------
// analyzeLeaderSkillCategory.js
//--------------------------------
const fs = require("fs");

console.log("analyzeLeaderSkillCategory-->start.");

// 读取 leaderskill 信息
const strLeaderskill = fs.readFileSync(
  "../json/leaderskill.json",
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
// console.log(arrayUniqueType);

let lscMap = [];
// TODO
// 读取 custom LeaderSkillCategory
// 合并数据

// 保存 leaderskillcategory.json
let arrayObjLeaderskillType = arrayUniqueType.map(typeId => {
  if (lscMap[typeId] != undefined) {
    return lscMap[typeId];
  } else {
    return {leaderskillType : typeId}
  }
});

fs.writeFileSync("../json/leaderskillcategory.json", JSON.stringify(arrayObjLeaderskillType));

console.log("analyzeLeaderSkillCategory-->end.");
