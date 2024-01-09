class Skill {
    // constructor(i, data){
    constructor(data) {
		let skill = this;

		// skill.id = i;
		skill.name = data[0];

		skill.description = data[1].replace('\n', '\\n');

		skill.type = data[2];

		skill.maxLevel = data[3];

		skill.initialCooldown = data[4];

		skill.unk = data[5];

		skill.params = data.slice(6);
		
        // switch(skill.type) {
		// 	case 202: case 236: {
		// 		skill.params = skill.params.map(Card.fixId);
		// 	}
		// }
	}
}
//对于Nodejs输出成模块
if (typeof(module) != "undefined") module.exports = Skill;
