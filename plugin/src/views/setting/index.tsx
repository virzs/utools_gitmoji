/*
 * @Author: Vir
 * @Date: 2021-12-02 17:02:52
 * @Last Modified by: Vir
 * @Last Modified time: 2021-12-21 10:34:30
 */

// ,
//     {
//       "code": "setting",
//       "explain": "gitemoji 功能设置",
//       "icon": "logo.png",
//       "cmds": ["gs", "gitmoji-setting"]
//     }

import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import Menu from "../../components/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

const Setting: FunctionComponent = () => {
  const { Item } = Menu;

  const [value, setValue] = useState<string>("");

  const dataSource = [{ icon: <FontAwesomeIcon icon={faPalette} />, label: "样式", value: "style" }];

  return (
    <div className="flex h-screen">
      <div className="flex h-screen w-50">
        <Menu
          dataSource={dataSource}
          builder={(item, index) => (
            <Item
              key={index}
              {...item}
              selected={value}
              onClick={() => {
                setValue(item.value);
              }}
            />
          )}
        />
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};

export default Setting;
