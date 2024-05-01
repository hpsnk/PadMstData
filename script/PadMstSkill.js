class PadMstSkill {
	constructor(officialSkill) {
		let skill = this;

		skill.name            = officialSkill.name;
		skill.gameDesc        = officialSkill.description;
		skill.type            = officialSkill.type;
		skill.maxLv           = officialSkill.maxLevel;
		skill.initTurn        = officialSkill.initialCooldown;
		skill.unk             = officialSkill.unk;
		skill.params          = officialSkill.params;
	}

}

//对于Nodejs输出成模块
if (typeof module != "undefined") {
	module.exports = PadMstSkill;
} 
