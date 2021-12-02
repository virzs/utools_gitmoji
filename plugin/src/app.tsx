/*
 * @Author: Vir
 * @Date: 2021-10-18 22:10:04
 * @Last Modified by: Vir
 * @Last Modified time: 2021-12-02 17:50:17
 */

import { useRef, useState } from "preact/hooks";
import GitEmoji from "./views/gitmoji";
import Setting from "./views/setting";

export type PluginFeaturesCode = "gitmoji" | "setting";

export interface PluginProps {
  utools: UToolsApi;
  ready: boolean;
}

export function App() {
  const { utools } = window;
  let featureGitMoji = useRef<{
    initFeature: (code: PluginFeaturesCode) => void;
  }>();

  const [code, setCode] = useState<PluginFeaturesCode | null>(null); // 当前 featureCode
  const [ready, setReady] = useState<boolean>(false); // 插件是否准备完成

  if (utools) {
    // ! 插件装载成功
    utools.onPluginReady(() => {
      setReady(true);
    });
    // ! 插件进入前台
    utools.onPluginEnter((action) => {
      const { code } = action;
      if (featureGitMoji.current) {
        featureGitMoji.current.initFeature(code as PluginFeaturesCode);
      }
      setCode(code as PluginFeaturesCode);
    });
  }

  // ! 根据 code 渲染 features
  const RenderFeature = () => {
    switch (code) {
      case "gitmoji":
      default:
        return <GitEmoji utools={utools} ready={ready} ref={featureGitMoji} />;
      case "setting":
        return <Setting />;
    }
  };

  return <div className="dark:bg-dark h-full">{RenderFeature()}</div>;
}
