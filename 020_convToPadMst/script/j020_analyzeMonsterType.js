//--------------------------------
// analyzeMonsterType.js
//--------------------------------

const fs = require("fs");
const CardOfficial = require("../parseOfficialJson/parseCard");
const CardPadMst   = require("../parseOfficialJson/CardPadMst");


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

process.exit(0);


let arrayOfficalCard = jsonCard.card.map((oc, idx) => {
  return new CardOfficial(oc);
});
console.log("  count1:" + arrayOfficalCard.length);

let arrayPlayerCard = arrayOfficalCard.filter((testCard) => {
  if (testCard.id > 1e5) {
    return false;
  }
  if (testCard.isEmpty) {
    return false;
  }
  if (!testCard.enabled) {
    return false;
  }
  return true;
});
console.log("  count2:" + arrayPlayerCard.length);

let arrayPadMstCard = [];
arrayPlayerCard.map((card, idx) => {
  arrayPadMstCard.push(new CardPadMst(card));
});

console.log(JSON.stringify(arrayPadMstCard));


console.log("Parse Card To TSV-->end.");
