# js-embedder

向 JavaScript 文件中嵌入代码

```
const embedder = require('js-embedder');

embedder([
  {
    file: '待修改的文件绝对路径',
    embeds: [
      {
        insert: N,         // 在第 N 行之前，插入 code
        code: ...,         // 插入的代码
      },
      {
        replace: [X, Y],   // 从第 X 行到第 Y 行，替换为 code
        code: ...,         // 替换的代码
      },
      {
        insert: N,         // 优先使用 insert
        replace: [X, Y]    // replace 不起作用
        code: ...,
      },
    ],
  },
  {
    file: '待复原的文件绝对路径',
    embeds: null,          // 文件恢复到未修改状态
  }
]);
```
