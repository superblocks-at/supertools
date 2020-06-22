import loglevel from "loglevel";
const log = loglevel.getLogger("MainView");
log.setLevel("debug");

import * as CSS from "csstype";
import React from "react";
import { Layout, Tabs } from "antd";
const { TabPane } = Tabs;
const { Content } = Layout;
import styled from "styled-components";
import { loadCSSFromURLAsync } from "@airtable/blocks/ui";
import GlobalConfigEditor from "./GlobalConfigEditor";
import ViewportViewer from "./ViewportViewer";
import SessionViewer from "./SessionViewer";
import CursorViewer from "./CursorViewer";
import ActiveTableViewer from "./ActiveTableViewer";
import SelectedRecordViewer from "./SelectedRecordViewer";
import ActiveViewViewer from "./ActiveViewViewer";
import SelectedFieldViewer from "./SelectedFieldViewer";

loadCSSFromURLAsync(
  "https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.4/antd.min.css"
).then(() => log.debug("antd css loaded"));

enum TabTypes {
  globalConfig = "globalConfig",
  activeTable = "activeTable",
  activeView = "activeView",
  selectedRecord = "selectedRecord",
  selectedField = "selectedField",
  cursor = "cursor",
  session = "session",
  viewport = "viewport"
}

const StyledTabs = styled(Tabs)<{ height: string }>`
  .ant-tabs-nav {
    margin-bottom: 0;
  }

  .ace_editor {
    min-height: 150px;
  }

  .jsoneditor {
    /* position: relative;
    left: -12px; */
    width: 100%;
    height: ${(props) => `calc(${props.height} - 54px)`};
    /* height: calc(100% - 54px); */
    z-index: 100;
    border: none;
  }
`;

export enum Position {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right"
}

export interface MainViewProps {
  position?: Position;
  overlap?: number;
}

const MainView = ({
  position = Position.top,
  overlap = 100
}: MainViewProps) => {
  log.debug("MainView.render");

  const style: CSS.Properties = {
    position: "fixed",
    margin: 0,
    padding: 0,
    zIndex: 100
  };

  if (position == Position.top || position == Position.bottom) {
    style.width = "100%";
    style.height = `${overlap}vh`;
    if (position == Position.top) {
      style.top = 0;
      style.left = 0;
    } else {
      style.bottom = 0;
      style.left = 0;
    }
  } else {
    style.height = "100vh";
    style.width = `${overlap}vw`;
    if (position == Position.left) {
      style.top = 0;
      style.left = 0;
    } else {
      style.top = 0;
      style.right = 0;
    }
  }

  if (overlap < 100) {
    switch (position) {
      case Position.top:
        style.boxShadow = "0 2px 0 0 rgba(0, 0, 0, 0.1)";
        break;

      case Position.bottom:
        style.boxShadow = "0 -2px 0 0 rgba(0, 0, 0, 0.1)";
        break;

      case Position.left:
        style.boxShadow = "2px 0 0 0 rgba(0, 0, 0, 0.1)";
        break;

      case Position.right:
        style.boxShadow = "-2px 0 0 0 rgba(0, 0, 0, 0.1)";
        break;
    }
  }

  return (
    <Layout style={style}>
      <Content style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
        <StyledTabs
          size="small"
          type="card"
          defaultActiveKey={TabTypes.globalConfig}
          height={style.height}
          style={{ margin: 0, padding: 0 }}
        >
          <TabPane
            style={{ margin: 0, padding: 0 }}
            tab="GlobalConfig"
            key={TabTypes.globalConfig}
          >
            <GlobalConfigEditor />
          </TabPane>
          <TabPane tab="Active table" key={TabTypes.activeTable}>
            <ActiveTableViewer />
          </TabPane>
          <TabPane tab="Active view" key={TabTypes.activeView}>
            <ActiveViewViewer />
          </TabPane>
          <TabPane tab="Selected record" key={TabTypes.selectedRecord}>
            <SelectedRecordViewer />
          </TabPane>
          <TabPane tab="Selected field" key={TabTypes.selectedField}>
            <SelectedFieldViewer />
          </TabPane>
          <TabPane tab="Cursor" key={TabTypes.cursor}>
            <CursorViewer />
          </TabPane>
          <TabPane tab="Session" key={TabTypes.session}>
            <SessionViewer />
          </TabPane>
          <TabPane tab="Viewport" key={TabTypes.viewport}>
            <ViewportViewer />
          </TabPane>
        </StyledTabs>
      </Content>
    </Layout>
  );
};

export default MainView;
