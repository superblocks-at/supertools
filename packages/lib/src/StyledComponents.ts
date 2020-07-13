import styled from "styled-components";

import { Typography } from "antd";

export const StyledLink = styled.a`
  opacity: 1;

  &:active,
  &:focus {
    box-shadow: none;
  }

  &:hover {
    opacity: 0.75;
  }
`;

export const StyledLogoWrapper = styled(StyledLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledLogoText = styled(Typography.Text)`
  font-family: "Montserrat", -apple-system, system-ui, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  font-size: 14px;
  margin-left: 6px;
`;
