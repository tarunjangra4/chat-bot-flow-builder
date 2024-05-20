import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const NodePanel = (props) => {
  const { setIsSettingPanel } = props;

  return (
    <div className="pt-10">
      <button
        className="w-40 h-20 border border-blue-600 text-blue-600 rounded-lg ml-10"
        onClick={() => setIsSettingPanel(true)}
      >
        <FontAwesomeIcon icon={faCommentDots} />
        <p>Message</p>
      </button>
    </div>
  );
};

export default NodePanel;
