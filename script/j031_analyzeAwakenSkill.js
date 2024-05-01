//--------------------------------
// analyzeAwakenSkill.js
//--------------------------------
const fs = require("fs");

// monster data 存在check
if (!fs.existsSync("../json/monster.json")) {
  console.error("  Convert Monster First.");
  process.exit(1);
}

console.log("analyzeAwakenSkill-->start.");

const strMonster = fs.readFileSync(
  "../json/monster.json",
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

fs.writeFileSync("../json/awakenskill.txt", JSON.stringify(arrayUniqueAwakenSkill));

console.log("analyzeAwakenSkill-->end.");
