import "./VioIDEApp.css";
import React, { useState } from 'react';
import WindowManager from '../../Api/Libs/VioletClientKernel/Core/Managers/Windows/WindowManager';

const VioIDEApp = () => {
  const version = "0.000.01 - Unsatble"
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleClose = () => setIsOpen(false);
  const Open = () => setIsOpen(true);

  const runCode = () => {
    let consoleOutput = '';
    const originalConsoleLog = console.log;

    // Переопределяем console.log
    console.log = (...args) => {
      consoleOutput += args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ') + '\n';
      originalConsoleLog(...args); // Опционально: оставляем возможность вывода в консоль браузера
    };

    try {
      const result = new Function(code)();
      if (result !== undefined) {
        consoleOutput += result + '\n';
      }
    } catch (error) {
      consoleOutput += `Error: ${error.message}\n`;
    } finally {
      // Восстанавливаем оригинальный console.log
      console.log = originalConsoleLog;
    }

    setOutput(consoleOutput);
  };

  return (
    <>
      <div>
        <button onClick={Open} className="App--Icon">
          <img src="https://imgs.search.brave.com/0bhz3d3v49ZUwn3_y6EmhXZlNiW7wEA3rP28UFNORI8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzQ3LzA0LzU4/LzM2MF9GXzU0NzA0/NTg1Nl9RdkR1VURz/UTVQRTlyS3V1RDlq/Q2NqRUVhaWtXekh0/bC5qcGc" alt="Open IDE" />
        </button>
      </div>

      {isOpen && (
        <WindowManager title="VioIDE" description={version} onClose={handleClose}>
          <div className="VioIDE--Container">
            <div className="VioIDE--Editor">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder=""
                rows="10"
                cols="50"
              />
            </div>
            <div className="VioIDE--Terminal">
              <div className="VioIDE--Terminal--Container">
                <button className="Accent--Button" onClick={runCode}>Выполнить</button>
                <div>
                  <h3>Output:</h3>
                  <pre>{output}</pre>
                </div>                  
              </div>
            
            </div>


          </div>
        </WindowManager>
      )}
    </>
  );
};

export default VioIDEApp;