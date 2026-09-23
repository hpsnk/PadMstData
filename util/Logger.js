//-----------------------------------------------------
// Logger.js
//-----------------------------------------------------

exports.LV_TRACE = 1;
exports.LV_DEBUG = 2;
exports.LV_INFO = 3;
exports.LV_WARN = 4;
exports.LV_ERROR = 5;

let level        = this.LV_INFO;
let showDateTime = false;
/**
 * Logger 初始化函数
 * @param {number} [nLogLevel] - 日志输出级别 (可选，例如: Logger.LV_DEBUG)
 * @param {boolean} [bShowDateTime] - 是否在输出 log 时包含日期和时间 (默认: true)
 */
exports.init = function (nLogLevel, bShowDateTime) {
  if (typeof nLogLevel === 'number') {
    level = nLogLevel;
  }
  if (typeof bShowDateTime === 'boolean') {
    showDateTime = bShowDateTime;
  }
}

/**
 * 设置日志输出级别
 * @param {number} nLogLevel 
 */
exports.setLevel = function (nLogLevel) {
  level = nLogLevel;
}

/**
 * 设置是否显示日期时间
 * @param {boolean} bShowDateTime 
 */
exports.setShowDateTime = function (bShowDateTime) {
  if (typeof bShowDateTime === 'boolean') {
    showDateTime = bShowDateTime;
  }
}

/**
 * @param {string} program - 程序/模块名称
 * @param {string} strLog - 日志内容
 */
exports.trace = function (program, strLog) {
  outputLog(this.LV_TRACE, program, '[TRACE]' + strLog);
}

/**
 * @param {string} program 
 * @param {string} strLog 
 */
exports.debug = function (program, strLog) {
  outputLog(this.LV_DEBUG, program, '[DEBUG]' + strLog);
}

/**
 * @param {string} program 
 * @param {string} strLog 
 */
exports.info = function (program, strLog) {
  outputLog(this.LV_INFO, program, '[INFO ]' + strLog);
}

/**
 * @param {string} program 
 * @param {string} strLog 
 */
exports.warn = function (program, strLog) {
  outputLog(this.LV_WARN, program, '[WARN ]' + strLog);
}

/**
 * @param {string} program 
 * @param {string} strLog 
 */
exports.error = function (program, strLog) {
  outputLog(this.LV_ERROR, program, '[ERROR]' + strLog);
}

/**
 * 内部统一输出日志
 * @param {number} nLogLevel 
 * @param {string} program 
 * @param {string} strLog 
 */
function outputLog(nLogLevel, program, strLog) {
  if (nLogLevel < level) {
    return;
  }
  let strDateTime = showDateTime ? getDisplayDateTime() : '';
  let strProgram = program ? '[' + program + ']' : '';
  console.log(strDateTime + strProgram + strLog);
}

function rightString(str, length) {
  return str.substring(str.length - length);
}

function getDisplayDateTime() {
  let now = new Date();

  let strYear = "" + now.getFullYear();
  let strMonth = rightString("00" + (now.getMonth() + 1), 2);
  let strDate = rightString("00" + now.getDate(), 2);
  let strHour = rightString("00" + now.getHours(), 2);
  let strMinute = rightString("00" + now.getMinutes(), 2);
  let strSecond = rightString("00" + now.getSeconds(), 2);
  let strMilliseconds = "" + now.getMilliseconds();

  return "[" + strYear + "/" +
    strMonth + "/" +
    strDate + " " +
    strHour + ":" +
    strMinute + ":" +
    strSecond + "." +
    strMilliseconds + "]";
}
