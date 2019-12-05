// 在第 before 行之前插入代码 code
// 返回插入操作之后的 offset
const insertItem = (lines, offset, before, code) => {
  // -1 是因为 index 要从 0 开始，而 before 是从第一行开始的
  const index = before - 1;
  // 影响 0 行，表示在前面插入一行
  const count = 0;

  // 修改 lines 数组
  lines.splice(index + offset, count, code);

  // lines 数组会先删除 count 个记录，然后再加入 code 这一个记录
  offset += -count + 1;
  return offset;
};

module.exports = insertItem;
