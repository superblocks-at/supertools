import loglevel from "loglevel";
const log = loglevel.getLogger("ViewportViewer");
log.setLevel("debug");
import React, { useState } from "react";

import { loadCSSFromString, loadCSSFromURLAsync } from "@airtable/blocks/ui";
import Editor from "./JsonEditor";

loadCSSFromURLAsync("https://unpkg.com/jsoneditor@9.0.0/dist/jsoneditor.css");

loadCSSFromString(`
`);

export default function JsonEditorWrapper({
  mode,
  value,
  onChange
}: {
  mode: string;
  value: object | string;
  onChange?: Function;
}) {
  log.debug("JsonEditorWrapper.render");

  const [jsonEditor, setJsonEditor] = useState(null);

  let valueProp: { value?: object | string } | null = null;

  if (mode == "view") {
    if (jsonEditor != null) {
      // @ts-ignore
      jsonEditor.set(value);
      // @ts-ignore
      jsonEditor.expandAll();
    }
  } else {
    valueProp = {
      value: value
    };
  }

  return (
    <Editor
      mode={mode}
      onChange={onChange}
      jsonEditorRef={setJsonEditor}
      {...valueProp}
    />
  );
}
