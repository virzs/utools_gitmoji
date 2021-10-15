const data = require("./data.json");

window.exports = {
  gitmoji: {
    mode: "list",
    args: {
      enter: (action, callbackSetList) => {
        // 显示 gitmoji 列表
        callbackSetList(
          data.map((i) => ({
            title: `${i.emoji} Shortcode: ${i.code}`,
            description: `${i.description_zh} (${i.description_en})`,
            code: i.code,
          }))
        );
      },
      // 子输入框内容变化时被调用 可选 (未设置则无搜索)
      search: (action, searchWord, callbackSetList) => {
        console.log(
          searchWord,
          data
            .map((i) => ({
              title: `${i.emoji} Shortcode: ${i.code}`,
              description: `${i.description_zh} (${i.description_en})`,
              code: i.code,
            }))
            .filter((i) => {
              const findDesc = i.description.indexOf(searchWord) !== -1;
              const findName = i.code.indexOf(searchWord) !== -1;

              return findName || findDesc;
            })
        );
        callbackSetList(
          data
            .map((i) => ({
              title: `${i.emoji} Shortcode: ${i.code}`,
              description: `${i.description_zh} (${i.description_en})`,
              code: i.code,
            }))
            .filter((i) => {
              const findDesc = i.description.indexOf(searchWord) !== -1;
              const findName = i.code.indexOf(searchWord) !== -1;

              return findName || findDesc;
            })
        );
      },
      // 用户选择列表中某个条目时被调用
      select: (action, itemData, callbackSetList) => {
        window.utools.hideMainWindow();
        window.utools.copyText(itemData.code);
        window.utools.outPlugin();
      },
      placeholder: "搜索",
    },
  },
};
