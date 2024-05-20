import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SettingsPanel = React.forwardRef((props, ref) => {
  const { msg, setMsg, setIsSettingPanel, isDragging } = props;

  // just updating the message of the node
  const handleOnChange = (e) => {
    setMsg(e.target.value);
  };

  return (
    <>
      <div className="relative flex justify-center border-b border-black px-4 py-2">
        <button
          className="absolute left-3"
          onClick={() => setIsSettingPanel(false)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <p>Message</p>
      </div>
      <div className="px-4 border-b border-black">
        <p className="pt-4 pb-3">Text</p>
        <textarea
          className="w-full h-20 border border-black mb-2"
          value={msg}
          onChange={handleOnChange}
        />
      </div>
      {msg && (
        <div
          ref={ref}
          className={`node ${
            isDragging ? "bg-blue-300" : ""
          } min-w-40 min-h-20 border-2 text-blue-900 font-medium px-1 mx-4 mt-4 rounded break-words cursor-move select-none`}
        >
          {msg}
        </div>
      )}
    </>
  );
});

export default SettingsPanel;
