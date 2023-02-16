/*
 * @Author: Vir
 * @Date: 2021-10-18 22:09:56
 * @Last Modified by: Vir
 * @Last Modified time: 2021-10-20 18:00:05
 */

import { css, cx } from "@emotion/css";
import classNames from "classnames";
import { FunctionComponent } from "preact";
import useTheme from "../hooks/theme";
import SvgIcon from "./svgIcon";

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
      <div className="flex items-center align-text-top">
        {utools.isMacOs() ? (
          <SvgIcon
            className={cx(
              "w-8 h-8",
              css`
                .st0,
                g,
                path {
                  fill: #fff;
                  stroke: #fff;
                  color: #fff;
                }
              `
            )}
            name="command"
            color="#fff"
          />
        ) : (
          "ALT"
        )}
        + {index + 1 === 10 ? 0 : index + 1}
      </div>
    </li>
  );
};

export default Item;
