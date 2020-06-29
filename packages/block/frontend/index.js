import { globalConfig } from "@airtable/blocks";
import { initializeBlock, Text, Link, Heading, Box } from "@airtable/blocks/ui";
import React from "react";
import { Supertools, Position } from "@superblocks-at/supertools";
import BlockActiveTableViewer from "./ActiveTableViewer";

function BlockWithSupertools() {
	return (
		<>
			<Box
				display="flex"
				flexDirection="row"
				alignItems="center"
				height="32px"
				width="100%"
				boxShadow="rgba(0,0,0,0.1) 0 2px 0 0"
				marginBottom="2px"
				paddingLeft={3}
			>
				<img
					height="16px"
					src="https://superblocks.at/superblocks-logo-180x180/"
				/>
				<Heading size="xsmall" marginLeft={2}>
					API explorer by{" "}
					<Link variant="light" href="https://superblocks.at" fontWeight="bold">
						Superblocks.at
					</Link>
				</Heading>
			</Box>
			<Box
				padding={3}
				display="flex"
				flexDirection="column"
				alignItems="center"
			>
				<Heading>About this block</Heading>
				<Text size="large" textAlign="center" marginTop={3}>
					The functionality of this block is provided by the{" "}
					<Link href="https://www.npmjs.com/package/@superblocks-at/supertools">
						@superblocks-at/supertools
					</Link>{" "}
					npm package.
				</Text>
				<Text size="large" textAlign="center" marginTop={3}>
					This package can be added to any custom block. In addition to an API
					explorer it also provides a <strong>GlobalConfig editor</strong> that
					will be available in development AND in release mode.
				</Text>
				<Text size="large" textAlign="center" marginTop={3}>
					To add supertools to your custom block, follow the installation
					instructions on the package's{" "}
					<Link href="https://www.npmjs.com/package/@superblocks-at/supertools">
						npm page
					</Link>
					.
				</Text>
				<Text size="xlarge" textAlign="center" marginTop={3} fontWeight="bold">
					To open/close the api explorer and see supertools in action here, type
					'ddd' fast.
				</Text>
			</Box>
			<Supertools
			// shortcutKey="d"
			// timeout="500"
			// position={Position.bottom}
			// overlap={70}
			/>
		</>
	);
}

globalConfig
	.setAsync("config", "myConfig")
	.then(() => initializeBlock(() => <BlockWithSupertools />));
