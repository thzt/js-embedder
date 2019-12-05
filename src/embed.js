const { log, wrap } = require('./util');
const insertItem = require('./insert-item');
const replaceItem = require('./replace-item');

// 向文本中嵌入内容
const embed = (content, embeds) => {
  // 按换行符分割
  const lines = content.split('\n');

  let offset = 0;
  for (const item of embeds) {
    const { before, replace, code } = item;

    // 加入被修改过后的标记
    const codeWithModifedFlag = wrap(code);

    // 优先判断 before
    const isInsertMode = before != null;
    if (isInsertMode) {
      log('插入代码，在第 %s 行之前', before);
      offset = insertItem(lines, offset, before, codeWithModifedFlag);
      continue;
    }

    const [from, to] = replace;
    log('替换代码，从第 %s 行到第 %s 行', from, to);
    offset = replaceItem(lines, offset, replace, codeWithModifedFlag);
  }

  const modifiedContent = lines.join('\n');
  return modifiedContent;
};

module.exports = embed;
