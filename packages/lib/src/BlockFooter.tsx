import loglevel from "loglevel";

import React from "react";

import styled from "styled-components";

import { Layout, Typography } from "antd";
const { Footer } = Layout;
const { Text } = Typography;

import { StyledLogoWrapper, StyledLogoText } from "./StyledComponents";

const log = loglevel.getLogger("BlockFooter");
log.setLevel("debug");

const StyledLogo = styled.img`
  max-height: 12px;
`;

const StyledFooterLogoText = styled(StyledLogoText)`
  margin-left: 4px;
`;

export default function BlockFooter({
  position = "fixed",
  bottom = 0
}: {
  position?: "fixed" | "absolute" | "relative" | "initial";
  bottom?: number | "initial";
}) {
  log.debug("Footer.render");

  return (
    <Footer
      style={{
        position: position,
        overflow: "hidden",
        bottom: bottom,
        zIndex: 200,
        height: "24px",
        width: "100%",
        backgroundColor: "white",
        boxShadow: "rgba(0,0,0,0.1) 0 -2px 0 0",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: "8px"
      }}
    >
      <Text
        style={{
          verticalAlign: "middle",
          display: "inline-block",
          marginRight: "4px"
        }}
      >
        Powered by:{" "}
      </Text>
      <StyledLogoWrapper href="https://superblocks.at" target="_blank">
        <StyledLogo src="https://superblocks.at/superblocks-logo-180x180/" />
        <StyledFooterLogoText strong={true}>
          Superblocks.at
        </StyledFooterLogoText>
      </StyledLogoWrapper>
    </Footer>
  );
}
