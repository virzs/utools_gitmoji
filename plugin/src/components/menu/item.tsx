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
        "cursor-pointer flex gap-2 items-center px-1 transition rounded",
        "dark:hover:bg-dark-hover dark:hover:text-dark",
        value === selected ? "bg-dark-active-second text-dark" : "dark:text-white"
      )}
      onClick={onClick}
    >
      {icon}
      {label}
    </div>
  );
};

export default Item;
