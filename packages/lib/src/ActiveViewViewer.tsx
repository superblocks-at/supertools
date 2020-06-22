import loglevel from "loglevel";
const log = loglevel.getLogger("ActiveViewViewer");
log.setLevel("debug");

import React from "react";
import { base, cursor } from "@airtable/blocks";
import { useWatchable, useViewMetadata } from "@airtable/blocks/ui";

import JsonEditorWrapper from "./JsonEditorWrapper";
import { fieldsJSON } from "./helpers";
import { View } from "@airtable/blocks/models";

export default function ActiveViewViewer() {
  log.debug("ActiveViewViewer.render");

  // re-render whenever the list of selected records or fields changes
  useWatchable(cursor, ["activeTableId", "activeViewId"]);

  const table = base.getTableByIdIfExists(cursor.activeTableId as any);

  let view = null;

  if (table) {
    view = table.getViewByIdIfExists(cursor.activeViewId as any);
  }

  if (!view) {
    return (
      <div style={{ width: "100%", padding: "12px", textAlign: "center" }}>
        "No active view"
      </div>
    );
  }

  return <ActiveViewViewerImpl view={view} />;
}

function ActiveViewViewerImpl({ view }: { view: View }) {
  log.debug("ActiveViewViewerImpl.render");

  useWatchable(view, ["name"]);

  const meta = useViewMetadata(view);

  useWatchable(meta, ["visibleFields", "allFields"]);

  const json = {
    id: view.id,
    name: view.name,
    type: view.type,
    url: view.url,
    metadata: {
      isDataLoaded: meta.isDataLoaded,
      visibleFields: fieldsJSON(meta.visibleFields),
      allFields: fieldsJSON(meta.allFields)
    }
  };

  log.debug("ActiveViewViewerImpl, json:", json);

  return <JsonEditorWrapper mode="view" value={json} />;
}
