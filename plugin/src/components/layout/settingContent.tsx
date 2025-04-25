import { FC } from "preact/compat";

interface SettingContentLayoutProps {
  children: any;
}

const SettingContentLayout: FC<SettingContentLayoutProps> = (props) => {
  const { children } = props;

  return <div className="py-2 px-3 h-full overflow-y-auto">{children}</div>;
};

export default SettingContentLayout;
