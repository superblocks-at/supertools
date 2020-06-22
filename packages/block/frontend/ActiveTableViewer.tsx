import loglevel from "loglevel";
const log = loglevel.getLogger("ActiveTableViewer");
log.setLevel("debug");

import React from "react";
import { base, cursor } from "@airtable/blocks";
import { useWatchable } from "@airtable/blocks/ui";

import { Table } from "@airtable/blocks/models";

export default function BlockActiveTableViewer() {
	// log.debug("ActiveTableViewer.render");

	// re-render whenever the list of selected records or fields changes
	useWatchable(cursor, ["activeTableId"]);

	const table = base.getTableByIdIfExists(cursor.activeTableId as any);

	if (!table) {
		return <span>"No active table"</span>;
	}

	return <BlockActiveTableViewerImpl table={table} />;
}

function BlockActiveTableViewerImpl({ table }: { table: Table }) {
	// log.debug("ActiveTableViewerImpl.render");

	useWatchable(table, ["name"]);

	return <span>Active table name: {table.name}</span>;
}
