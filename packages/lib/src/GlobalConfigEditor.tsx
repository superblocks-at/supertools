import React from "react";
import { useGlobalConfig } from "@airtable/blocks/ui";
import JsonEditorWrapper from "./JsonEditorWrapper";
import { GlobalConfigUpdate } from "@airtable/blocks/dist/types/src/types/global_config";

export default function GlobalConfigEditor() {
  const globalConfig = useGlobalConfig();
  const kvStore: object = (globalConfig as any)._kvStore;

  const handleChange = (value: object) => {
    console.log("handleChange", value);
    const paths: GlobalConfigUpdate[] = [];
    for (const key in value) {
      if (key.length == 0) continue;
      paths.push({
        path: [key] as any,
        value: value[key]
      });
    }
    const deletedPaths = [];
    for (const existingKey in kvStore) {
      if (!paths.find((obj) => obj.path[0] == existingKey)) {
        deletedPaths.push({
          path: [existingKey] as any,
          value: undefined
        });
      }
    }
    paths.splice(0, 0, ...deletedPaths);
    globalConfig.setPathsAsync(paths);
  };

  return (
    <JsonEditorWrapper mode="tree" value={kvStore} onChange={handleChange} />
  );
}
