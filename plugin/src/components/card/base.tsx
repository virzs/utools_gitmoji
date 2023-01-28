/*
 * @Author: vir virs98@outlook.com
 * @Date: 2023-01-28 13:47:04
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2023-01-28 14:32:02
 */

import { FC } from "preact/compat";

interface BaseCardProps {
  children: any;
  title?: string;
}

const BaseCard: FC<BaseCardProps> = (props) => {
  const { children, title } = props;

  return (
    <div className="dark:bg-[#515151] dark:text-white mb-2 rounded p-2">
      {title && <h1 className="font-bold mb-2">{title}</h1>}
      {children}
    </div>
  );
};

export default BaseCard;
