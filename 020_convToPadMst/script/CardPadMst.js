class CardPadMst {
	constructor(cardOfficial) {
		let card = this;

		card.monsterId = cardOfficial.fixId;
		card.name = cardOfficial.name;

		//属性1~3
		card.attr          = cardOfficial.attrs.length>0 ? cardOfficial.attrs[0] : -1;
		card.subAttr       = cardOfficial.attrs.length>1 ? cardOfficial.attrs[1] : -1;
		card.thirdAttr     = cardOfficial.attrs.length>2 ? cardOfficial.attrs[2] : -1;

		card.typeId        = cardOfficial.types.length > 0 ? cardOfficial.types[0] : -1;
		card.subTypeId     = cardOfficial.types.length > 1 ? cardOfficial.types[1] : -1;
		card.extraTypeId   = cardOfficial.types.length > 2 ? cardOfficial.types[2] : -1;
		
		card.rare          = cardOfficial.rarity;
		card.cost          = cardOfficial.cost;
		card.maxLv         = cardOfficial.maxLevel;
		card.maxHP         = cardOfficial.hp.max;
		card.maxATK        = cardOfficial.atk.max;
		card.maxRCV        = cardOfficial.rcv.max;
		card.collaboId     = cardOfficial.collabId;
		card.seriesId      = cardOfficial.seriesId;
		card.skillId       = cardOfficial.activeSkillId;
		card.leaderskillId = cardOfficial.leaderSkillId;

		card.awakenskillIds      = cardOfficial.awakenings;
		card.superawakenskillIds = cardOfficial.superAwakenings;
	}

}

//对于Nodejs输出成模块
if (typeof module != "undefined") {
	module.exports = CardPadMst;
} 
