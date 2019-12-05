# js-embedder

向 JavaScript 文件中嵌入代码

```
const embedder = require('js-embedder');

embedder([
  {
    file: '待修改的文件绝对路径',
    embeds: [
      {
        before: N,  // 在第 before 行之前，插入 code
        code: ...,  // 插入的代码
      },
      {
        from: X,
        to: Y,      // 从第 from 行到第 to 行，替换为 code
        code: ...,  // 替换的代码
      },
      {
        before: N,  // 优先使用 before
        from: X,    // from 和 to 不起作用
        to: Y,
        code: ...,
      },
    ],
  }
]);
```
