class EnvironmentUtil {

  static getValue(key) {
	
    // 1. check key exist in env
	let valEnviroument = process.env[key];
    if (valEnviroument == undefined) {
		console.error("  Set System Environment[%s] First.", key);
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
