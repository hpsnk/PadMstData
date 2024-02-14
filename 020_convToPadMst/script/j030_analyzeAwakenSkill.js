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
// arrayUniqueAwakenSkill.forEach(id=> {
//   console.log(id);
// });


// ----------------------------
// 读取 custom/awakenskill.csv
let asMap = [];
const strCustomAwakenskill = fs.readFileSync(
  "custom/awakenskill.csv",
  "utf-8",
);
let customAwakenskillMap = [];
strCustomAwakenskill.split('\r\n').forEach(element => {
  let infos = element.split(',');

  let id    = parseInt(infos[0]);

  customAwakenskillMap[id] = {
    awakenskillId : id,
    name          : infos[1],
    gameDesc      : infos[2],
  };
});

let arrayAwakenskill = arrayUniqueAwakenSkill.map(valId => {
  if (customAwakenskillMap[valId] != undefined) {
    return customAwakenskillMap[valId];
  } else {
    return {awakenskillId : valId}
  }
});
// console.log(arrayObjAwakenSkill);
console.log("  AwakenSkill Size = %d.", arrayAwakenskill.length);

fs.writeFileSync("json/awakenskill.json", JSON.stringify(arrayAwakenskill));

console.log("analyzeAwakenSkill-->end.");
