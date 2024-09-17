//--------------------------------
// convertMonsterToJson.js
//--------------------------------
const AppUtil   = require("./common/AppUtil.js");

const fs = require("fs");
const CardOfficial = require("../script/PADDashFormation/parseCard.js");
const CardPadMst   = require("./CardPadMst.js");

// // check 环境变量
// if (process.env.hpsnk_padmst_offical_json_dir == undefined) {
//   console.error("  Set System Environment First.");
//   console.error("    hpsnk_padmst_offical_json_dir");
//   process.exit(1);
// }

console.log("convertMonsterToJson-->start.");

// let DATA_DIR = EnvironmentUtil.getValue("hpsnk_padmst_master_dir") + "/monsters-info/official-API/";
let DATA_DIR = AppUtil.getInJsonDir();
console.log("  [Input ] %s", DATA_DIR);

const strCard = fs.readFileSync(
  DATA_DIR + "/ja-card.json",
  "utf-8",
);

const jsonCard = JSON.parse(strCard);
console.log("  Offical Card Size   = %d.", jsonCard.card.length);

let arrayOfficalCard = jsonCard.card.map((oc, idx) => {
  return new CardOfficial(oc);
});
// console.log("  count1:" + arrayOfficalCard.length);
// console.log("  " + JSON.stringify(arrayOfficalCard[1]));

// 排除怪物
let arrayPlayerCard = arrayOfficalCard.filter((testCard) => {
  if (testCard.id > 50000) {
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
console.log("  PadMst Monster Size = %d.", arrayPlayerCard.length);

let arrayPadMstCard = [];
arrayPlayerCard.map((card, idx) => {
  arrayPadMstCard.push(new CardPadMst(card));
});

console.log("  [Output] %s", "../json/monster.json");
fs.writeFileSync("../json/monster.json", JSON.stringify(arrayPadMstCard));

// console.log("   Total Monster Size : %d", arrayPadMstCard.length);
// console.log("   Max Monster id     : %d", arrayPadMstCard.at(-1).monsterId);
// console.log(arrayPlayerCard[0]);
// console.log();
// console.log(arrayPlayerCard[arrayPlayerCard.length-1]);

console.log("convertMonsterToJson-->end.");
