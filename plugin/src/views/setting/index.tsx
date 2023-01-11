/*
 * @Author: Vir
 * @Date: 2021-12-02 17:02:52
 * @Last Modified by: Vir
 * @Last Modified time: 2021-12-21 10:34:30
 */

import { FunctionComponent } from "preact";
import { useState, useEffect, useMemo } from "preact/hooks";
import Menu from "../../components/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPalette } from "@fortawesome/free-solid-svg-icons";
import Switch from "../../components/form/switch";
import Feature from "./views/feature";

const Setting: FunctionComponent = () => {
  const { Item } = Menu;

  const [value, setValue] = useState<string>("");

  const dataSource = [
    { icon: <FontAwesomeIcon icon={faBars} />, label: "功能", value: "feature" },
    // { icon: <FontAwesomeIcon icon={faPalette} />, label: "样式", value: "style" },
  ];

  const renderContent = useMemo(() => {
    switch (value) {
      case "feature":
        return <Feature />;
      default:
        return <div></div>;
    }
  }, [value]);

  useEffect(() => {
    setValue(dataSource[0].value);
  }, []);

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
      <div className="flex-grow">{renderContent}</div>
    </div>
  );
};

export default Setting;
