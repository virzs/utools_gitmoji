/*
 * @Author: vir virs98@outlook.com
 * @Date: 2021-12-02 15:47:19
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2022-07-18 21:04:23
 */

import List from "../../components/list";
import Item from "../../components/listItem";
import data from "../../data.json";
import { useState, useEffect, useMemo, useRef, Ref, useImperativeHandle } from "preact/hooks";
import { forwardRef } from "preact/compat";
import Pinyin from "pinyin-match";
import Empty from "../../components/empty";
import { FunctionComponent, RefObject } from "preact";
import { PluginFeaturesCode, PluginProps } from "../../app";

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

const GitEmoji: FunctionComponent<PluginProps> = (props, ref) => {
  const { utools, ready = false } = props;
  const listRef = useRef<RefObject<Ref<HTMLUListElement>> | null>(null);
  const [searchText, setSearchText] = useState<string>(""); // 搜索关键字
  const [select, setSelect] = useState<string>(""); // 当前选中的 code 值
  const [offset, setOffset] = useState<number>(0);

  const [showData, setShowData] = useState<SourceData[]>([]); // 用于显示的数据，最大10条

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
      title: `${i.emoji} ${i.code}`,
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
    return newData;
  }, [searchText]);
  // ! 设置显示的数据，最大10条

  // 判断需要展示哪些数据
  const disposeShow = (offset: number) => {
    let newData: SourceData[] = JSON.parse(JSON.stringify(showData));

    if (offset !== 0) {
      // 获取当前选中项实际下标
      const realActiveIndex = filterData.findIndex((i) => i.code === select);
      if (offset == -1) {
        const nextActive = realActiveIndex === 0 ? filterData[filterData.length - 1] : filterData[realActiveIndex - 1];
        setSelect(nextActive.code);
        !newData.find((i) => i.code === nextActive.code) && newData.unshift(nextActive);
        newData = newData.slice(0, 10);
      }
      if (offset === 1) {
        const nextActive = realActiveIndex === filterData.length - 1 ? filterData[0] : filterData[realActiveIndex + 1];
        setSelect(nextActive.code);
        !newData.find((i) => i.code === nextActive.code) && newData.push(nextActive);
        newData = newData.slice(-10);
      }
      setShowData(newData);
      if (utools && ready) utools.setExpendHeight(newData.length > 0 ? newData.length * 48 : 48);
    } else {
      const newData = filterData.slice(0, 10);
      setShowData(newData);
      if (utools && ready) utools.setExpendHeight(newData.length * 48);
    }
  };

  // 复制 code 并退出
  const copyAndOut = (code: string) => {
    if (!code) return;
    utools.hideMainWindow();
    utools.copyText(code);
    utools.showNotification(`已复制 ${code}`);
    utools.outPlugin();
  };

  const KeyEventListener = (e: KeyboardEvent) => {
    e.preventDefault();
    const { code, altKey, key, shiftKey } = e;
    switch (code) {
      // ! 按 tab 切换到下一个 shift + tab 切换到上一个
      // ! 按 箭头 上 / 下 切换
      case "ArrowUp":
      case "ArrowDown":
      case "Tab":
        let privOffset = offset;
        if (code === "ArrowUp" || (code === "Tab" && shiftKey)) {
          privOffset = -1;
        } else if (code === "ArrowDown" || code === "Tab") {
          privOffset = 1;
        }
        disposeShow(privOffset);
        break;
      // ! 按 Enter 选中
      case "Enter":
        if (!utools) return;
        copyAndOut(select);
        break;
      // ! 按 Alt + 数字 选中对应
      case "Digit1":
      case "Digit2":
      case "Digit3":
      case "Digit4":
      case "Digit5":
      case "Digit6":
      case "Digit7":
      case "Digit8":
      case "Digit9":
      case "Digit0":
        if (!altKey) return;
        const privKey = Number(key) === 0 ? 9 : Number(key) - 1;
        const altSelect = showData[privKey];
        if (!altSelect) return;
        copyAndOut(altSelect.code);
        break;
    }
  };

  const WheelEventListener = (e: WheelEvent) => {
    const { deltaY } = e;
    let privOffset = offset;
    privOffset = deltaY > 0 ? 1 : -1;
    disposeShow(privOffset);
  };

  const setSubInput = () => {
    utools.setSubInput(({ text }: any) => {
      setSearchText(text);
    }, "搜索");
  };

  const initFeature = (code: PluginFeaturesCode) => {
    if (code === "gitmoji") {
      setSearchText("");
      setSubInput();
    }
    utools.setExpendHeight(10 * 48);
    setOffset(0);
    setSelect(showData[0].code);
    setShowData(filterData.slice(0, 10));
  };

  useEffect(() => {
    disposeShow(offset);
  }, [filterData]);

  // ! 暴露内部方法解决utools只能调用内部生命周期一次的问题
  useImperativeHandle(ref, () => ({
    initFeature(code: PluginFeaturesCode) {
      initFeature(code);
    },
  }));

  useEffect(() => {
    addEventListener("keydown", KeyEventListener);
    addEventListener("wheel", WheelEventListener);
    return () => {
      removeEventListener("keydown", KeyEventListener);
      removeEventListener("wheel", WheelEventListener);
    };
  }, [select, filterData, showData]);

  return (
    <List eref={listRef}>
      {showData.map((i, j) => (
        <Item
          index={j}
          value={select}
          code={i.code}
          title={i.title}
          description={i.description}
          onSelect={(code) => {
            setSelect(code);
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
  );
};

export default forwardRef(GitEmoji);
