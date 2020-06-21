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

loadCSSFromURLAsync(
  "https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.4/antd.min.css"
).then(() => console.log("ant css loaded"));

enum TabTypes {
  globalConfig = "globalConfig",
  activeTable = "activeTable",
  selectedRecord = "selectedRecord",
  cursor = "cursor",
  session = "session",
  viewport = "viewport"
}

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 0;
  }

  .ace_editor {
    min-height: 150px;
  }

  .jsoneditor {
    /* position: relative;
    left: -12px; */
    height: calc(100vh - 54px);
    width: 100vw;
    z-index: 1;
    border: none;
  }
`;

export const Supertools = () => {
  return (
    <Layout style={{ margin: 0, padding: 0 }}>
      <Content
        style={{
          width: "100%",
          height: "100vh",
          margin: 0,
          padding: 0
        }}
      >
        <StyledTabs
          size="small"
          type="card"
          defaultActiveKey={TabTypes.globalConfig}
          style={{ margin: 0, padding: 0 }}
        >
          <TabPane
            style={{ margin: 0, padding: 0 }}
            tab="GlobalConfig"
            key={TabTypes.globalConfig}
          >
            <GlobalConfigEditor />
          </TabPane>
          <TabPane tab="Active Table" key={TabTypes.activeTable}>
            <ActiveTableViewer />
          </TabPane>
          <TabPane tab="Selected Record" key={TabTypes.selectedRecord}>
            <SelectedRecordViewer />
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
