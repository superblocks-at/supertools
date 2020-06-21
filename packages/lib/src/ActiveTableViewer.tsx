import loglevel from "loglevel";
const log = loglevel.getLogger("ActiveTableViewer");
log.setLevel("debug");

import React from "react";
import { cursor } from "@airtable/blocks";
// import { useLoadable, useWatchable } from "@airtable/blocks/ui";
import { useBase, useLoadable, useWatchable } from "@airtable/blocks/ui";

import JsonEditorWrapper from "./JsonEditorWrapper";
import { fieldJSON, fieldsJSON } from "./helpers";

export default function ActiveTableViewer() {
  log.debug("ActiveTableViewer.render");

  const base = useBase();

  // load selected records and fields
  useLoadable(cursor);

  // re-render whenever the list of selected records or fields changes
  useWatchable(cursor, ["activeTableId"]);

  const table = base.getTableByIdIfExists(cursor.activeTableId as any);

  let json: any = "No active table";

  if (table) {
    json = {
      id: table.id,
      name: table.name,
      url: table.url,
      primaryField: fieldJSON(table.primaryField),
      fields: fieldsJSON(table.fields),
      views: table.views.map((view) => view.name)
    };
  }

  log.debug("ActiveTableViewer, json:", json);

  return <JsonEditorWrapper mode="view" value={json} />;
}
