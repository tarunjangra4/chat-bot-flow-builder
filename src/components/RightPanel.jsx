import React, { useState } from "react";
import { useDrag } from "react-dnd";
import SettingsPanel from "./SettingsPanel";
import NodePanel from "./NodePanel";

const RightPanel = ({ id, msg, setMsg, isSettingPanel, setIsSettingPanel }) => {
  // it will provide us the refrence of the dragging node that we will drag from the nodes panel.
  const [{ isDragging }, drag] = useDrag({
    type: "textNode",
    item: { type: "textNode", id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div className="w-[30%] border-l border-t border-black">
      {!isSettingPanel ? (
        <NodePanel setIsSettingPanel={setIsSettingPanel} />
      ) : (
        <SettingsPanel
          ref={drag}
          msg={msg}
          setMsg={setMsg}
          setIsSettingPanel={setIsSettingPanel}
          isDragging={isDragging}
        />
      )}
    </div>
  );
};

export default RightPanel;
