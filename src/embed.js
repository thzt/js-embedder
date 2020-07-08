const textEmbedder = require('text-embedder');
const { log, wrap } = require('./util');

// 向文本中嵌入内容
const embed = (originalCode, embeds, newline) => textEmbedder({
  text: originalCode,
  embeds: embeds.map(({ insert, replace, code }) => ({
    insert,
    replace,
    content: wrap(code),
  })),
  beforeEmbed: (({ mode, args }) => {
    if (mode === 'insert') {
      const insert = args;
      log('嵌入代码，在第 %s 行之前', insert);
      return;
    }

    // replace mode
    const [from, to] = args;
    log('替换代码，从第 %s 行到第 %s 行', from, to);
  }),
}, newline);

module.exports = embed;
