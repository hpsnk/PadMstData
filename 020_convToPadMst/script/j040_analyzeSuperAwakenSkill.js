//--------------------------------
// analyzeSuperAwakenSkill.js
//--------------------------------

const fs = require("fs");

console.log("analyzeSuperAwakenSkill-->start.");

const strMonster = fs.readFileSync(
  "json/monster.json",
  "utf-8",
);

const jsonMonster = JSON.parse(strMonster);
console.log("  monster size = %d.", jsonMonster.length);

let arraySuperAwakenSkill = jsonMonster.map((monster, idx) => {
  return monster.superawakenskillIds;
});

let arrayUniqueSuperAwakenSkill = Array.from(
  new Set(arraySuperAwakenSkill.flat(Infinity))
).sort(function(a,b){
  return a-b;
});
console.log(arrayUniqueSuperAwakenSkill);

let arrayObjSuperAwakenSkill = arrayUniqueSuperAwakenSkill.map(val => {
  return {awakenskillId : val}
});
// console.log(arrayObjSuperAwakenSkill);
console.log("  SuperAwakenSkill.size = " + arrayObjSuperAwakenSkill.length);

fs.writeFileSync("json/superawakenskill.json", JSON.stringify(arrayObjSuperAwakenSkill));

console.log("analyzeSuperAwakenSkill-->end.");

process.exit(0);
