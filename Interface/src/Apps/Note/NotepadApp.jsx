import React, { useState } from 'react';
import './NotepadApp.css';
import WindowManager from '../../Api/Libs/VioletClientKernel/Core/Managers/Windows/WindowManager';
import logo from './icon.svg';

const Notepad = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const Open = () => {
    setIsOpen(true);
  }

  const getLineNumbers = () => {
    const lines = text.split('\n');
    return lines.map((_, index) => <div key={index}>{index + 1}</div>);
  }

  const handleScroll = (event) => {
    const lineNumbers = document.querySelector('.LineNumbers');
    if (lineNumbers && event.target.scrollTop !== lineNumbers.scrollTop) {
      lineNumbers.scrollTop = event.target.scrollTop;
    }
  };
  return (
    <div>
      <div>
        <button onClick={Open} className="App--Icon">
          <img src={logo} />
        </button>
      </div>
      {isOpen && (
        <WindowManager title="Блокнот" onClose={handleClose}>
          <div className='Notepad--Container'>
            <div className="LineNumbers">
              {getLineNumbers()}
            </div>
            <textarea
              value={text}
              onChange={handleTextChange}
              onScroll={handleScroll}
              className="notepad-textarea"
              placeholder="Введите ваш текст здесь..."
            />
          </div>
        </WindowManager>
      )}
    </div>
  );
};

export default Notepad;