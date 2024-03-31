//--------------------------------
// analyzeSuperAwakenSkill.js
//--------------------------------
const fs = require("fs");

// monster data 存在check
if (!fs.existsSync("../json/monster.json")) {
  console.error("  Convert Monster First.");
  process.exit(1);
}

console.log("analyzeSuperAwakenSkill-->start.");

const strMonster = fs.readFileSync(
  "../json/monster.json",
  "utf-8",
);

const jsonMonster = JSON.parse(strMonster);
console.log("  PadMst Monster Size =%d.", jsonMonster.length);

let arraySuperAwakenSkill = jsonMonster.map((monster, idx) => {
  return monster.superawakenskillIds;
});

let arrayUniqueSuperAwakenSkill = Array.from(
  new Set(arraySuperAwakenSkill.flat(Infinity))
).sort(function(a,b){
  return a-b;
});
// console.log(arrayUniqueSuperAwakenSkill);

fs.writeFileSync("../json/superawakenskill.txt", JSON.stringify(arrayUniqueSuperAwakenSkill));

console.log("analyzeSuperAwakenSkill-->end.");
