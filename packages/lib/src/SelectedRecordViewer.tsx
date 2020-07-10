import loglevel from "loglevel";
const log = loglevel.getLogger("SelectedRecordViewer");
// log.setLevel("debug");

import React from "react";
import { cursor } from "@airtable/blocks";
import { base } from "@airtable/blocks";
import { useLoadable, useWatchable, useRecordById } from "@airtable/blocks/ui";

import JsonEditorWrapper from "./JsonEditorWrapper";
import { recordJSON } from "./helpers";
import { Table } from "@airtable/blocks/models";

import * as CSS from "csstype";

export default function SelectedRecordViewer({
  centeredContentStyle
}: {
  centeredContentStyle: CSS.Properties;
}) {
  log.debug("SelectedRecordViewer.render");

  // load selected records and fields
  useLoadable(cursor);
  // re-render whenever the list of selected records or fields changes
  useWatchable(cursor, ["activeTableId", "selectedRecordIds"]);

  const table = base.getTableByIdIfExists(cursor.activeTableId as any);

  const record = useRecordById(
    table as any,
    cursor.selectedRecordIds.length > 0
      ? cursor.selectedRecordIds[0]
      : ("" as any)
  );

  if (!record) {
    return (
      <div style={centeredContentStyle}>
        <span>No record selected</span>
      </div>
    );
  }

  const json = {
    id: record.id,
    createdTime: record.createdTime.toISOString(),
    name: record.name,
    url: record.url,
    commentCount: record.commentCount,
    fields: recordJSON(table as Table, record)
  };

  log.debug("SelectedRecordViewer, json:", json);

  return <JsonEditorWrapper mode="view" value={json} />;
}
