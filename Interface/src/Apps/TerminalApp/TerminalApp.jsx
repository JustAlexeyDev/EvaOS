import "./TerminalApp.css";
import React, { useState, useEffect } from 'react';
import WindowManager from '../../Api/Libs/VioletClientManager/Core/Managers/Windows/WindowManager';
import data from './history.json';

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
          <img src="https://imgs.search.brave.com/lBMtvfMKjqqRM0Ifbd9H7F0AowKI_qWpbWbrCyk7pjY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL1QvdGVybWlu/YWwtbG9nby1EMzkx/OEIxRTNBLXNlZWts/b2dvLmNvbS5wbmc" alt="Logo"/>
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