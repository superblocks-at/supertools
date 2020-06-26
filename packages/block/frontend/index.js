import { globalConfig } from "@airtable/blocks";
import { initializeBlock } from "@airtable/blocks/ui";
import React from "react";
import { Supertools, Position } from "@superblocks-at/supertools";
import BlockActiveTableViewer from "./ActiveTableViewer";

function BlockWithSupertools() {
	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					height: "100vh",
				}}
			>
				<span>Type 'ddd' fast to open/close supertools</span>
				<BlockActiveTableViewer />
			</div>
			<Supertools
				shortcutKey="d"
				timeout="500"
				// position={Position.bottom}
				// overlap={70}
			/>
		</>
	);
}

globalConfig
	.setAsync("config", "myConfig")
	.then(() => initializeBlock(() => <BlockWithSupertools />));
