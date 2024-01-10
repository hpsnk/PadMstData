//--------------------------------
// analyzeMonsterType.js
//--------------------------------
const fs = require("fs");

// monster data 存在check
if (!fs.existsSync("json/monster.json")) {
  console.error("  Convert Monster First.");
  process.exit(1);
}

console.log("analyzeMonsterType-->start.");

const strMonster = fs.readFileSync(
  "json/monster.json",
  "utf-8",
);

const jsonMonster = JSON.parse(strMonster);
console.log("  monster size = %d.", jsonMonster.length);

let arrayTpye = jsonMonster.map((monster, idx) => {
  return [monster.typeId, monster.subTypeId, monster.extraTypeId];
});

let arrayUniqueType = Array.from(new Set(arrayTpye.flat(Infinity))).filter((type) => {
  return type != -1;
}).sort(function(a,b){
  return a-b;
});
console.log(arrayUniqueType);

let arrayType = arrayUniqueType.map(valTypeId => {
  return {typeId : valTypeId}
});
console.log(arrayType);

fs.writeFileSync("json/monster_type.json", JSON.stringify(arrayType));

console.log("analyzeMonsterType-->end.");
