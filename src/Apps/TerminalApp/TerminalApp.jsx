import "./VioletUiTest.css";
import React, { useState, useEffect } from 'react';
import WindowManager from '../../Api/Libs/VioletClientManager/Core/Managers/Windows/WindowManager';


const TerminalApp = () => {
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
        <WindowManager title="Terminal" onClose={handleClose}>
          <div className="">



          </div>
        </WindowManager>
      )}
    </>
  );
};

export default TerminalApp;