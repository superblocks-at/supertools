import loglevel from "loglevel";
const log = loglevel.getLogger("SelectedFieldViewer");
// log.setLevel("debug");

import React from "react";
import { cursor } from "@airtable/blocks";
import { base } from "@airtable/blocks";
import { useLoadable, useWatchable, useRecordById } from "@airtable/blocks/ui";

import * as CSS from "csstype";

import JsonEditorWrapper from "./JsonEditorWrapper";
import { fieldJSON } from "./helpers";

export default function SelectedFieldViewer({
  centeredContentStyle
}: {
  centeredContentStyle: CSS.Properties;
}) {
  log.debug("SelectedFieldViewer.render");

  // load selected records and fields
  useLoadable(cursor);
  // re-render whenever the list of selected records or fields changes
  useWatchable(cursor, [
    "activeTableId",
    "selectedRecordIds",
    "selectedFieldIds"
  ]);

  const table = base.getTableByIdIfExists(cursor.activeTableId as any);

  const record = useRecordById(
    table as any,
    cursor.selectedRecordIds.length > 0
      ? cursor.selectedRecordIds[0]
      : ("" as any)
  );

  if (!record || cursor.selectedFieldIds.length == 0) {
    return (
      <div style={centeredContentStyle}>
        <span>No field selected</span>
      </div>
    );
  }

  // @ts-ignore
  const field = table.getFieldById(cursor.selectedFieldIds[0]);

  const json = {
    value: record.getCellValue(field),
    ...fieldJSON(field)
  };

  log.debug("SelectedFieldViewer, json:", json);

  return <JsonEditorWrapper mode="view" value={json} />;
}
