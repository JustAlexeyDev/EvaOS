import './TerminalApp.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { osversion } from '../../config';
import logo from './Terminal.svg';
import data from './history.json';
import WindowManager from '../../Api/Libs/VioletClientManager/Core/Managers/Windows/WindowManager';
import VioletUiLoadingBar from "../../Api/Libs/VioletUiLib/Libs/uiElements/ProgressBars/LoadingBar/VioletUiLoadingBar";
import AsciiArt from '../../Api/Libs/VioletClientManager/Components/AsciiArt';

const TerminalApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState(data);
  const [inputValue, setInputValue] = useState('');
  const [updateProgress, setUpdateProgress] = useState(0);
  const navigate = useNavigate();
  const userLogged = localStorage.getItem("user");
  const version = "1.004.09";

  useEffect(() => {
    localStorage.setItem('terminalHistory', JSON.stringify(history));
  }, [history]);

  const handleClose = () => setIsOpen(false);
  const openTerminal = () => setIsOpen(true);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newHistory = [...history, { command: inputValue, timestamp: new Date() }];
      setHistory(newHistory);
      setInputValue('');
    }
  };

  const update = () => {
    localStorage.setItem("osversion", osversion);
    return `Update ${osversion} installed. `;
  };

  const handleClearHistory = () => setHistory([]);

  const remove = (command) => {
    const args = command.split(' ');
    switch(args[1]) {
      case 'user':
        localStorage.removeItem('fogotQuestion');
        localStorage.removeItem('user');
        localStorage.removeItem('password');
        setHistory([]);
        setIsOpen(false);
        if (!userLogged) navigate("/userDataNotFound");
        return "User data removed.";
      default: return "Syntax error. There's too few arguments.";
    }
  };

  const logout = () => navigate("/Login");

  const handleCommand = (command) => {
    const args = command.split(' ');
    switch (args[0]) {
      case 'version': return `Version of terminal - ${version}`;
      case 'help': return args.length > 1 ? handleHelpCommand(args[1]) : "Available commands: help [args...], clear, logout, remove [args...], send [args...], version, update";
      case 'clear':
        handleClearHistory();
        return 'History cleared';
      case 'remove': return remove(command);
      case 'logout':
        logout();
        return 'Logging out..';
      case 'send': return args.slice(1).join(' ');
      case 'update': return update();
      default: return `Command not found: ${command}`;
    }
  };

  const handleHelpCommand = (cmd) => {
    switch (cmd) {
      case 'send': return 'send [args..] - display text';
      case 'clear': return 'clear - clear console';
      case 'logout': return 'logout - logout from account';
      case 'remove': return 'remove [args..] - user';
      case 'version': return 'version - display current version of terminal';
      case 'update': return 'update - system update';
      default: return `Help not found for command: ${cmd}`;
    }
  };

  const handleKeyPress = (e) => e.key === 'Enter' && handleSend();

  return (
    <>
      <div>
        <button onClick={openTerminal} className="App--Icon">
          <img src={logo} alt="Logo" />
        </button>
      </div>

      {isOpen && (
        <WindowManager title="Terminal" onClose={handleClose}>
          <div className="Terminal--Container">
            <div className='Terminal--Box'>
              <div className="Terminal--Messages">
                <AsciiArt />
                {history.map((message, index) => (
                  <div key={index} className="Terminal--Message">
                    <span className='Terminal--Message--User'>{`${userLogged}: `}</span>
                    <span className='Terminal--Message--Callback'>{`${message.command}`}</span>
                    <span>{handleCommand(message.command)}</span>
                  </div>
                ))}
              </div>      
              {updateProgress > 0 && updateProgress < 100 && (
                <VioletUiLoadingBar progress={updateProgress} />
              )}
              <div className="Terminal--Inputzone">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Press Enter to send"
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
          </div>
        </WindowManager>
      )}
    </>
  );
};

export default TerminalApp;