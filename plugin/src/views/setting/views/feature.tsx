/*
 * @Author: vir virs98@outlook.com
 * @Date: 2023-01-10 14:04:03
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2023-01-10 17:36:09
 */

import { useEffect, useState } from "preact/hooks";
import FormItem from "../../../components/form/item";
import Switch from "../../../components/form/switch";
import defaultSetting from "../../../config/setting";

const Feature = () => {
  const [setting, setSetting] = useState(defaultSetting);

  const { feature, sync } = setting;

  useEffect(() => {
    const d = utools.dbStorage.getItem("setting");
    d && setSetting(d);
  }, []);

  useEffect(() => {
    utools.dbStorage.setItem("setting", setting);
  }, [setting]);

  return (
    <div className="py-2 px-3 h-full overflow-y-auto">
      <FormItem label="复制为字符" description="选择后复制后为表情代码，反之为表情">
        <Switch
          checked={feature.copyToChar}
          onChange={(v) => setSetting({ ...setting, feature: { ...feature, copyToChar: v } })}
        />
      </FormItem>
      <FormItem label="复制后添加空格" description="选择后每次复制在内容后面增加一个空格">
        <Switch
          checked={feature.addSpaceAfterCopy}
          onChange={(v) => setSetting({ ...setting, feature: { ...feature, addSpaceAfterCopy: v } })}
        />
      </FormItem>
    </div>
  );
};

export default Feature;
