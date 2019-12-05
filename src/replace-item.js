// 从第 from 行到第 to 行，替换为 code
// 返回替换操作之后的 offset
const replaceItem = (lines, offset, [from, to], code) => {
  // -1 是因为 index 要从 0 开始，而 from 是从第一行开始的
  const index = from - 1;
  // +1 是因为 to 这一行也要影响到
  const count = to - from + 1;

  // 修改 lines 数组
  lines.splice(index + offset, count, code);

  // lines 数组会先删除 count 个记录，然后再加入 code 这一个记录
  offset += -count + 1;
  return offset;
};

module.exports = replaceItem;
