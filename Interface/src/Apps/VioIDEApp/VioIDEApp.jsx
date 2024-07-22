import "./VioIDEApp.css";
import React, { useState } from 'react';
import logo from './Icon.svg';
import WindowManager from '../../Api/Libs/VioletClientKernel/Core/Managers/Windows/WindowManager';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

const VioIDEApp = () => {
  const version = "0.002.01 - Unsatble"
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleClose = () => setIsOpen(false);
  const Open = () => setIsOpen(true);

  const runCode = () => {
    let consoleOutput = '';
    const originalConsoleLog = console.log;

    console.log = (...args) => {
      consoleOutput += args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ') + '\n';
      originalConsoleLog(...args);
    };

    try {
      const result = new Function(code)();
      if (result !== undefined) {
        consoleOutput += result + '\n';
      }
    } catch (error) {
      consoleOutput += `Error: ${error.message}\n`;
    } finally {
      console.log = originalConsoleLog;
    }

    setOutput(consoleOutput);
  };

  return (
    <>
      <div>
        <button onClick={Open} className="App--Icon">
          <img src={logo} alt="Open IDE" />
        </button>
      </div>

      {isOpen && (
        <WindowManager title="VioIDE" description={version} onClose={handleClose}>
          <div className="VioIDE--Container">
          <div className='VioIDE--Header'>

            <div className='second--container'>
              <button className="Accent--Button" onClick={runCode}>Run</button>
            </div>

          </div>

          <div className="VioIDE--Box">
          <div className="VioIDE--Editor">
            <CodeMirror
              value={code}
              onBeforeChange={(editor, data, value) => {
                setCode(value);
              }}
              options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true,
                viewportMargin: Infinity 
              }}
            />
            
            </div>

            <div className="VioIDE--Terminal">
            <div className="VioIDE--Terminal--Container">
              <div>
                <h3>Output:</h3>
                <pre>{output}</pre>
              </div>                  
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