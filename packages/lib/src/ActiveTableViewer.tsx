import loglevel from "loglevel";
const log = loglevel.getLogger("ActiveTableViewer");
log.setLevel("debug");

import React from "react";
import { base, cursor } from "@airtable/blocks";
import { useWatchable } from "@airtable/blocks/ui";

import JsonEditorWrapper from "./JsonEditorWrapper";
import { fieldJSON, fieldsJSON } from "./helpers";
import { Table, View } from "@airtable/blocks/models";

export default function ActiveTableViewer() {
  log.debug("ActiveTableViewer.render");

  // re-render whenever the list of selected records or fields changes
  useWatchable(cursor, ["activeTableId"]);

  const table = base.getTableByIdIfExists(cursor.activeTableId as any);

  if (!table) {
    return (
      <div style={{ width: "100%", padding: "12px", textAlign: "center" }}>
        "No active table"
      </div>
    );
  }

  return <ActiveTableViewerImpl table={table} />;
}

function ActiveTableViewerImpl({ table }: { table: Table }) {
  log.debug("ActiveTableViewerImpl.render");

  useWatchable(table, ["name"]);

  const json = {
    id: table.id,
    name: table.name,
    url: table.url,
    primaryField: fieldJSON(table.primaryField),
    fields: fieldsJSON(table.fields),
    views: table.views.map((view: View) => view.name)
  };

  log.debug("ActiveTableViewerImpl, json:", json);

  return (
    <div>
      <JsonEditorWrapper mode="view" value={json} />
    </div>
  );
}
