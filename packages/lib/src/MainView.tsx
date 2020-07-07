import loglevel from "loglevel";
const log = loglevel.getLogger("MainView");
// log.setLevel("debug");

import * as CSS from "csstype";
import React from "react";
import { Layout, Tabs } from "antd";
const { TabPane } = Tabs;
const { Content } = Layout;
import styled from "styled-components";
import { loadCSSFromURLAsync, useSynced } from "@airtable/blocks/ui";
import GlobalConfigEditor from "./GlobalConfigEditor";
import ViewportViewer from "./ViewportViewer";
import SessionViewer from "./SessionViewer";
import CursorViewer from "./CursorViewer";
import ActiveTableViewer from "./ActiveTableViewer";
import SelectedRecordViewer from "./SelectedRecordViewer";
import ActiveViewViewer from "./ActiveViewViewer";
import SelectedFieldViewer from "./SelectedFieldViewer";
import SuspenseWrapper from "./SuspenseWrapper";

loadCSSFromURLAsync(
  "https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.4/antd.min.css"
).then(() => log.debug("antd css loaded"));

enum TabTypes {
  about = "about",
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
  about?: any;
}

const MainView = ({
  position = Position.top,
  overlap = 100,
  about
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

  const spinWrapperStyle: CSS.Properties = {
    // position: "fixed",
    // margin: 0,
    // padding: 0,
    // zIndex: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: style.width,
    height: `calc(${style.height} - 38px)`
  };

  const [activeTab, setActiveTab] = useSynced([
    "config",
    "supertools",
    "activeTab"
  ]);

  // if (style.top != null) {
  //   spinWrapperStyle.top = "38px";
  // } else {
  //   spinWrapperStyle.bottom = style.bottom;
  // }
  // if (style.left != null) {
  //   spinWrapperStyle.left = style.left;
  // } else {
  //   spinWrapperStyle.right = style.right;
  // }

  // eslint-disable-next-line
  return (
    <Layout style={style}>
      <Content
        style={{
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0
        }}
      >
        <StyledTabs
          size="small"
          type="card"
          /*
          // @ts-ignore */
          activeKey={activeTab}
          defaultActiveKey={
            about != null ? TabTypes.about : TabTypes.globalConfig
          }
          onChange={setActiveTab}
          height={style.height}
          style={{ margin: 0, padding: 0 }}
        >
          {about != null ? (
            <TabPane
              style={{ margin: 0, padding: 0 }}
              tab="About"
              key={TabTypes.about}
            >
              {about}
            </TabPane>
          ) : null}
          <TabPane
            style={{ margin: 0, padding: 0 }}
            tab="GlobalConfig"
            key={TabTypes.globalConfig}
          >
            <SuspenseWrapper spinWrapperStyle={spinWrapperStyle}>
              <GlobalConfigEditor />
            </SuspenseWrapper>
          </TabPane>
          <TabPane tab="Active table" key={TabTypes.activeTable}>
            <SuspenseWrapper spinWrapperStyle={spinWrapperStyle}>
              <ActiveTableViewer />
            </SuspenseWrapper>
          </TabPane>
          <TabPane tab="Active view" key={TabTypes.activeView}>
            <SuspenseWrapper spinWrapperStyle={spinWrapperStyle}>
              <ActiveViewViewer />
            </SuspenseWrapper>
          </TabPane>
          <TabPane tab="Selected record" key={TabTypes.selectedRecord}>
            <SuspenseWrapper spinWrapperStyle={spinWrapperStyle}>
              <SelectedRecordViewer />
            </SuspenseWrapper>
          </TabPane>
          <TabPane tab="Selected field" key={TabTypes.selectedField}>
            <SuspenseWrapper spinWrapperStyle={spinWrapperStyle}>
              <SelectedFieldViewer />
            </SuspenseWrapper>
          </TabPane>
          <TabPane tab="Cursor" key={TabTypes.cursor}>
            <SuspenseWrapper spinWrapperStyle={spinWrapperStyle}>
              <CursorViewer />
            </SuspenseWrapper>
          </TabPane>
          <TabPane tab="Session" key={TabTypes.session}>
            <SuspenseWrapper spinWrapperStyle={spinWrapperStyle}>
              <SessionViewer />
            </SuspenseWrapper>
          </TabPane>
          <TabPane tab="Viewport" key={TabTypes.viewport}>
            <SuspenseWrapper spinWrapperStyle={spinWrapperStyle}>
              <ViewportViewer />
            </SuspenseWrapper>
          </TabPane>
        </StyledTabs>
      </Content>
    </Layout>
  );
};

export default MainView;
