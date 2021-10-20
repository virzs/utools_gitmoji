/*
 * @Author: Vir
 * @Date: 2021-10-18 22:10:04
 * @Last Modified by: Vir
 * @Last Modified time: 2021-10-20 17:24:04
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

export interface Record {
  start: number;
  end: number;
  total: number;
}

export function App() {
  const { utools } = window;
  const listRef = useRef<RefObject<Ref<HTMLUListElement>> | null>(null);
  const [ready, setReady] = useState<boolean>(false); // 插件是否准备完成
  const [searchText, setSearchText] = useState<string>(""); // 搜索关键字
  const [select, setSelect] = useState<string>(""); // 当前选中的 code 值
  const [activeIndex, setActiveIndex] = useState<number>(0); // 当前选中的下标
  const [offset, setOffset] = useState<number>(0);

  const [showData, setShowData] = useState<SourceData[]>([]); // 用于显示的数据，最大10条
  const [record, setRecord] = useState<Record>({ start: 0, end: 9, total: 10 }); // 记录当前数据

  if (utools)
    utools.onPluginReady(() => {
      setReady(true);
    });

  const setSubInput = () => {
    utools.setSubInput(({ text }: any) => {
      setSearchText(text);
    }, "搜索");
  };

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
    setRecord({
      ...record,
      start: 0,
      end: newData.length > 10 ? 9 : newData.length,
      total: newData.length,
    });
    return newData;
  }, [searchText]);

  // ! 设置显示的数据，最大10条
  const changeShowData = (start: number = 0, end: number = 9, code = "") => {
    const total = filterData.length;
    let privStart = start;
    let privEnd = end;
    if (end >= total) {
      privStart = 0;
      privEnd = total > 10 ? 9 : total;
    }
    const codeIndex = showData.findIndex((i) => i.code === code);
    if (codeIndex !== -1) return;
    const newData = filterData.slice(privStart, total >= 0 ? privEnd + 1 : total);

    if (utools && ready) utools.setExpendHeight(newData.length > 0 ? newData.length * 48 : 48);
    if (newData.length < 10 && newData.length > 11) return;
    setShowData(newData);

    setRecord({
      ...record,
      total,
      start: privStart,
      end: privEnd,
    });
  };

  const getEnabledActiveIndex = (index: number, offset: number = 1): number => {
    const len = filterData.length;

    for (let i = 0; i < len; i += 1) {
      const current = (index + i * offset + len) % len;
      return current;
    }
    setOffset(offset);
    return -1;
  };

  const disposeShow = (offset: number) => {
    if (offset !== 0) {
      const { start, end } = record;
      // ? 判断向上到第一个
      if (start + offset < -1 || (activeIndex === 0 && offset === -1)) return;
      // ? 判断向下到最后一个
      if (activeIndex === filterData.length - 1 && offset === 1) return;
      const nextActiveIndex = getEnabledActiveIndex(activeIndex + offset, offset);
      const nextCode = filterData[nextActiveIndex]?.code;
      if (!nextCode) return;
      changeShowData(start + offset, end + offset, filterData[nextActiveIndex].code);
      setActiveIndex(nextActiveIndex);
      setSelect(nextCode);
    }
  };

  const KeyEventListener = (e: KeyboardEvent) => {
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
        disposeShow(privOffset);
        break;
      case "Enter":
        if (!utools) return;
        utools.hideMainWindow();
        utools.copyText(select);
        utools.showNotification(`已复制 ${select}`);
        utools.outPlugin();
        break;
    }
  };

  const WheelEventListener = (e: WheelEvent) => {
    const { deltaY } = e;
    let privOffset = offset;
    privOffset = deltaY > 0 ? 1 : -1;
    disposeShow(privOffset);
  };

  useEffect(() => {
    if (!ready) return;
    setSubInput();
    utools.setExpendHeight(10 * 48);
    // ! 插件每次进入时初始化
    utools.onPluginEnter(() => {
      utools.setExpendHeight(10 * 48);
      setSearchText("");
      setOffset(0);
      setSelect("");
      setActiveIndex(0);
      setRecord({ start: 0, end: 9, total: 10 });
      changeShowData();
    });
  }, [ready]);

  useEffect(() => {
    changeShowData();
  }, [filterData]);

  useEffect(() => {
    addEventListener("keydown", KeyEventListener);
    addEventListener("wheel", WheelEventListener);
    return () => {
      removeEventListener("keydown", KeyEventListener);
      removeEventListener("wheel", WheelEventListener);
    };
  }, [record, select, activeIndex, filterData, showData]);

  return (
    <div className="dark:bg-dark">
      <List eref={listRef}>
        {showData.map((i, j) => (
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
        {showData.length === 0 && <Empty />}
      </List>
    </div>
  );
}
