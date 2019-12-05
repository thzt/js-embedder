const sort = embeds => {

  // 按修改位置的左端点从上到下排序
  const sortedEmbeds = embeds.sort((n1, n2) => {
    const leftPoint1 = n1.before != null ? n1.before : n1.replace[0];
    const leftPoint2 = n2.before != null ? n2.before : n2.replace[0];

    return leftPoint1 - leftPoint2;
  });

  // 判断各处的修改是否有冲突
  let previous;
  sortedEmbeds.forEach(current => {
    if (previous == null) {
      previous = current;
      return;
    }

    // 在第 N 行之前插入 code，那么第 N 行也可以被替换
    if (previous.before != null   // 上一行是插入模式
      && current.replace != null  // 当前行是替换模式
      && previous.before === current.replace[0]
    ) {
      return;
    }

    // 其他情况
    // 当前修改位置的左端点，必须在上一个修改位置的右端点之后

    // 上一个修改位置的右端点
    const rightPoint = previous.before != null ? previous.before : previous.replace[1];
    // 当前修改位置的左端点
    const leftPoint = current.before != null ? current.before : current.replace[0];

    if (leftPoint <= rightPoint) {
      throw new Error(`修改位置有冲突\n${JSON.stringify(previous, null, 2)}\n${JSON.stringify(current, null, 2)}`);
    }
  });

  return sortedEmbeds;
};

module.exports = sort;
