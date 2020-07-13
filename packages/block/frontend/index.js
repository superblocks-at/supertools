import { globalConfig } from "@airtable/blocks";
import { initializeBlock, Text, Link, Heading, Box } from "@airtable/blocks/ui";
import React from "react";
import { Supertools, Position } from "@superblocks-at/supertools";
import BlockActiveTableViewer from "./ActiveTableViewer";
import { name, version, displayName } from "../package.json";
import styled from "styled-components";

const StyledLink = styled.a`
  opacity: 1;

  &:active,
  &:focus {
    box-shadow: none;
  }

  &:hover {
    opacity: 0.75;
  }
`;

function Header() {
	return <Box
		display="flex"
		flexDirection="row"
		alignItems="center"
		height="32px"
		width="100%"
		boxShadow="rgba(0,0,0,0.1) 0 2px 0 0"
		marginBottom="2px"
		paddingLeft={3}
	>
		<StyledLink display="contents" href="https://superblocks.at/" target="_blank">
			<img
				height="16px"
				src="https://superblocks.at/superblocks-logo-180x180/"
				style={{ position: "relative", top: "-2px" }}
			/>
			<Heading size="xsmall" marginLeft={2} display="inline">
				Blocks api explorer
			{/* <Link variant="light" href="https://superblocks.at" fontWeight="bold">
				Superblocks.at
			</Link> */}
			</Heading>
		</StyledLink>
	</Box>
}

function About() {
	return (
		<Box
			className="about"
			padding={3}
			display="flex"
			flexDirection="column"
			alignItems="center"
		>
			<Text size="large" textAlign="center">
				The functionality of this block is provided by the{" "}
				<Link
					size="large"
					href="https://www.npmjs.com/package/@superblocks-at/supertools"
					target="_blank"
				>
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
				To add supertools to <strong>your custom block</strong>, follow the
				installation instructions on the package's{" "}
				<Link
					size="large"
					href="https://www.npmjs.com/package/@superblocks-at/supertools"
					target="_blank"
				>
					npm page
				</Link>
				.
			</Text>
		</Box>
	);
}

function BlockWithSupertools() {
	return (
		<Supertools
			show={true}
			header={<Header />}
			about={<About />}
		// shortcutKey="d"
		// timeout="500"
		// position={Position.bottom}
		// overlap={70}
		/>
	);
}

initializeBlock(() => <BlockWithSupertools />);
