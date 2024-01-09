const fs = require("fs");
const CardOfficial = require("../../010_officialData/parseCard");
const CardPadMst   = require("./CardPadMst.js");

if (process.env.hpsnk_padmst_offical_json_dir == undefined) {
  process.exit(1);
}

let DATA_DIR = process.env.hpsnk_padmst_offical_json_dir;
console.log("  Using DIR %s", DATA_DIR);

console.log("Parse Card To TSV-->start.");

const strCard = fs.readFileSync(
  DATA_DIR + "/ja-card.json",
  "utf-8",
);

const jsonCard = JSON.parse(strCard);
console.log("  card size = %d.", jsonCard.card.length);

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

console.log();
console.log(arrayPlayerCard[0]);
console.log();
console.log(arrayPlayerCard[arrayPlayerCard.length-1]);


fs.writeFileSync("json/monster.json", JSON.stringify(arrayPadMstCard));

console.log("Parse Card To TSV-->end.");
