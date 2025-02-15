class EnvironmentUtil {
	// constructor(officialSkill) {
	// 	let skill = this;

	// 	skill.name            = officialSkill.name;
	// 	skill.gameDesc        = officialSkill.description;
	// 	skill.type            = officialSkill.type;
	// 	skill.maxLv           = officialSkill.maxLevel;
	// 	skill.initTurn        = officialSkill.initialCooldown;
	// 	skill.unk             = officialSkill.unk;
	// 	skill.params          = officialSkill.params;
	// }

  static getValue(key) {
	
    // 1. check key exist in env
	let valEnviroument = process.env[key];
    if (valEnviroument == undefined) {
		console.error("  Set System Environment[%s] First.", key);
		console.error("    >>hpsnk_padmst_offical_json_dir");
		process.exit(1);
    }

	// 2. check path exist in dir
	const fs = require("fs");
	if (!fs.existsSync(valEnviroument)) {
		console.error("  Check Dir[%s] First.", valEnviroument);
		process.exit(1);
	}

	return valEnviroument;
  }
}

//对于Nodejs输出成模块
if (typeof module != "undefined") {
	module.exports = EnvironmentUtil;
} 
