import React, { useState, useRef, useEffect } from 'react';
import './LetterApp.css';
import logo from './icon.svg';
import info from "./info.json";
import WindowManager from '../../Api/Libs/VioletClientManager/Core/Managers/Windows/WindowManager';

const LetterApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const textareaRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const applyStyleToSelection = (styleFn) => {
    const selectionStart = textareaRef.current.selectionStart;
    const selectionEnd = textareaRef.current.selectionEnd;
    const before = text.slice(0, selectionStart);
    const selectedText = text.slice(selectionStart, selectionEnd);
    const after = text.slice(selectionEnd);
    const styledText = styleFn(selectedText).replace(/\n/g, '<br>');
    const newText = before + styledText + after;
    setText(newText);
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(selectionStart, selectionEnd + styledText.length - selectedText.length);
  };

  const handleBoldClick = () => {
    applyStyleToSelection((text) => `<b>${text}</b>`);
  };

  const handleItalicClick = () => {
    applyStyleToSelection((text) => `<i>${text}</i>`);
  };

  const handleHeadingClick = () => {
    applyStyleToSelection((text) => `<h1>${text}</h1>`);
  };

  const handleParagraphClick = () => {
    applyStyleToSelection((text) => `<p>${text}</p>`);
  };

  const handleTabClick = () => {
    applyStyleToSelection((text) => `\t${text}`);
  };

  const handleAlignLeftClick = () => {
    applyStyleToSelection((text) => `<div style="text-align: left;">${text}</div>`);
  };

  const handleAlignCenterClick = () => {
    applyStyleToSelection((text) => `<div style="text-align: center;">${text}</div>`);
  };

  const handleAlignRightClick = () => {
    applyStyleToSelection((text) => `<div style="text-align: right;">${text}</div>`);
  };

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${text.replace(/\n/g, '<br>')}</div>`, 'text/html');
    setFormattedText(doc.body.innerHTML);
  }, [text]);

  const handleSaveClick = () => {
    const blob = new Blob([formattedText], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
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
        <WindowManager title={info.name} description={info.version} onClose={handleClose}>
          <div className='Letter--Header'>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={() => document.getElementById('fileInput').click()}>Import</button>
            <button onClick={handleBoldClick}>Bold</button>
            <button onClick={handleItalicClick}>Italic</button>
            <button onClick={handleHeadingClick}>Heading</button>
            <button onClick={handleParagraphClick}>Paragraph</button>
            <button onClick={handleTabClick}>Tab</button>
            <button onClick={handleAlignLeftClick}>Align Left</button>
            <button onClick={handleAlignCenterClick}>Align Center</button>
            <button onClick={handleAlignRightClick}>Align Right</button>
            <input type="file" accept=".html" onChange={handleFileChange} style={{ display: 'none' }} id="fileInput" />
          </div>

          <div className='Letter--Container'>
            <div className="LineNumbers">
              {getLineNumbers()}
            </div>
            <textarea
              value={text}
              onChange={handleTextChange}
              onScroll={handleScroll}
              className="Letter-textarea"
              ref={textareaRef}
            />
            <div className="FormattedText" dangerouslySetInnerHTML={{ __html: formattedText }} />
          </div>
        </WindowManager>
      )}
    </div>
  );
};

export default LetterApp;