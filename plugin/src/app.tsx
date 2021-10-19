/*
 * @Author: Vir
 * @Date: 2021-10-18 22:10:04
 * @Last Modified by: Vir
 * @Last Modified time: 2021-10-19 18:00:32
 */
import List from "./components/list";
import Item from "./components/listItem";
import data from "./data.json";
import { useState, useEffect, useMemo, useRef, Ref } from "preact/hooks";
import Pinyin from "pinyin-match";
import Empty from "./components/empty";
import { RefObject } from "preact";

export interface SourceData {
  title: string;
  description: string;
  code: string;
}

export function App() {
  const { utools } = window;
  const listRef = useRef<RefObject<Ref<HTMLUListElement>> | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [select, setSelect] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);

  const setSubInput = () => {
    utools.setSubInput(({ text }: any) => {
      setSearchText(text);
    }, "搜索");
  };

  if (utools)
    utools.onPluginReady(() => {
      setReady(true);
    });

  // 替换模板
  const templete = (val: any) => `<font class='text-red-500 font-semibold'>${val}</font>`;

  // 替换拼音匹配内容
  const replaceStr = (str: string, start: number, stop: number) => {
    const replace = str.slice(start, stop + 1);
    return str.substr(0, start) + templete(replace) + str.substr(stop + 1);
  };

  // 直接替换
  const keywordscolorful = (str: string, key: string) => {
    var reg = new RegExp("(" + key + ")", "g");
    var newstr = str.replace(reg, templete("$1"));
    return newstr;
  };

  // 格式化数据
  const sourceData: SourceData[] = useMemo(() => {
    return data.map((i) => ({
      title: `${i.emoji} Shortcode: ${i.code}`,
      description: `${i.description_zh} (${i.description_en})`,
      code: i.code,
    }));
  }, [data]);

  // 根据关键词过滤
  const filterData: SourceData[] = useMemo(() => {
    const newData = !searchText
      ? sourceData
      : sourceData
          .filter((i) => {
            const lowSW = searchText.toLocaleLowerCase();
            // ! 匹配拼音、中英文
            const pinyinMatch = Pinyin.match(i.description, searchText);
            const findDesc = i.description.toLocaleLowerCase().indexOf(lowSW) !== -1;
            const findName = i.code.toLocaleLowerCase().indexOf(lowSW) !== -1;

            return findName || findDesc || pinyinMatch;
          })
          .map((i) => {
            const pinyinMatch = Pinyin.match(i.description, searchText);

            let newDesc = "";

            if (typeof pinyinMatch === "object" && pinyinMatch.length === 2) {
              newDesc = replaceStr(i.description, pinyinMatch[0], pinyinMatch[1]);
            } else {
              newDesc = keywordscolorful(i.description, searchText);
            }
            return {
              code: i.code,
              title: keywordscolorful(i.title, searchText),
              description: newDesc,
            };
          });

    // ! 数据变化时重新选择
    setSelect(newData.length > 0 ? newData[0].code : "");
    setActiveIndex(0);

    if (utools && ready)
      utools.setExpendHeight(newData.length > 10 ? 10 * 48 : newData.length > 0 ? newData.length * 48 : 48);

    return newData;
  }, [searchText]);

  // const scrollIntoView = (code: string, index: number) => {
  //   if (listRef.current) {
  //     setSelect(filterData[index].code);
  //     setActiveIndex(index);
  //     if (filterData.length > 10 && code === "ArrowDown") {
  //       switch (code) {
  //         case "ArrowDown":
  //           listRef.current.scrollTo({ top: index * 48 - 432 });
  //           break;
  //         case "ArrowUp":
  //           listRef.current.scrollTo({ top: -(index * 48) });
  //           break;
  //       }
  //     }
  //   }
  // };

  // const onKeyDown = (code: string) => {
  //   if (!listRef.current) return;
  //   if (code === "ArrowUp") {
  //     scrollIntoView(code, activeIndex <= 0 ? 0 : activeIndex - 1);
  //   }
  //   if (code === "ArrowDown") {
  //     scrollIntoView(code, activeIndex >= filterData.length - 1 ? activeIndex : activeIndex + 1);
  //   }
  // };

  const getEnabledActiveIndex = (index: number, offset: number = 1): number => {
    const len = filterData.length;

    for (let i = 0; i < len; i += 1) {
      const current = (index + i * offset + len) % len;
      return current;
    }
    setOffset(offset);
    return -1;
  };

  const scrollIntoView = (index: number) => {
    if (listRef.current) {
      let scroll = 0;
      if (index < 10) scroll = 0;
      if (index > 10) scroll = index * 48 - 432;
      listRef.current.scrollTo({ top: scroll });
    }
  };

  const EventListener = (e: KeyboardEvent) => {
    const { code } = e;
    switch (code) {
      case "ArrowUp":
      case "ArrowDown":
        let privOffset = offset;
        if (code === "ArrowUp") {
          privOffset = -1;
        } else if (code === "ArrowDown") {
          privOffset = 1;
        }

        if (privOffset !== 0) {
          const nextActiveIndex = getEnabledActiveIndex(activeIndex + privOffset, privOffset);
          scrollIntoView(nextActiveIndex);
          setActiveIndex(nextActiveIndex);
          setSelect(filterData[nextActiveIndex].code);
        }
        break;
      case "Enter":
        if (!utools) return;
        utools.hideMainWindow();
        utools.copyText(select);
        utools.showNotification(`已复制 ${select}`);
        utools.outPlugin();
        break;
    }
    // onKeyDown(e.code);
  };

  useEffect(() => {
    if (!ready) return;
    setSubInput();
  }, [ready]);

  useEffect(() => {
    addEventListener("keydown", EventListener);
    return () => removeEventListener("keydown", EventListener);
  }, [select, activeIndex, filterData]);

  return (
    <List eref={listRef}>
      {filterData.map((i, j) => (
        <Item
          value={select}
          code={i.code}
          title={i.title}
          description={i.description}
          onSelect={(code) => {
            setSelect(code);
            setActiveIndex(j);
          }}
          onClick={(code) => {
            if (!utools) return;
            utools.hideMainWindow();
            utools.copyText(code);
            utools.showNotification(`已复制 ${code}`);
            utools.outPlugin();
          }}
        />
      ))}
      {filterData.length === 0 && <Empty />}
    </List>
  );
}
