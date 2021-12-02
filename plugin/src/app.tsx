/*
 * @Author: Vir
 * @Date: 2021-10-18 22:10:04
 * @Last Modified by: Vir
 * @Last Modified time: 2021-12-02 17:50:17
 */

import { useEffect, useState } from "preact/hooks";
import GitEmoji from "./views/gitmoji";
import Setting from "./views/setting";

export type PluginFeaturesCode = "gitmoji" | "setting";

export interface PluginProps {
  utools: UToolsApi;
  ready: boolean;
}

export function App() {
  const { utools } = window;

  const [code, setCode] = useState<PluginFeaturesCode | null>(null); // 当前 featureCode
  const [ready, setReady] = useState<boolean>(false); // 插件是否准备完成

  if (utools) {
    utools.onPluginReady(() => {
      console.log("plugin", utools);
      console.log("plugin ready");
      setReady(true);
    });
    utools.onPluginEnter(({ code }) => {
      setCode(code as PluginFeaturesCode);
    });
  }

  const RenderFeature = () => {
    switch (code) {
      case "gitmoji":
      default:
        return <GitEmoji utools={utools} ready={ready} />;
      case "setting":
        return <Setting />;
    }
  };

  return <div className="dark:bg-dark h-full">{RenderFeature()}</div>;
}
