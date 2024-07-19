import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './TerminalApp.css';
import data from './history.json';
import WindowManager from '../../Api/Libs/VioletClientManager/Core/Managers/Windows/WindowManager';
import VioletUiLoadingBar from "../../Api/Libs/VioletUiLib/Libs/uiElements/ProgressBars/LoadingBar/VioletUiLoadingBar";
import { osversion } from '../../config';

const TerminalApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState(data);
  const [inputValue, setInputValue] = useState('');
  const [updateProgress, setUpdateProgress] = useState(0);
  const navigate = useNavigate();
  const userLogged = localStorage.getItem("user");
  const updateIntervalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('terminalHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    return () => clearInterval(updateIntervalRef.current);
  }, []);

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
    return 'Updating...';
  };

  const handleClearHistory = () => setHistory([]);

  const removeUser = () => {
    localStorage.removeItem('fogotQuestion');
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    setIsOpen(false);
    if (!userLogged) navigate("/");
  };

  const logout = () => navigate("/Login");

  const handleCommand = (command) => {
    const args = command.split(' ');
    switch (args[0]) {
      case 'version':
        return 'Version of terminal - 1.000.02';
      case 'help':
        return args.length > 1 ? handleHelpCommand(args[1]) : 'Available commands: help, clear, logout, removeUser, send, version, update';
      case 'clear':
        handleClearHistory();
        return 'History cleared';
      case 'removeUser':
        removeUser();
        return 'Removing user...';
      case 'logout':
        logout();
        return 'Logging out..';
      case 'send':
        return args.slice(1).join(' ');
      case 'update':
        return update();
      default:
        return `Command not found: ${command}`;
    }
  };

  const handleHelpCommand = (cmd) => {
    switch (cmd) {
      case 'send': return 'send [args] - вывести текст';
      case 'clear': return 'clear - очистить консоль';
      case 'logout': return 'logout - выйти из учетной записи';
      case 'removeUser': return 'removeUser - удалить пользователя';
      case 'version': return 'version - вывести текующую версию терминала';
      case 'update': return 'update - обновить систему';
      default: return `Help not found for command: ${cmd}`;
    }
  };

  const handleKeyPress = (e) => e.key === 'Enter' && handleSend();

  return (
    <>
      <div>
        <button onClick={openTerminal} className="App--Icon">
          <img src="https://imgs.search.brave.com/lBMtvfMKjqqRM0Ifbd9H7F0AowKI_qWpbWbrCyk7pjY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL1QvdGVybWlu/YWwtbG9nby1EMzkx/OEIxRTNBLXNlZWts/b2dvLmNvbS5wbmc" alt="Logo" />
        </button>
      </div>

      {isOpen && (
        <WindowManager title="Terminal" onClose={handleClose}>
          <div className="Terminal--Container">
            <div className="Terminal--Messages">
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
        </WindowManager>
      )}
    </>
  );
};

export default TerminalApp;