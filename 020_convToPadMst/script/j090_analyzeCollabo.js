//--------------------------------
// analyzeCollabo.js
//--------------------------------
const fs = require("fs");

console.log("  Analyze Collabo-->start.");



// 读取 monster 数据
const strMonster = fs.readFileSync(
  "json/monster.json",
  "utf-8",
);

const jsonMonster = JSON.parse(strMonster);
console.log("  PadMst Monster Size = %d.", jsonMonster.length);

// collaboId
let arrayCollaboId = jsonMonster.map((monster, idx) => {
  return monster.collaboId;
});
// 去重 排序
let arrayUniqueCollaboId = Array.from(new Set(arrayCollaboId.flat(Infinity))).sort(function(a,b){
  return a-b;
});
// console.log(arrayUniqueCollaboId);

// 转换成 object
let arrayCollabo = arrayUniqueCollaboId.map(valCollaboId => {
  return {collaboId: valCollaboId}
});
console.log("  Collabo Size = %d.", arrayCollabo.length);

// TODO
// merge customer定义

fs.writeFileSync("json/collabo.json", JSON.stringify(arrayCollabo));

console.log("  Analyze Collabo-->end.");
