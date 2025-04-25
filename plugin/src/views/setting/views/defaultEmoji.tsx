import data from "../../../data.json";
import BaseCard from "../../../components/card/base";
import SettingContentLayout from "../../../components/layout/settingContent";
import CopyText from "../../../components/copy/text";
import { FC, useEffect, useMemo, useState } from "preact/compat";
import Empty from "../../../components/empty";
import { cx } from "@emotion/css";

interface EmojiItemProps {
  dataSource: {
    emoji: string;
    entity: string;
    code: string;
    description_zh: string;
    description_en: string;
    name: string;
    semver: null | string;
  };
  onClick: (code: string) => void;
  value: string[];
}

const EmojiItem: FC<EmojiItemProps> = (props) => {
  const { dataSource, onClick, value = [] } = props;
  const { name, emoji, code, entity, description_en, description_zh } =
    dataSource;

  return (
    <li className="relative">
      <BaseCard title={dataSource.emoji}>
        <button
          className={cx(
            "absolute top-2 right-2 rounded px-2 py-1 text-sm transition-all",
            value.includes(code) ? "bg-green-500" : "bg-red-500"
          )}
          onClick={() => onClick(code)}
        >
          {value.includes(code) ? "显示" : "隐藏"}
        </button>
        <table className="w-full text-sm dark:text-white">
          <tr>
            <td className="w-1/6">简短名称</td>
            <td className="w-3/6">
              <CopyText>{name}</CopyText>
            </td>
            <td className="w-1/6">Emoji</td>
            <td className="w-3/6">
              <CopyText>{emoji}</CopyText>
            </td>
          </tr>
          <tr>
            <td className="w-1/6">简短代码</td>
            <td className="w-1/6">
              <CopyText>{code}</CopyText>
            </td>
            <td className="w-1/6">字符编码</td>
            <td className="w-1/6">
              <CopyText>{entity}</CopyText>
            </td>
          </tr>
          <tr>
            <td className="pt-2">中文简介</td>
            <td className="pt-2" colSpan={3}>
              <CopyText>{description_zh}</CopyText>
            </td>
          </tr>
          <tr>
            <td className="w-1/6">英文简介</td>
            <td colSpan={3}>
              <CopyText>{description_en}</CopyText>
            </td>
          </tr>
        </table>
      </BaseCard>
    </li>
  );
};

const DefaultEmoji = () => {
  const [init, setInit] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const onChange = (code: string) => {
    const has = selected.includes(code);
    let newValue = [...selected];
    if (has) {
      newValue = newValue.filter((i) => i !== code);
    } else {
      newValue.push(code);
    }
    setSelected(newValue);
  };

  useEffect(() => {
    const d = utools.dbStorage.getItem("hide_emoji");
    d && setSelected(d);
    setInit(true);
  }, []);

  useEffect(() => {
    utools.dbStorage.setItem("hide_emoji", selected);
  }, [selected]);

  const hideEmoji = useMemo(() => {
    return data.filter((i) => selected.includes(i.code));
  }, [selected]);

  const showEmoji = useMemo(() => {
    return data.filter((i) => !selected.includes(i.code));
  }, [selected]);

  return (
    <SettingContentLayout>
      <h1 className="font-bold mb-2 dark:text-white">已隐藏的表情</h1>
      <div>
        {init && hideEmoji.length > 0 ? (
          <ul>
            {hideEmoji.map((i, j) => (
              <EmojiItem
                dataSource={i}
                key={j}
                onClick={onChange}
                value={selected}
              />
            ))}
          </ul>
        ) : (
          <Empty />
        )}
      </div>
      <h1 className="font-bold mb-2 dark:text-white">全部表情</h1>
      <div>
        {init && showEmoji.length > 0 ? (
          <ul>
            {showEmoji.map((i, j) => (
              <EmojiItem
                dataSource={i}
                key={j}
                onClick={onChange}
                value={selected}
              />
            ))}
          </ul>
        ) : (
          <Empty />
        )}
      </div>
    </SettingContentLayout>
  );
};

export default DefaultEmoji;
