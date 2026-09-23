//--------------------------------
// j072_analyzeSkillTag.js
//--------------------------------
const fs = require("fs");

const logger = require('../util/Logger.js');

//----------------------------------------------------------------
// 获取批处理传入的第一个参数
const execProgram = process.argv[2];

logger.info(execProgram, "Analyze SkillTag-->start.")

// 读取 custom/collabo.csv
const strCustomSkillTag = fs.readFileSync(
  "../json/custom/skill_tag.csv",
  "utf-8",
);
const arrayCustomSkillTag = strCustomSkillTag.split('\r\n').filter((str,idx)=>{
  // 过滤，去除csv文件第一行的表头信息
  return idx>0;
});
logger.info(execProgram, `PadMst Custom SkillTag Size = ${arrayCustomSkillTag.length}.`)

// 转换成 object
let arraySkillTag = arrayCustomSkillTag.map(element => {
  let infos = element.split(',');
  return {
    name    : infos[0],
    keyword : infos[1]
  };
});
// console.log(customCollaboMap);

fs.writeFileSync("../json/skill_tag.json", JSON.stringify(arraySkillTag));

logger.info(execProgram, "Analyze SkillTag-->end.")
