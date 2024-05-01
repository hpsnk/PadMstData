//--------------------------------
// confirm awakenskill
//--------------------------------
const fs = require("fs");

console.log("confirm AwakenSkill-->start.");

// check 环境变量
let DATA_DIR = "D:/workspace_git_coding/PadMstJs/json";
console.log("  USING DATA DIR:");
console.log("    %s", DATA_DIR);

const strAwakenskill = fs.readFileSync(
  DATA_DIR + "/awakenskill.json",
  "utf-8",
);

const jsonAwakenskill = JSON.parse(strAwakenskill);
console.log("  Awakenskill Size   = %d.", jsonAwakenskill.length);
jsonAwakenskill.forEach(element => {
    console.log("%d,%s,%s", element.awakenskillId, element.name, element.gameDesc);
});


console.log("confirm AwakenSkill-->end.");
