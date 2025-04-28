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
        <FormItem
          label="复制为字符"
          description="选择复制后为表情代码，否则为表情。"
        >
          <Switch
            checked={feature.copyToChar}
            onChange={(v) => onChange("copyToChar", v)}
          />
        </FormItem>
        <FormItem label="复制后添加空格" description="复制后内容增加空格。">
          <Switch
            checked={feature.addSpaceAfterCopy}
            onChange={(v) => onChange("addSpaceAfterCopy", v)}
          />
        </FormItem>
        <FormItem
          label="自动粘贴"
          description="复制后自动粘贴到焦点处，请确认焦点位置。"
        >
          <Switch
            checked={feature.autoPaste}
            onChange={(v) => onChange("autoPaste", v)}
          />
        </FormItem>
        <FormItem label="消息通知" description="复制成功时会弹出通知。">
          <Switch
            checked={feature.notification}
            onChange={(v) => onChange("notification", v)}
          />
        </FormItem>
      </BaseCard>
    </SettingContentLayout>
  );
};

export default Feature;
