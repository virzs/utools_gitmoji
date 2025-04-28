import { FunctionComponent } from "preact";
import { useState, useEffect, useMemo } from "preact/hooks";
import Menu from "../../components/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faInfo, faSmile } from "@fortawesome/free-solid-svg-icons";
import Feature from "./views/feature";
import DefaultEmoji from "./views/defaultEmoji";
import About from "./views/about";
import MyEmoji from "./views/myEmoji";

const Setting: FunctionComponent = () => {
  const { Item } = Menu;

  const [value, setValue] = useState<string>("");

  const dataSource = [
    {
      icon: <FontAwesomeIcon icon={faBars} />,
      label: "功能",
      value: "feature",
    },
    {
      icon: <FontAwesomeIcon icon={faSmile} />,
      label: "默认表情",
      value: "default_emoji",
    },
    // { icon: <FontAwesomeIcon icon={faSmile} />, label: "我的表情", value: "my_emoji" },
    { icon: <FontAwesomeIcon icon={faInfo} />, label: "关于", value: "about" },
  ];

  const renderContent = useMemo(() => {
    switch (value) {
      case "feature":
        return <Feature />;
      case "default_emoji":
        return <DefaultEmoji />;
      case "my_emoji":
        return <MyEmoji />;
      case "about":
        return <About />;
      default:
        return <div></div>;
    }
  }, [value]);

  useEffect(() => {
    setValue(dataSource[0].value);
  }, []);

  return (
    <div className="flex h-screen border-t border-[#e9e9e9] dark:border-[#313131] overflow-hidden">
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
