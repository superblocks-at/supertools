import loglevel from "loglevel";
const log = loglevel.getLogger("SuspenseWrapper");
// log.setLevel("debug");

import * as CSS from "csstype";

import React from "react";

import { Spin } from "antd";

export default function SuspenseWrapper({
  spinWrapperStyle,
  tip = "Loading data",
  children
}: {
  spinWrapperStyle: CSS.Properties;
  tip?: string;
  children?: any;
}) {
  log.debug("SuspenseWrapper.render");

  return (
    // Displays <Spinner> until OtherComponent loads
    <React.Suspense
      fallback={
        <div style={spinWrapperStyle}>
          <Spin tip={tip} />
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
}
