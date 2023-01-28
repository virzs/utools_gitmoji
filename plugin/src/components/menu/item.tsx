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
        "cursor-pointer flex gap-2 items-center px-2 py-1 transition-all rounded text-sm",
        "dark:hover:bg-dark dark:hover:text-[#90caf9]",
        value === selected
          ? "bg-[#e7eaed] text-dark dark:bg-[#2b2c2d] dark:text-[#90caf9]"
          : "dark:text-black text-[#ebebeb] dark:bg-[#616161]"
      )}
      onClick={onClick}
    >
      <div className="w-4 h-6 flex justify-center items-center">{icon}</div>
      <span>{label}</span>
    </div>
  );
};

export default Item;
