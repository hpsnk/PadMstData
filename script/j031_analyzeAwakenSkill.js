//--------------------------------
// analyzeAwakenSkill.js
// 解析 觉醒 
//--------------------------------
const fs = require("fs");

// monster data 存在check
if (!fs.existsSync("../json/monster.json")) {
  console.error("  Convert Monster First.");
  process.exit(1);
}

console.log("analyzeAwakenSkill-->start.");

// 读取monster信息
const strMonster = fs.readFileSync(
  "../json/monster.json",
  "utf-8",
);

const jsonMonster = JSON.parse(strMonster);
console.log("  PadMst Monster Size =%d.", jsonMonster.length);

// 提取所有的awakenskillid
let arrayAwakenSkill = jsonMonster.map((monster, idx) => {
  return monster.awakenskillIds;
});

// awakenskillid 去重，排序
let arrayUniqueAwakenSkill = Array.from(
  new Set(                               // 去除重复项
    arrayAwakenSkill.flat(Infinity)      // 数组扁平化(变成一维数组)
  )
).sort(function(a,b){
  return a-b;
});
// console.log(arrayUniqueAwakenSkill);

// 写入txt文件
fs.writeFileSync("../json/awakenskill.txt", JSON.stringify(arrayUniqueAwakenSkill));

console.log("analyzeAwakenSkill-->end.");
