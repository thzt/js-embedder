const debug = require('debug');

const packageJson = require('../package.json');

// 当前模块名
const { name: packageName } = packageJson;

// 文件已被修改过的标记
const flag = `/* ${packageName} */`;

// 对嵌入的代码加上标记
const wrap = code => `${flag}\n${code}\n${flag}`;

// 一段文本是否被嵌入过代码
const isContentModified = content => content.includes(flag);

// backup 文件名
const backup = file => `${file}-${Date.now()}.${packageName}`;

// debug 的前缀
const log = debug(packageName);

module.exports = {
  wrap,
  isContentModified,
  backup,
  log,
};
