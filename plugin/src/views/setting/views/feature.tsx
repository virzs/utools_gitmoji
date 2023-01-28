/*
 * @Author: vir virs98@outlook.com
 * @Date: 2023-01-10 14:04:03
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2023-01-28 13:53:14
 */

import { useEffect, useState } from "preact/hooks";
import BaseCard from "../../../components/card/base";
import FormItem from "../../../components/form/item";
import Switch from "../../../components/form/switch";
import SettingContentLayout from "../../../components/layout/settingContent";
import defaultSetting from "../../../config/setting";

const Feature = () => {
  const [setting, setSetting] = useState(defaultSetting);

  const { feature, sync } = setting;

  const onChange = (key: string, value: any) => {
    setSetting({ ...setting, feature: { ...feature, [key]: value } });
  };

  useEffect(() => {
    const d = utools.dbStorage.getItem("setting");
    d && setSetting(d);
  }, []);

  useEffect(() => {
    utools.dbStorage.setItem("setting", setting);
  }, [setting]);

  return (
    <SettingContentLayout>
      <BaseCard>
        <FormItem label="复制为字符" description="选择后复制后为表情代码，反之为表情">
          <Switch checked={feature.copyToChar} onChange={(v) => onChange("copyToChar", v)} />
        </FormItem>
        <FormItem label="复制后添加空格" description="选择后每次复制在内容后面增加一个空格">
          <Switch checked={feature.addSpaceAfterCopy} onChange={(v) => onChange("addSpaceAfterCopy", v)} />
        </FormItem>
        <FormItem label="自动粘贴" description="选择后将自动粘贴到焦点处，请确认焦点位置正确">
          <Switch checked={feature.autoPaste} onChange={(v) => onChange("autoPaste", v)} />
        </FormItem>
      </BaseCard>
    </SettingContentLayout>
  );
};

export default Feature;
