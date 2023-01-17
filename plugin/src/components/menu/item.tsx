/*
 * @Author: Vir
 * @Date: 2021-12-04 19:46:41
 * @Last Modified by: Vir
 * @Last Modified time: 2021-12-05 13:05:42
 */

import classNames from "classnames";
import { FunctionComponent } from "preact";

interface ItemProps {
  icon: any;
  label: string;
  value: any;
  selected: any;
  onClick: () => void;
}

const Item: FunctionComponent<ItemProps> = (props) => {
  const { icon, label, value, selected, onClick } = props;

  return (
    <div
      className={classNames(
        "cursor-pointer flex gap-2 items-center px-2 py-1 transition rounded",
        "dark:hover:bg-dark dark:hover:text-white",
        value === selected ? "bg-[#e7eaed] text-dark dark:bg-[#2b2c2d] dark:text-white" : "dark:text-black"
      )}
      onClick={onClick}
    >
      {icon}
      {label}
    </div>
  );
};

export default Item;
