//--------------------------------
// analyzeMonsterAttr.js
//--------------------------------
const fs = require("fs");

// monster data 存在check
if (!fs.existsSync("../json/monster.json")) {
  console.error("  Convert Monster First.");
  process.exit(1);
}

console.log("  Analyze Monster Attr-->start.");

// 读取 monster 数据
const strMonster = fs.readFileSync(
  "../json/monster.json",
  "utf-8",
);
// 转换成 json
const jsonMonster = JSON.parse(strMonster);
console.log("  PadMst Monster Size = %d.", jsonMonster.length);
// 提取 attr
let arrayAttrId = jsonMonster.map((monster, idx) => {
  return [monster.attr, monster.subAttr, monster.thirdAttr];
});
// 去重，排序
let arrayUniqueAttrId = Array.from(new Set(arrayAttrId.flat(Infinity)))
.filter((attrId) => {
  return attrId != -1 && attrId != undefined;
})
.sort(function(a,b){
  return a-b;
});
// console.log(arrayUniqueAttrId);
// 转换成 object
let arrayAttr = arrayUniqueAttrId.map(valAttrId => {
  return {id: valAttrId};
});
console.log("  Monster Attr Size = %d.", arrayAttr.length);

// ----------------------------
// 读取 custom/attr.csv
const strCustomAttr = fs.readFileSync(
  "../json/custom/attr.csv",
  "utf-8",
);
const arrayCustomAttr = strCustomAttr.split('\r\n')
.filter((os, idx) => {
  // skip header
  return idx >= 1;
});
console.log("  PadMst Custom Attr Size = %d.", arrayCustomAttr.length);

let customAttrMap = [];
arrayCustomAttr.forEach(element => {
  let infos   = element.split(',');
  let objAttr = {
    id:      parseInt(infos[0]),
    name:    infos[1],
    special: Boolean(parseInt(infos[2])),
  };
  customAttrMap[objAttr.id] = objAttr;
});

// 存在チェック
let mergeAttrs = arrayAttr.map((attr, idx) => {
  return customAttrMap[attr.id];
});

// arrayAttr.forEach(element => {
//   if (customAttrMap[element.id] != undefined) {
//     element = customAttrMap[element.id];
//     console.log('set xxx');
//   } else {
//     // 新しい属性キター！
//   }
// });

fs.writeFileSync("../json/attr.json", JSON.stringify(mergeAttrs));

console.log("  Analyze Monster Attr-->end.");
