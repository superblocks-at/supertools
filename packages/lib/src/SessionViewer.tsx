import loglevel from "loglevel";
const log = loglevel.getLogger("SessionViewer");
log.setLevel("debug");

import React from "react";
import { session } from "@airtable/blocks";

import JsonEditorWrapper from "./JsonEditorWrapper";

export default function SessionViewer() {
  log.debug("SessionViewer.render");

  const json = {
    currentUser: session.currentUser,
    id: session.id,
    isDeleted: session.isDeleted
  };

  log.debug("SessionViewer, json:", json);

  return <JsonEditorWrapper mode="view" value={json} />;
}
