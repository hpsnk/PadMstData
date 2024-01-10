//--------------------------------
// analyzeAwakenSkill.js
//--------------------------------
const fs = require("fs");

// monster data 存在check
if (!fs.existsSync("json/monster.json")) {
  console.error("  Convert Monster First.");
  process.exit(1);
}

console.log("analyzeAwakenSkill-->start.");

const strMonster = fs.readFileSync(
  "json/monster.json",
  "utf-8",
);

const jsonMonster = JSON.parse(strMonster);
console.log("  PadMst Monster Size =%d.", jsonMonster.length);

let arrayAwakenSkill = jsonMonster.map((monster, idx) => {
  return monster.awakenskillIds;
});

let arrayUniqueAwakenSkill = Array.from(
  new Set(arrayAwakenSkill.flat(Infinity))
).sort(function(a,b){
  return a-b;
});
// console.log(arrayUniqueAwakenSkill);

let asMap = [];
// customer/awakenskill.json 存在
if (fs.existsSync("custom/awakenskill.json")) {
  // 读取 customer/awakenskill.json
  const strCustomAwakenSkill = fs.readFileSync(
    "custom/awakenskill.json",
    "utf-8",
  );
  // 转换成 hashmap
  const jsonCustomAwakenSkill = JSON.parse(strCustomAwakenSkill);
  jsonCustomAwakenSkill.forEach(element => {
    asMap[element.awakenskillId] = element;
  });
}

let arrayObjAwakenSkill = arrayUniqueAwakenSkill.map(val => {
  if (asMap[val] != undefined) {
    return asMap[val];
  } else {
    return {awakenskillId : val}
  }
});
// console.log(arrayObjAwakenSkill);
console.log("  AwakenSkill Size = %d.", arrayObjAwakenSkill.length);

fs.writeFileSync("json/awakenskill.json", JSON.stringify(arrayObjAwakenSkill));

console.log("analyzeAwakenSkill-->end.");
