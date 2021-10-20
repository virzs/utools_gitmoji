/*
 * @Author: Vir
 * @Date: 2021-10-18 22:09:56
 * @Last Modified by: Vir
 * @Last Modified time: 2021-10-19 15:41:40
 */

import classNames from "classnames";
import { FunctionComponent } from "preact";

export interface ItemProps {
  value: string;
  code: string;
  title: string;
  description: string;
  onSelect: (code: string) => void;
  onClick: (code: string) => void;
}

const Item: FunctionComponent<ItemProps> = ({ value, code, title, description, onSelect, onClick }) => {
  return (
    <li
      className={classNames("h-12 cursor-pointer pr-16 pl-4 pt-1 select-none transition-all", {
        "bg-gray-200": value === code,
      })}
      onMouseEnter={() => onSelect(code)}
      onClick={() => onClick(code)}
    >
      <div className="text-sm leading-6 h-6">
        <pre>
          <div dangerouslySetInnerHTML={{ __html: title }}></div>
        </pre>
      </div>
      <div className="text-xs leading-4">
        <pre>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </pre>
      </div>
    </li>
  );
};

export default Item;
