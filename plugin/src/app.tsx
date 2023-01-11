/*
 * @Author: Vir
 * @Date: 2021-10-18 22:10:04
 * @Last Modified by: Vir
 * @Last Modified time: 2021-12-05 12:40:31
 */

import { useEffect, useRef, useState } from "preact/hooks";
import GitEmoji from "./views/gitmoji";
import Setting from "./views/setting";

export type PluginFeaturesCode = "gitmoji" | "gsetting" | "git" | "commit" | "gs";

export interface PluginProps {
  utools: UToolsApi;
  ready: boolean;
}

export function App() {
  const { utools } = window;
  let featureGitMoji = useRef<{
    initFeature: (code: string) => void;
  }>();

  const [code, setCode] = useState<string | null>(null); // 当前 插件code
  const [payload, setPayload] = useState<PluginFeaturesCode | null>(null); // 当前 进入时的关键词
  const [ready, setReady] = useState<boolean>(false); // 插件是否准备完成

  if (utools) {
    // ! 插件装载成功
    utools.onPluginReady(() => {
      setReady(true);
    });
    // ! 插件进入前台
    utools.onPluginEnter((action) => {
      const { code, payload } = action;
      setCode(code);
      setPayload(payload);
    });
  }

  useEffect(() => {
    if (code && featureGitMoji.current) {
      featureGitMoji.current.initFeature(code);
    }
  }, [code, featureGitMoji.current]);

  // ! 根据 code 渲染 features
  const RenderFeature = () => {
    switch (payload) {
      case "gitmoji":
      case "git":
      case "commit":
        return <GitEmoji utools={utools} ready={ready} ref={featureGitMoji} />;
      case "gs":
      case "gsetting":
        return <Setting />;
    }
  };

  return <div className="dark:bg-dark h-full">{RenderFeature()}</div>;
}
