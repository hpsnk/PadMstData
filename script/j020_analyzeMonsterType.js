//--------------------------------
// analyzeMonsterType.js
//--------------------------------
const fs = require("fs");

// monster data 存在check
if (!fs.existsSync("../json/monster.json")) {
  console.error("  Convert Monster First.");
  process.exit(1);
}

console.log("analyzeMonsterType-->start.");

// 读取 monster 数据
const strMonster = fs.readFileSync(
  "../json/monster.json",
  "utf-8",
);

const jsonMonster = JSON.parse(strMonster);
console.log("  PadMst Monster Size = %d.", jsonMonster.length);

let arrayTpyeId = jsonMonster.map((monster, idx) => {
  return [monster.typeId, monster.subTypeId, monster.extraTypeId];
});

let arrayUniqueTypeId = Array.from(new Set(arrayTpyeId.flat(Infinity))).filter((typeId) => {
  return typeId != -1;
}).sort(function(a,b){
  return a-b;
});
// console.log(arrayUniqueTypeId);

// ----------------------------
// 读取 custom/type.csv
const strCustomType = fs.readFileSync(
  "../json/custom/type.csv",
  "utf-8",
);
let customTypeMap = [];
strCustomType.split('\r\n').forEach(element => {
  let infos = element.split(',');
  let id    = parseInt(infos[0]);
  let name  = infos[1];
  let order = parseInt(infos[2]);

  customTypeMap[id] = {
    typeId: id,
    name:   name,
    order:  order,
  };
});

let arrayType = arrayUniqueTypeId.map(valTypeId => {
  if (customTypeMap[valTypeId] != undefined) {
    return customTypeMap[valTypeId];
  } else {
    return {typeId : valTypeId}
  }
}).sort(function(a,b){
  return a.order-b.order;
});
// console.log(arrayType);
console.log("  MonsterType Size = %d.", arrayType.length);

fs.writeFileSync("../json/monster_type.json", JSON.stringify(arrayType));

console.log("analyzeMonsterType-->end.");
