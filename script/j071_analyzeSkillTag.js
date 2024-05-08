//--------------------------------
// j071_analyzeSkillTag.js
//--------------------------------
const fs = require("fs");

console.log("  Analyze SkillTag-->start.");

// 读取 custom/collabo.csv
const strCustomSkillTag = fs.readFileSync(
  "../json/custom/skill_tag.csv",
  "utf-8",
);
const arrayCustomSkillTag = strCustomSkillTag.split('\r\n').filter((str,idx)=>{
  // 过滤，去除csv文件第一行的表头信息
  return idx>0;
});
console.log("  PadMst Custom SkillTag Size = %d.", arrayCustomSkillTag.length);

// 转换成 object
let arraySkillTag = arrayCustomSkillTag.map(element => {
  let infos = element.split(',');
  return {
    name    : infos[0],
    keyword : infos[1]
  };
});
// console.log(customCollaboMap);

fs.writeFileSync("../json/skill_tag.json", JSON.stringify(arraySkillTag));

console.log("  Analyze SkillTag-->end.");
