//--------------------------------
// analyzeAwakenSkill.js
//--------------------------------

const fs = require("fs");

console.log("analyzeAwakenSkill-->start.");

const strMonster = fs.readFileSync(
  "json/monster.json",
  "utf-8",
);

const jsonMonster = JSON.parse(strMonster);
console.log("  monster size = %d.", jsonMonster.length);

let arrayAwakenSkill = jsonMonster.map((monster, idx) => {
  return monster.awakenskillIds;
});

let arrayUniqueAwakenSkill = Array.from(
  new Set(arrayAwakenSkill.flat(Infinity))
).sort(function(a,b){
  return a-b;
});
console.log(arrayUniqueAwakenSkill);

// 读取 customer/awakenskill.json
const strCustomAwakenSkill = fs.readFileSync(
  "custom/awakenskill.json",
  "utf-8",
);
// 转换成 hashmap
const jsonCustomAwakenSkill = JSON.parse(strCustomAwakenSkill);
let asMap = [];
jsonCustomAwakenSkill.forEach(element => {
  asMap[element.awakenskillId] = element;
});

let arrayObjAwakenSkill = arrayUniqueAwakenSkill.map(val => {
  if (asMap[val] != undefined) {
    return asMap[val];
  } else {
    return {awakenskillId : val}
  }
});
// console.log(arrayObjAwakenSkill);
console.log("  AwakenSkill.size = " + arrayObjAwakenSkill.length);

fs.writeFileSync("json/awakenskill.json", JSON.stringify(arrayObjAwakenSkill));

console.log("analyzeAwakenSkill-->end.");

process.exit(0);
