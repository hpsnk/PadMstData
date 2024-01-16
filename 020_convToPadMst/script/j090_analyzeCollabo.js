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

// 读取 custom/collabo.json
const strCustomCollabo = fs.readFileSync(
  "custom/collabo.json",
  "utf-8",
);
const jsonCustomCollabo = JSON.parse(strCustomCollabo);
console.log("  PadMst Custom Collabo Size = %d.", jsonCustomCollabo.length);

// TODO
// merge customer定义
let xxxMap = [];
jsonCustomCollabo.forEach(element => {
  xxxMap[element.collaboId] = element;
});

arrayCollabo.forEach(element => {
  if (xxxMap[element.collaboId] != undefined) {
    element.name = xxxMap[element.collaboId].name;
  }
});

fs.writeFileSync("json/collabo.json", JSON.stringify(arrayCollabo));

console.log("  Analyze Collabo-->end.");
