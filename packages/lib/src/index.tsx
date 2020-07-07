import loglevel from "loglevel";
const log = loglevel.getLogger("Supertools");
// log.setLevel("debug");

import React, { useEffect, useState } from "react";
import MainView, { Position, MainViewProps } from "./MainView";

export { Position } from "./MainView";

export { default as SuspenseWrapper } from "./SuspenseWrapper";

export interface SupertoolsProps extends MainViewProps {
  shortcutKey?: string;
  timeout?: number;
  show?: boolean;
}

export const Supertools = ({
  shortcutKey = "d",
  timeout = 500,
  position = Position.bottom,
  overlap = 100,
  show = false,
  about
}: SupertoolsProps) => {
  const [keystrokes, setKeystrokes] = useState<number>(0);
  const [timeoutID, setTimeoutID] = useState<number | null>(null);
  const [display, setDisplay] = useState<boolean>(show);
  log.debug(
    "Supertools.render, shortcutKey:",
    shortcutKey,
    ", timeout:",
    timeout,
    ", keystrokes:",
    keystrokes,
    ", timeoutID:",
    timeoutID,
    "display:",
    display
  );

  if (keystrokes >= 3) {
    log.debug("Supertools.render: reached max keystrokes to switch display");
    setKeystrokes(0);
    setDisplay(!display);
  }

  useEffect(() => {
    function onTimeout() {
      log.debug("Supertools.onTimeout, keystrokes:", keystrokes);
      setTimeoutID(null);
      setKeystrokes(0);
    }

    function onKeydown(event: KeyboardEvent) {
      log.debug(
        "Supertools.onKeydown, key:",
        event.key,
        ", keystrokes:",
        keystrokes
      );
      if (timeoutID) {
        clearTimeout(timeoutID);
        setTimeoutID(null);
      }
      if (event.key == shortcutKey) {
        log.debug("Supertools.onKeydown: pressed shortcut key");
        if (keystrokes < 2) {
          log.debug("Supertools.onKeydown: setting up timer");
          const newTimeoutId: number = setTimeout(onTimeout, timeout);
          setTimeoutID(newTimeoutId);
        }
        setKeystrokes(keystrokes + 1);
      } else {
        setKeystrokes(0);
      }
    }

    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  });

  if (!display) {
    return null;
  }

  return <MainView position={position} overlap={overlap} about={about} />;
};
