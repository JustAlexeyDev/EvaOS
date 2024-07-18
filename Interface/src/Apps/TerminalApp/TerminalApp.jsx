import "src/Apps/TerminalApp/TerminalApp.css";
import React, { useState, useEffect } from 'react';
import WindowManager from 'src/Api/Libs/VioletClientManager/Core/Managers/Windows/WindowManager';
import data from 'src/Apps/TerminalApp/history.json';

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
          <div className="Terminal--Container">

            <div className="Terminal--Container--Messanges">
                {data.leigth > 0 && (
                    <div>
                        {data.map((messages) => (
                            <div className="Terminal--Container--Messanges">
                                {messages.command}
                                dlajksndkas
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="Terminal--Container--Inputzone">
                <input type="text" />
                <button>Send</button>
            </div>

          </div>
        </WindowManager>
      )}
    </>
  );
};

export default TerminalApp;