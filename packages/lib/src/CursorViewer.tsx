import loglevel from "loglevel";
const log = loglevel.getLogger("CursorViewer");
log.setLevel("debug");

import React from "react";
import { cursor } from "@airtable/blocks";
import { useLoadable, useWatchable } from "@airtable/blocks/ui";

import JsonEditorWrapper from "./JsonEditorWrapper";

export default function CursorViewer() {
  log.debug("CursorViewer.render");

  // load selected records and fields
  useLoadable(cursor);
  // re-render whenever the list of selected records or fields changes
  useWatchable(cursor, [
    "activeTableId",
    "activeViewId",
    "selectedRecordIds",
    "selectedFieldIds"
  ]);

  const json = {
    activeTableId: cursor.activeTableId,
    activeViewId: cursor.activeViewId,
    selectedRecordIds: cursor.selectedRecordIds,
    selectedFieldIds: cursor.selectedFieldIds,
    id: cursor.id,
    isDataLoaded: cursor.isDataLoaded,
    isDeleted: cursor.isDeleted
  };

  log.debug("CursorViewer, json:", json);

  return <JsonEditorWrapper mode="view" value={json} />;
}
