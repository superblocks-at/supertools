import { globalConfig } from "@airtable/blocks";
import { initializeBlock } from "@airtable/blocks/ui";
import React from "react";
import { Supertools, Position } from "@superblocks-at/supertools";

function BlockWithSupertools() {
	return (
		<>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
			<div>Type 'd' 3 times fast to open supertools</div>
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
