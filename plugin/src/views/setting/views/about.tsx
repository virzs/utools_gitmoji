/*
 * @Author: vir virs98@outlook.com
 * @Date: 2023-01-28 13:46:07
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2023-01-28 14:31:45
 */

import BaseCard from "../../../components/card/base";
import SettingContentLayout from "../../../components/layout/settingContent";
import packageData from "../../../../package.json";
import { FC } from "preact/compat";
import { cx } from "@emotion/css";
import logo from "../../../../logo.png";

interface ItemProps {
  label: string;
  value: string;
  href?: string;
}

const Item: FC<ItemProps> = (props) => {
  const { label, value, href } = props;

  return (
    <div className="flex justify-start items-center mb-1 text-sm dark:text-white">
      <div className="w-1/6 flex-shrink-0">{label}</div>
      <div
        className={cx("flex-grow transition-all", href ? "cursor-pointer hover:text-blue-500" : "")}
        onClick={() => {
          href && utools.shellOpenExternal(href);
        }}
      >
        {value}
      </div>
    </div>
  );
};

const About = () => {
  const openLink = (url: string) => {
    utools.shellOpenExternal(url);
  };

  return (
    <SettingContentLayout>
      <div className="flex justify-center items-center mt-2 mb-4 flex-col">
        <img className="block w-16 h-16 mb-1" src={logo} />
        <h2 className="dark:text-white">gitmoji</h2>
      </div>
      <BaseCard title="关于">
        <Item label="作者" value="Vir" href="https://github.com/virzs" />
        <Item
          label="仓库地址"
          value="https://github.com/virzs/utools_gitmoji"
          href="https://github.com/virzs/utools_gitmoji"
        />
        <Item label="参考" value="https://gitmoji.js.org/en-US/" href="https://gitmoji.js.org/en-US/" />
        <Item label="查找Emoji" value="https://www.emojiall.com/" href="https://www.emojiall.com/" />
        <Item
          label="意见反馈"
          value="https://github.com/virzs/utools_gitmoji/issues/new"
          href="https://github.com/virzs/utools_gitmoji/issues/new"
        />
      </BaseCard>
      <BaseCard title="项目依赖">
        {Object.entries(packageData.dependencies).map(([key, value], j: number) => (
          <div
            className="flex justify-between items-center mb-1 dark:text-white cursor-pointer hover:text-blue-500 transition-all text-sm"
            key={j}
            onClick={() => {
              openLink(`https://www.npmjs.com/package/${key}`);
            }}
          >
            <div>{key}</div>
            <div>{value}</div>
          </div>
        ))}
      </BaseCard>
      <BaseCard title="开发依赖">
        {Object.entries(packageData.devDependencies).map(([key, value], j) => (
          <div
            className="flex justify-between items-center mb-1 dark:text-white cursor-pointer hover:text-blue-500 transition-all text-sm"
            key={j}
            onClick={() => {
              openLink(`https://www.npmjs.com/package/${key}`);
            }}
          >
            <div>{key}</div>
            <div>{value}</div>
          </div>
        ))}
      </BaseCard>
    </SettingContentLayout>
  );
};

export default About;
