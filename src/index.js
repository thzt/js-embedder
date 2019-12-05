const fs = require('fs');

const { log, backup, isContentModified } = require('./util');
const sort = require('./sort');
const embed = require('./embed');

/*
  向文件内嵌入源码

  config: [{file, embeds: [{before, replace, code}]}]

    file:      待修改的文件绝对路径
    before:    在当前行前面插入 code
    replace:   把多行替换为 code
    code:      嵌入的源代码

  before 与 replace 优先使用 before
*/
const embedder = config => {
  log('执行嵌入操作');

  for (const item of config) {
    const { file, embeds } = item;
    log('处理文件：%s', file);

    log('排序并校验各个修改位置');
    const sortedEmbeds = sort(embeds);

    // 判断文件是否被修改过
    const content = fs.readFileSync(file, 'utf-8');
    const isModified = isContentModified(content);
    if (isModified) {
      log('已修改过的文件，略过');
      continue;
    }

    log('备份原文件');
    const backupFilePath = backup(file);
    fs.writeFileSync(backupFilePath, content);

    log('修改文件');
    const modifiedContent = embed(content, sortedEmbeds);

    log('写文件');
    fs.writeFileSync(file, modifiedContent);
  }

  log('执行完毕');
};

module.exports = embedder;
