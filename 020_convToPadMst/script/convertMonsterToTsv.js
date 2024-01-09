const fs = require("fs");
const Card = require("../parseOfficialJson/parseCard");

function writeToFile(strText, newFile = false) {
  if (newFile) {
    fs.writeFileSync("./data.card.tsv", strText);
  } else {
    fs.appendFileSync("./data.card.tsv", strText);
  }
  fs.appendFileSync("./data.card.tsv", "\r\n");
}

console.log("Parse Card To TSV-->start.");

// 表头
const arrayCardHeader = [
  "idx",
  "card.id",
  "card.fixId",
  "card.name",
  "card.attrs",
  "card.types",
  "card.rarity",
  "card.cost",
  "card.maxLevel",
  "card.hp.max",
  "card.atk.max",
  "card.rcv.max",
  "card.activeSkillId",
  "card.leaderSkillId",
  "card.awakenings",
  "card.superAwakenings",
  "card.collabId",
  
  //   "maxLv",
  //   "maxHP",
  //   "maxATK",
  //   "maxRCV",
  //   "enabled",
  //   "isEmpty",
  //   "types",
  //   "maxLevel",
  //   "activeSkillId",
  //   "leaderSkillId",
  //   "altName",
];
writeToFile(arrayCardHeader.join("\t"), true);

const strCard = fs.readFileSync(
  "D:/workspace_study/PADDashFormation/monsters-info/official-API/ja-card.json",
  "utf-8",
);

const jsonCard = JSON.parse(strCard);
console.log("  card size = %d.", jsonCard.card.length);

let arrayOfficalCard = jsonCard.card.map((oc, idx) => {
  return new Card(oc);
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

arrayPlayerCard.map((card, idx) => {
  writeToFile(
    arrayCardHeader.map((header, idx) => {
      return eval(`${header}`);
    }).join("\t"),
  );
});

console.log("Parse Card To TSV-->end.");
