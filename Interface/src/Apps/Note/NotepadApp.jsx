import React, { useState } from 'react';
import './NotepadApp.css';
import WindowManager from '../../Api/Libs/VioletClientKernel/Core/Managers/Windows/WindowManager';

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
          <img src="https://imgs.search.brave.com/oNhYOkISi4Em-cGJGmNS0MR1GAqDeHTA5ABj2vkiqzU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvYXBwbGUtaW9z/Ny1pY29ucy8xMTgv/bm90ZXNfaW9zN19p/b3NfNy5wbmc" />
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