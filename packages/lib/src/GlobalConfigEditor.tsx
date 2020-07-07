import loglevel from "loglevel";
const log = loglevel.getLogger("GlobalConfigEditor");
// log.setLevel("debug");

import React from "react";
import { useGlobalConfig } from "@airtable/blocks/ui";
import JsonEditorWrapper from "./JsonEditorWrapper";
import { globalConfig } from "@airtable/blocks";

export default function GlobalConfigEditor() {
  const reactiveGlobalConfig = useGlobalConfig();
  const someValue1 = globalConfig.get("isEnforced");
  const someValue2 = reactiveGlobalConfig.get("isEnforced");
  log.debug("GlobalConfigEditor.render, isEnforced:", someValue1, someValue2);
  const kvStore: object = (reactiveGlobalConfig as any)._kvStore;
  log.debug(
    "GlobalConfigEditor.render, reactiveGlobalConfig._kvStore",
    (reactiveGlobalConfig as any)._kvStore,
    "reactiveGlobalConfig:",
    reactiveGlobalConfig
  );

  log.debug(
    "GlobalConfigEditor.render, globalConfig._kvStore",
    (globalConfig as any)._kvStore,
    "globalConfig:",
    globalConfig
  );

  const handleChange = (value: { [key: string]: any }) => {
    log.debug("GlobalConfigEditor.handleChange, value:", value);
    const paths: any = [];
    for (const key in value) {
      if (key.length == 0) continue;
      paths.push({
        path: [key] as any,
        value: value[key]
      });
    }
    const deletedPaths = [];
    for (const existingKey in kvStore) {
      if (!paths.find((obj: any) => obj.path[0] == existingKey)) {
        deletedPaths.push({
          path: [existingKey] as any,
          value: undefined
        });
      }
    }
    paths.splice(0, 0, ...deletedPaths);
    reactiveGlobalConfig.setPathsAsync(paths);
  };

  return (
    <JsonEditorWrapper mode="tree" value={kvStore} onChange={handleChange} />
  );
}
