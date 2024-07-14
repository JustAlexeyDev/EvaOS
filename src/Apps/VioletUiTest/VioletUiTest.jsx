import React, { useState } from 'react';
import WindowManager from '../../Api/Libs/VioletClientManager/Core/Managers/Windows/WindowManager';
import "./VioletUiTest.css";

import VioletUiLoadingBar from '../../Api/Libs/VioletUiLib/Libs/uiElements/ProgressBars/VioletUiLoadingBar';

const VioletUiTest = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const Open =() => {
    setIsOpen(true);
  }

  return (
    <>
        <div>
        <button onClick={Open} className="App--Icon">
          <img alt="Logo"/>
        </button>
      </div>
      {isOpen && (
        <WindowManager title="VioletUiTestApp" onClose={handleClose}>
          <div className="">

            <VioletUiLoadingBar />

          </div>
        </WindowManager>
      )}
    </>
  );
};

export default VioletUiTest;