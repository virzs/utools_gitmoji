const data = require("./data.json");
const PinyinMatch = require("pinyin-match");

window.exports = {
  gitmoji: {
    mode: "list",
    args: {
      enter: (action, callbackSetList) => {
        // 显示 gitmoji 列表
        const list = data.map((i) => ({
          title: `${i.emoji} Shortcode: ${i.code}`,
          description: `${i.description_zh} (${i.description_en})`,
          code: i.code,
        }));
        callbackSetList(list);
      },
      // 子输入框内容变化时被调用 可选 (未设置则无搜索)
      search: (action, searchWord, callbackSetList) => {
        const list = data.map((i) => ({
          title: `${i.emoji} Shortcode: ${i.code}`,
          description: `${i.description_zh} (${i.description_en})`,
          code: i.code,
        }));
        callbackSetList(
          searchWord
            ? list.filter((i) => {
                const lowSW = searchWord.toLocaleLowerCase();
                const pinyinDesc = PinyinMatch.match(i.description, searchWord);
                const findDesc = i.description.toLocaleLowerCase().indexOf(lowSW) !== -1;
                const findName = i.code.toLocaleLowerCase().indexOf(lowSW) !== -1;

                return findName || findDesc || pinyinDesc;
              })
            : list
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
