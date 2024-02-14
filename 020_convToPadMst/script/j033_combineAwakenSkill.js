//--------------------------------
// combineAwakenSkill.js
//--------------------------------
const fs = require("fs");

// 
if (!fs.existsSync("json/monster.json")) {
  console.error("  Convert Monster First.");
  process.exit(1);
}

console.log("combineAwakenSkill-->start.");

const strAwakenSkill = fs.readFileSync(
  "json/awakenskill.txt",
  "utf-8",
);
const jsonAwakenSkill = JSON.parse(strAwakenSkill);
console.log("  AwakenSkill      Size = %d.", jsonAwakenSkill.length);


const strSuperAwakenSkill = fs.readFileSync(
  "json/superawakenskill.txt",
  "utf-8",
);
const jsonSuperAwakenSkill = JSON.parse(strSuperAwakenSkill);
console.log("  SuperAwakenSkill Size = %d.", jsonSuperAwakenSkill.length);




// 合并 awakenskill, superAwakenskill
let mergedId = [];
jsonAwakenSkill.forEach(awakenskillId => {
  mergedId.push(awakenskillId);
  // console.log(awakenskillId);
});
jsonSuperAwakenSkill.forEach(superAwakenskillId => {
  mergedId.push(superAwakenskillId);
  // console.log(superAwakenskillId);
});

// 去重，排序
let arrayUniqueAwakenSkill = Array.from(
  new Set(mergedId.flat(Infinity))
).sort(function(a,b){
  return a-b;
});
// console.log(arrayUniqueAwakenSkill.length);

// 删除中间文件
fs.unlinkSync("json/awakenskill.txt");
fs.unlinkSync("json/superawakenskill.txt");


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
