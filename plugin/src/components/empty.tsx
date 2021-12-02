/*
 * @Author: Vir
 * @Date: 2021-10-19 15:17:47
 * @Last Modified by: Vir
 * @Last Modified time: 2021-10-19 15:19:36
 */

import { FunctionComponent } from "preact";

const Empty: FunctionComponent = () => {
  return <div className="h-12 text-sm flex items-center justify-center dark:text-white">没有匹配到的内容</div>;
};

export default Empty;
