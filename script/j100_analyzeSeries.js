//--------------------------------
// analyzeSeries.js
//--------------------------------
const fs = require("fs");

console.log("  Analyze Series-->start.");

// 读取 monster 数据
const strMonster = fs.readFileSync(
  "../json/monster.json",
  "utf-8",
);

const jsonMonster = JSON.parse(strMonster);
console.log("  PadMst Monster Size = %d.", jsonMonster.length);

// seriesId
let arraySeriesId = jsonMonster.map((monster, idx) => {
  return monster.seriesId;
});
// 去重 排序
let arrayUniqueSeriesId = Array.from(new Set(arraySeriesId.flat(Infinity))).sort(function(a,b){
  return a-b;
});
// console.log(arrayUniqueSeriesId);

// 转换成 object
let arraySeries = arrayUniqueSeriesId.map(valSeriesId => {
  return {seriesId: valSeriesId}
});
console.log("  Series Size = %d.", arraySeries.length);

// todo
// 读取 custom/series.csv
// const strCustomCollabo = fs.readFileSync(
//   "custom/collabo.csv",
//   "utf-8",
// );
// const arrayCustomCollabo = strCustomCollabo.split('\r\n').filter((cc,idx)=>{
//   return !cc.includes('undefined');
// });
// // const jsonCustomCollabo = JSON.parse(strCustomCollabo);
// console.log("  PadMst Custom Collabo Size = %d.", arrayCustomCollabo.length);

// // TODO
// // merge customer定义
// let customCollaboMap = [];
// arrayCustomCollabo.forEach(element => {
//   let infos = element.split(',');
//   let id    = infos[0];
//   let name  = infos[1];
//   customCollaboMap[id] = name;
// });
// // console.log(customCollaboMap);

// arrayCollabo.forEach(element => {
//   if (customCollaboMap[element.collaboId] != undefined) {
//     element.name = customCollaboMap[element.collaboId];
//   }
// });

fs.writeFileSync("../json/series.json", JSON.stringify(arraySeries));

console.log("  Analyze Series-->end.");
