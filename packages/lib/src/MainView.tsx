import loglevel from "loglevel";
const log = loglevel.getLogger("MainView");
log.setLevel("debug");

import * as CSS from "csstype";
import React, { useEffect, useState } from "react";
import { Layout, Tabs } from "antd";
const { TabPane } = Tabs;
const { Content } = Layout;
import styled from "styled-components";
import { loadCSSFromURLAsync, Loader } from "@airtable/blocks/ui";
import GlobalConfigEditor from "./GlobalConfigEditor";
import ViewportViewer from "./ViewportViewer";
import SessionViewer from "./SessionViewer";
import CursorViewer from "./CursorViewer";
import ActiveTableViewer from "./ActiveTableViewer";
import SelectedRecordViewer from "./SelectedRecordViewer";
import ActiveViewViewer from "./ActiveViewViewer";
import SelectedFieldViewer from "./SelectedFieldViewer";
import SuspenseWrapper from "./SuspenseWrapper";
import BlockFooter from "./BlockFooter";

enum TabType {
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
  && .about {
    max-height: ${(props) => `calc(${props.height} - 64px)`};
    overflow-y: auto;
  }

  && .ant-tabs-nav {
    margin-bottom: 0;
  }

  .ace_editor {
    min-height: 150px;
  }

  .jsoneditor {
    /* position: relative;
    left: -12px; */
    width: 100%;
    height: ${(props) => `calc(${props.height} - 61px)`};
    z-index: 100;
    border: none;
  }

  .jsoneditor-tree::-webkit-scrollbar,
  .about::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .jsoneditor-tree::-webkit-scrollbar-button,
  .about::-webkit-scrollbar-button {
    display: none;
    height: 0;
    width: 0;
  }

  .jsoneditor-tree::-webkit-scrollbar-thumb,
  .about::-webkit-scrollbar-thumb {
    background-color: hsla(0, 0%, 0%, 0.35);
    background-clip: padding-box;
    border: 3px solid rgba(0, 0, 0, 0);
    border-radius: 6px;
    min-height: 36px;
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

  const [antCssLoaded, setAndCssLoaded] = useState(false);

  useEffect(() => {
    log.debug("MainView.useEffect");
    loadCSSFromURLAsync(
      "https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.4/antd.min.css"
    ).then(() => setAndCssLoaded(true));
  }, []);

  const [activeTab, setActiveTab] = useState<string>(
    about != null ? TabType.about : TabType.globalConfig
  );
  // const [activeTab, setActiveTab] = useSynced([
  //   "config",
  //   "supertools",
  //   "activeTab"
  // ]);

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

  const centeredContentStyle: CSS.Properties = {
    // position: "fixed",
    // margin: 0,
    // padding: 0,
    // zIndex: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: style.width,
    height: `calc(${style.height} - 64px)`
  };

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
          // position: "absolute",
          width: "100%",
          height: `calc(${style.height} - 26px)`,
          maxHeight: `calc(${style.height} - 26px)`,
          margin: 0,
          padding: 0,
          backgroundColor: "white"
        }}
      >
        {!antCssLoaded ? (
          <div style={centeredContentStyle}>
            <Loader />
          </div>
        ) : (
          <StyledTabs
            size="small"
            type="card"
            /*
          // @ts-ignore */
            activeKey={activeTab}
            defaultActiveKey={
              about != null ? TabType.about : TabType.globalConfig
            }
            onChange={setActiveTab}
            height={style.height}
            style={{ margin: 0, padding: 0 }}
          >
            {about != null ? (
              <TabPane
                style={{ margin: 0, padding: 0 }}
                tab="About"
                key={TabType.about}
              >
                {about}
              </TabPane>
            ) : null}
            <TabPane
              style={{ margin: 0, padding: 0 }}
              tab="GlobalConfig"
              key={TabType.globalConfig}
            >
              <SuspenseWrapper spinWrapperStyle={centeredContentStyle}>
                <GlobalConfigEditor />
              </SuspenseWrapper>
            </TabPane>
            <TabPane tab="Active table" key={TabType.activeTable}>
              <SuspenseWrapper spinWrapperStyle={centeredContentStyle}>
                <ActiveTableViewer />
              </SuspenseWrapper>
            </TabPane>
            <TabPane tab="Active view" key={TabType.activeView}>
              <SuspenseWrapper spinWrapperStyle={centeredContentStyle}>
                <ActiveViewViewer />
              </SuspenseWrapper>
            </TabPane>
            <TabPane tab="Selected record" key={TabType.selectedRecord}>
              <SuspenseWrapper spinWrapperStyle={centeredContentStyle}>
                <SelectedRecordViewer
                  centeredContentStyle={centeredContentStyle}
                />
              </SuspenseWrapper>
            </TabPane>
            <TabPane tab="Selected field" key={TabType.selectedField}>
              <SuspenseWrapper spinWrapperStyle={centeredContentStyle}>
                <SelectedFieldViewer
                  centeredContentStyle={centeredContentStyle}
                />
              </SuspenseWrapper>
            </TabPane>
            <TabPane tab="Cursor" key={TabType.cursor}>
              <SuspenseWrapper spinWrapperStyle={centeredContentStyle}>
                <CursorViewer />
              </SuspenseWrapper>
            </TabPane>
            <TabPane tab="Session" key={TabType.session}>
              <SuspenseWrapper spinWrapperStyle={centeredContentStyle}>
                <SessionViewer />
              </SuspenseWrapper>
            </TabPane>
            <TabPane tab="Viewport" key={TabType.viewport}>
              <SuspenseWrapper spinWrapperStyle={centeredContentStyle}>
                <ViewportViewer />
              </SuspenseWrapper>
            </TabPane>
          </StyledTabs>
        )}
      </Content>
      <BlockFooter position="absolute" bottom={0} />
    </Layout>
  );
};

export default MainView;
