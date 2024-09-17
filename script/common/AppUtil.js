const EnvironmentUtil   = require("./EnvironmentUtil.js");

class AppUtil {

  static getInJsonDir(key) {
	
	return EnvironmentUtil.getValue("hpsnk_padmst_master_dir") + "/monsters-info/official-API/";
  }
}

//对于Nodejs输出成模块
if (typeof module != "undefined") {
	module.exports = AppUtil;
} 
