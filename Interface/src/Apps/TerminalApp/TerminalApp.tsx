import './TerminalApp.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { osversion } from '../../config';
import logo from './Terminal.svg';
import data from './history.json';
import WindowManager from '../../Api/Libs/VioletClientKernel/Core/Managers/Windows/WindowManager';
import VioletUiLoadingBar from "../../Api/Libs/VioletUiLib/Libs/uiElements/ProgressBars/LoadingBar/VioletUiLoadingBar";
import AsciiArt from '../../Api/Libs/VioletClientKernel/Components/AsciiArt';
import { NetworkUsage } from '../../Api/Libs/VioletClientKernel/Core/Scripts/NetworkUsage';
import { TerminalOfFiles } from '../../Api/Libs/VioletClientKernel/Core/FileSystem/TerminalOfFiles'; 

interface HistoryItem {
  command: string;
  timestamp: Date;
}

const TerminalApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>(data);
  const [inputValue, setInputValue] = useState('');
  const [updateProgress, setUpdateProgress] = useState(0);
  const [networkUsage, setNetworkUsage] = useState(0);
  const [networkHistory, setNetworkHistory] = useState<number[]>([]);
  const navigate = useNavigate();
  const userLogged = localStorage.getItem("user");
  const version = "3.012.21-Unstable";
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fsSimulator = new TerminalOfFiles();

  useEffect(() => {
    fsSimulator.loadFromLocalStorage(); 
    localStorage.setItem('terminalHistory', JSON.stringify(history));
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const usage = NetworkUsage();
      const usageNumber = parseFloat(usage);
      if (!isNaN(usageNumber)) {
        setNetworkUsage(usageNumber);
        setNetworkHistory(prev => [...prev, usageNumber].slice(-10));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClose = () => setIsOpen(false);
  const openTerminal = () => setIsOpen(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newHistory = [...history, { command: inputValue, timestamp: new Date() }];
      setHistory(newHistory);
      setInputValue('');
      handleCommand(inputValue);
    }
  };

  const update = () => {
    localStorage.setItem("osversion", osversion);
    return `Update ${osversion} installed. `;
  };

  const handleClearHistory = () => setHistory([]);

  const remove = (command: string) => {
    const args = command.split(' ');
    const cleardata = () => {
      localStorage.removeItem('fogotQuestion');
      localStorage.removeItem('user');
      localStorage.removeItem('password');
      setHistory([]);
      navigate("/userDataNotFound");
    }
    if (args[1] === 'user') {
      const password: string = args[2];
      const storedPassword: any = localStorage.getItem('password');
      if (password !== storedPassword) {
        return { error: true, message: "Incorrect password. User removal failed." };
      } else {
        cleardata();
        return "User data removed.";
      }

    }
    return { error: true, message: "Cmdlet remove at command pipeline position 1 Supply values for the following parameters: InputObject[1]:" };
  };

  const logout = () => navigate("/Login");

  const handleCommand = (command: string) => {
    const args = command.split(' ');
    let result;
    switch (args[0]) {
      case 'version': result = `Version of terminal - ${version}`; break;
      case 'help': result = args.length > 1 ? handleHelpCommand(args[1]) : "Available commands: help, clear, logout, remove, send, version, update, netstat, pwd, ls, mkdir, touch, export, import, cd"; break;
      case 'clear':
        handleClearHistory();
        result = 'History cleared';
        break;
      case 'remove': result = remove(command); break;
      case 'logout':
        logout();
        result = 'Logging out..';
        break;
      case 'send': 
        if (args.length === 1) {
          result = { error: true, message:`Cmdlet Write-Output at command pipeline position 1\nSupply values for the following parameters:\nargs[1]:`};
        } else {
          result = args.slice(1).join(' ');
        }
        break;
      case 'update': result = update(); break;
      case 'netstat': 
        result = `Internet consumption: ${networkUsage} KB\nHistory: ${networkHistory.join(', ')}`;
        break;
      case 'pwd': result = fsSimulator.pwd(); break;
      case 'ls': result = fsSimulator.ls(); break;
      case 'mkdir': 
        try {
          fsSimulator.mkdir(args[1]);
          fsSimulator.saveToLocalStorage();
          result = (
            <>
              Directory <span className="newdir"><u>{args[1]}</u></span> created.
            </>
          );
        } catch (e: any) {
          result = { error: true, message: e.message };
        }
      break;
      case 'touch': 
        try {
          fsSimulator.touch(args[1]);
          fsSimulator.saveToLocalStorage(); // Сохранение после изменения
          result = (
            <>
              File <span className="newdir"><u>{args[1]}</u></span> created.
            </>
          );
        } catch (e: any) {
          result = { error: true, message: e.message };
        }
      break;
      case 'export': 
        try {
          fsSimulator.export(args[1]);
          result = `File ${args[1]} exported.`;
        } catch (e: any) {
          result = { error: true, message: e.message };
        }
        break;
      case 'import': 
        try {
          fsSimulator.import(args[1]);
          fsSimulator.saveToLocalStorage(); // Сохранение после изменения
          result = `File ${args[1]} updated.`;
        } catch (e: any) {
          result = { error: true, message: e.message };
        }
        break;
      case 'cd': 
        try {
          fsSimulator.cd(args[1]);
          fsSimulator.saveToLocalStorage(); // Сохранение после изменения
          result = `Changed directory to ${fsSimulator.pwd()}`;
        } catch (e: any) {
          result = { error: true, message: e.message };
        }
        break;
      default: result = { error: true, message: `The term "${command}" is not recognized as the name of a cmdlet, function, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again. At line:1 char:1` };
    }
    return result;
  };

  const handleHelpCommand = (cmd: string) => {
    switch (cmd) {
      case 'send': return 'send [args..] - display text';
      case 'clear': return 'clear - clear console';
      case 'logout': return 'logout - logout from account';
      case 'remove': return 'remove [args..] [password] - remove data';
      case 'version': return 'version - display current version of terminal';
      case 'update': return 'update - system update';
      case 'netstat': return 'netstat - display internet consumption';
      case 'pwd': return 'pwd - display current directory path';
      case 'ls': return 'ls - list directory contents';
      case 'mkdir': return 'mkdir [name] - create a new directory';
      case 'touch': return 'touch [name] - create a new file';
      case 'export': return 'export [name] - export file content to HTML';
      case 'import': return 'import [name] - import content into a file';
      case 'cd': return 'cd [path] - change directory';
      default: return { error: true, message: `Help not found for command: ${cmd}` };
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSend();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fsSimulator.loadFromLocalStorage(); 
    localStorage.setItem('terminalHistory', JSON.stringify(history));
    scrollToBottom();
  }, [history]);

  return (
    <>
      <div>
        <button onClick={openTerminal} className="App--Icon">
          <img src={logo} alt="Logo" />
        </button>
      </div>

      {isOpen && (
        <WindowManager title="Terminal" onClose={handleClose} description={version}>
          <div className="Terminal--Container">
            <div className='Terminal--Box'>
              <div className="Terminal--Messages" ref={messagesEndRef}>
                <AsciiArt />
                {history.map((message, index) => {
                  const result = handleCommand(message.command);
                  return (
                    <div key={index} className="Terminal--Message">
                      <span className='Terminal--Message--User'>{userLogged}{`${fsSimulator.pwd()}: `}</span>
                      <span className='Terminal--Message--Callback'>{`${message.command}`}</span>
                      {typeof result === 'object' && 'error' in result ? (
                        <span className="Terminal--Message--Error">{result.message}</span>
                      ) : (
                        <span>{result}</span>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
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