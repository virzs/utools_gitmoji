/*
 * @Author: Vir
 * @Date: 2021-10-18 22:10:00
 * @Last Modified by: Vir
 * @Last Modified time: 2021-10-19 17:45:58
 */

import { FunctionComponent } from "preact";

export interface ListProps {
  children: any;
  eref: any;
}

const List: FunctionComponent<ListProps> = ({ children, eref }) => {
  return (
    <ul className="list-none h-full overflow-y-auto" ref={eref} onMouseDown={(e) => e.stopPropagation()}>
      {children}
    </ul>
  );
};

export default List;
