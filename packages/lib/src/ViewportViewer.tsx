import loglevel from "loglevel";
const log = loglevel.getLogger("ViewportViewer");
log.setLevel("debug");

import React from "react";
import { useViewport } from "@airtable/blocks/ui";

import JsonEditorWrapper from "./JsonEditorWrapper";

export default function ViewportViewer() {
  log.debug("ViewportViewer.render");

  const viewport = useViewport();

  const json = {
    size: viewport.size,
    isFullscreen: viewport.isFullscreen,
    maxFullscreenSize: viewport.maxFullscreenSize,
    minSize: viewport.minSize,
    isSmallerThanMinSize: viewport.isSmallerThanMinSize
  };

  log.debug("ViewportViewer, json:", json);

  return <JsonEditorWrapper mode="view" value={json} />;
}
