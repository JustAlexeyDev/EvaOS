import React, { useState, useEffect } from 'react';
import './TerminalApp.css';
import data from './history.json';
import WindowManager from '../../Api/Libs/VioletClientManager/Core/Managers/Windows/WindowManager';

const TerminalApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState(data);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('terminalHistory', JSON.stringify(history));
  }, [history]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const Open = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      const newHistory = [...history, { command: inputValue, timestamp: new Date() }];
      setHistory(newHistory);
      setInputValue('');
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleCommand = (command) => {
    switch (command) {
      case 'help':
        return 'Available commands: help, clear';
      case 'clear':
        handleClearHistory();
        return 'History cleared';
      default:
        return `Command not found: ${command}`;
    }
  };

  return (
    <>
      <div>
        <button onClick={Open} className="App--Icon">
          <img src="https://imgs.search.brave.com/lBMtvfMKjqqRM0Ifbd9H7F0AowKI_qWpbWbrCyk7pjY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL1QvdGVybWlu/YWwtbG9nby1EMzkx/OEIxRTNBLXNlZWts/b2dvLmNvbS5wbmc" alt="Logo" />
        </button>
      </div>

      {isOpen && (
        <WindowManager title="Terminal" onClose={handleClose}>
        <div className="Terminal--Container">
          <div className="Terminal--Messages">
            {history.length > 0 && (
              <div>
                {history.map((message, index) => (
                  <div key={index} className="Terminal--Message">
                    <span className='Terminal--Message--User'>{message.command}</span>
                    <span>{handleCommand(message.command)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="Terminal--Inputzone">
            <input type="text" value={inputValue} onChange={handleInputChange} />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
        </WindowManager>
      )}
    </>
  );
};

export default TerminalApp;