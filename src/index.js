const fs = require('fs');

const { log, backup, isContentModified } = require('./util');
const sort = require('./sort');
const embed = require('./embed');

/*
  向文件内嵌入源码

  config: [{file, embeds: [{insert, replace, code}]}]

    file:      待修改的文件绝对路径
    insert:    在当前行前面插入 code
    replace:   把多行替换为 code
    code:      嵌入的源代码

  insert 与 replace 优先使用 insert

  提供了 embeds 表示要修改
  没提供 embeds 或者 embeds 为 null，表示恢复到未修改的状态
*/
const embedder = config => {
  log('开始执行');
  config.forEach(embedEachFile);
  log('执行完毕');
};

const embedEachFile = ({ file, embeds }) => {
  log('处理文件：%s', file);

  // 文件是否期望被修改
  const shouldModify = embeds != null;
  // 判断文件是否被修改过
  const content = fs.readFileSync(file, 'utf-8');
  const isModified = isContentModified(content);

  if (shouldModify && !isModified) {
    modify(file, embeds, content);
    return;
  }

  if (!shouldModify && isModified) {
    restore(file);
    return;
  }

  if (!shouldModify && !isModified) {
    log('文件不需要被修改，且没有被修改，略过');
    return;
  }

  // shouldModify && isModified
  log('文件需要被修改，但是已被修改过，略过');
};

const modify = (file, embeds, content) => {
  log('文件需要被修改，且尚未被修改，执行修改操作');

  log('排序并校验各个修改位置');
  const sortedEmbeds = sort(embeds);

  log('备份原文件');
  const backupFilePath = backup(file);
  fs.writeFileSync(backupFilePath, content);

  log('修改文件');
  const modifiedContent = embed(content, sortedEmbeds);

  log('写文件');
  fs.writeFileSync(file, modifiedContent);
};

const restore = file => {
  log('从备份的文件中恢复');

  const backupFilePath = backup(file);
  if (!fs.existsSync(backupFilePath)) {
    const error = `没找到备份文件：${backupFilePath}`;
    throw new Error(error);
  }

  const backupFileContent = fs.readFileSync(backupFilePath, 'utf-8');
  fs.writeFileSync(file, backupFileContent, 'utf-8');
  fs.unlinkSync(backupFilePath);
};

module.exports = embedder;
