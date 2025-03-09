//================================
// addAwakenSkillEquivalent.js
// 附加等效觉醒
//================================
const fs = require("fs");

console.log("addAwakenSkillEquivalent-->start.");

// 读取 custom/awakenskillEquivalent.csv
//--------------------------------
const strCustomAwakenskillEquivalent = fs.readFileSync(
  "../json/custom/awakenskillEquivalent.csv",
  "utf-8",
);
let equivalentMap = [];
strCustomAwakenskillEquivalent.split('\r\n').forEach(element => {
  let infos = element.split(',');

  let smallId     = parseInt(infos[0]);
  let bigId       = parseInt(infos[1]);
  let effect      = parseInt(infos[2]);

  equivalentMap[bigId] = {
    smallId     : smallId,
    effect      : effect,
  };
});

// 读入 json/awakenskill.json
//--------------------------------
const strAwakenSkill = fs.readFileSync(
  "../json/awakenskill.json",
  "utf-8",
);

const jsonAwakenSkill = JSON.parse(strAwakenSkill);

jsonAwakenSkill.forEach(awakenSkill => {
  let testAwakenSkillId = awakenSkill.awakenskillId;
  // 大 = 小 * 倍率
  // 
  if (equivalentMap[testAwakenSkillId] != undefined) {
    // json/awakenskill.json に存在する場合
    awakenSkill.equivalentId      = equivalentMap[testAwakenSkillId].smallId;
    awakenSkill.equivalentEffect  = equivalentMap[testAwakenSkillId].effect;
  }
});

// 写入json/awakenskill.json
fs.writeFileSync("../json/awakenskill.json", JSON.stringify(jsonAwakenSkill));

console.log("addAwakenSkillEquivalent-->start.");
