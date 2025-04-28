/*
 * @Author: Vir
 * @Date: 2021-12-04 19:46:29
 * @Last Modified by: Vir
 * @Last Modified time: 2021-12-05 12:48:58
 */

import { FunctionComponent } from "preact";

export interface MenuProps {
  dataSource: any[];
  builder: (item: any, index: number) => void;
}

const Menu: FunctionComponent<MenuProps> = (props) => {
  const { dataSource = [], builder } = props;

  return (
    <div className="dark:bg-dark-active bg-white w-full h-full p-1.5 gap-1 flex flex-col border-r border-[#e9e9e9] dark:border-[#313131]">
      {dataSource.map((item, index) => builder(item, index))}
    </div>
  );
};

export default Menu;
