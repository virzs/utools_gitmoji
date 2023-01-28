/*
 * @Author: vir virs98@outlook.com
 * @Date: 2023-01-28 13:49:38
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2023-01-28 13:52:27
 */

import { FC } from "preact/compat";

interface SettingContentLayoutProps {
  children: any;
}

const SettingContentLayout: FC<SettingContentLayoutProps> = (props) => {
  const { children } = props;

  return <div className="py-2 px-3 h-full overflow-y-auto">{children}</div>;
};

export default SettingContentLayout;
