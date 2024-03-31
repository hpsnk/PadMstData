//--------------------------------
// convertMonsterToJson.js
//--------------------------------
const fs = require("fs");
const CardOfficial = require("../script/PADDashFormation/parseCard.js");
const CardPadMst   = require("./CardPadMst.js");

// check 环境变量
if (process.env.hpsnk_padmst_offical_json_dir == undefined) {
  console.error("  Set System Environment First.");
  console.error("    hpsnk_padmst_offical_json_dir");
  process.exit(1);
}

console.log("convertMonsterToJson-->start.");

let DATA_DIR = process.env.hpsnk_padmst_offical_json_dir;
console.log("  USING DATA DIR:");
console.log("    %s", DATA_DIR);

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
console.log("  PadMst Monster Size = %d.", arrayPlayerCard.length);

let arrayPadMstCard = [];
arrayPlayerCard.map((card, idx) => {
  arrayPadMstCard.push(new CardPadMst(card));
});

fs.writeFileSync("../json/monster.json", JSON.stringify(arrayPadMstCard));

// console.log();
// console.log(arrayPlayerCard[0]);
// console.log();
// console.log(arrayPlayerCard[arrayPlayerCard.length-1]);

console.log("convertMonsterToJson-->end.");
