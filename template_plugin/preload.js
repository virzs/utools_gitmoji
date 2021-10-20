/*
 * @Author: Vir
 * @Date: 2021-10-15 20:54:29
 * @Last Modified by: Vir
 * @Last Modified time: 2021-10-16 00:11:33
 */
const data = require("./data.json");
const PinyinMatch = require("pinyin-match");

const emojiList = data.map((i) => ({
  title: `${i.emoji} Shortcode: ${i.code}`,
  description: `${i.description_zh} (${i.description_en})`,
  code: i.code,
}));

window.exports = {
  gitmoji: {
    mode: "list",
    args: {
      enter: (action, callbackSetList) => {
        // 显示 gitmoji 列表
        callbackSetList(emojiList);
      },
      // 子输入框内容变化时被调用 可选 (未设置则无搜索)
      search: (action, searchWord, callbackSetList) => {
        callbackSetList(
          searchWord
            ? emojiList.filter((i) => {
                const lowSW = searchWord.toLocaleLowerCase();
                const pinyinDesc = PinyinMatch.match(i.description, searchWord);
                const findDesc = i.description.toLocaleLowerCase().indexOf(lowSW) !== -1;
                const findName = i.code.toLocaleLowerCase().indexOf(lowSW) !== -1;

                return findName || findDesc || pinyinDesc;
              })
            : emojiList
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
