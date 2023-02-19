/*
 * @Author: Vir
 * @Date: 2021-10-18 22:09:56
 * @Last Modified by: Vir
 * @Last Modified time: 2021-10-20 18:00:05
 */

import { css, cx } from "@emotion/css";
import {
  fa0,
  fa1,
  fa2,
  fa3,
  fa4,
  fa5,
  fa6,
  fa7,
  fa8,
  fa9,
  faA,
  faL,
  faPlus,
  faT,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FunctionComponent } from "preact";
import useTheme from "../hooks/theme";
import CommandIcon from "./icon/command";

export interface ItemProps {
  index: number;
  value: string;
  code: string;
  title: string;
  description: string;
  onSelect: (code: string) => void;
  onClick: (code: string) => void;
}

const Item: FunctionComponent<ItemProps> = ({ index, value, code, title, description, onSelect, onClick }) => {
  const d = useTheme();

  const getNumber = (num: number) => {
    switch (num) {
      case 0:
        return <FontAwesomeIcon icon={fa0} />;
      case 1:
        return <FontAwesomeIcon icon={fa1} />;
      case 2:
        return <FontAwesomeIcon icon={fa2} />;
      case 3:
        return <FontAwesomeIcon icon={fa3} />;
      case 4:
        return <FontAwesomeIcon icon={fa4} />;
      case 5:
        return <FontAwesomeIcon icon={fa5} />;
      case 6:
        return <FontAwesomeIcon icon={fa6} />;
      case 7:
        return <FontAwesomeIcon icon={fa7} />;
      case 8:
        return <FontAwesomeIcon icon={fa8} />;
      case 9:
        return <FontAwesomeIcon icon={fa9} />;
    }
  };

  return (
    <li
      className={classNames(
        "h-12 cursor-pointer pr-4 pl-4 select-none transition-all dark:text-white flex justify-between items-center",
        {
          "bg-gray-200 dark:bg-dark-active": value === code,
        }
      )}
      onMouseEnter={() => onSelect(code)}
      onClick={() => onClick(code)}
    >
      <div className="flex-grow">
        <div className="text-sm leading-6 h-6 font-semibold">
          <pre>
            <div dangerouslySetInnerHTML={{ __html: title }}></div>
          </pre>
        </div>
        <div className="text-xs leading-4">
          <pre>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </pre>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {utools.isMacOs() ? (
          <CommandIcon color={d ? "#fff" : "#333"} />
        ) : (
          <div>
            <FontAwesomeIcon icon={faA} />
            <FontAwesomeIcon icon={faL} />
            <FontAwesomeIcon icon={faT} />
          </div>
        )}
        <FontAwesomeIcon icon={faPlus} />
        {index + 1 === 10 ? getNumber(0) : getNumber(index + 1)}
      </div>
    </li>
  );
};

export default Item;
