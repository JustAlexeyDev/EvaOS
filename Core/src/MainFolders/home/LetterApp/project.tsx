import React, { useState, useRef, useEffect } from 'react';
import './project.css';
import logo from './icon.svg';
import info from "./info.json";
import WindowManager from '../../Api/Libs/VioletClientKernel/Core/Managers/Windows/WindowManager';
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Heading1, Space, Import, Save, Pilcrow, Image as ImageIcon, Maximize2, Minimize2 } from 'lucide-react';

const LetterApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [formattedText, setFormattedText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [imageSize, setImageSize] = useState<number>(200); 

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const Open = () => {
    setIsOpen(true);
  }

  const getLineNumbers = () => {
    const lines = text.split('\n');
    return lines.map((_, index) => <div key={index}>{index + 1}</div>);
  }

  const handleScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    const lineNumbers = document.querySelector('.LineNumbers');
    if (lineNumbers && event.currentTarget.scrollTop !== lineNumbers.scrollTop) {
      lineNumbers.scrollTop = event.currentTarget.scrollTop;
    }
  };

  const applyStyleToSelection = (styleFn: (text: string) => string) => {
    const selectionStart = textareaRef.current?.selectionStart;
    const selectionEnd = textareaRef.current?.selectionEnd;
    if (selectionStart !== undefined && selectionEnd !== undefined) {
      const before = text.slice(0, selectionStart);
      const selectedText = text.slice(selectionStart, selectionEnd);
      const after = text.slice(selectionEnd);
      const styledText = styleFn(selectedText).replace(/\n/g, '<br>');
      const newText = before + styledText + after;
      setText(newText);
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(selectionStart, selectionEnd + styledText.length - selectedText.length);
    }
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
    const selectionStart = textareaRef.current?.selectionStart;
    if (selectionStart !== undefined) {
      const before = text.slice(0, selectionStart);
      const after = text.slice(selectionStart);
      const newText = before + '\t' + after;
      setText(newText);
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(selectionStart + 1, selectionStart + 1);
    }
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

  const handleImageInsert = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      applyStyleToSelection(() => `<img width="${imageSize}" src="${url}" alt="inserted image" />`);
    }
  };

  const handleImageResize = () => {
    const selectionStart = textareaRef.current?.selectionStart;
    const selectionEnd = textareaRef.current?.selectionEnd;
    if (selectionStart !== undefined && selectionEnd !== undefined) {
      const before = text.slice(0, selectionStart);
      const selectedText = text.slice(selectionStart, selectionEnd);
      const after = text.slice(selectionEnd);
      const resizedText = selectedText.replace(/<img[^>]+>/, (match) => {
        return match.replace(/width="\d+"/, `width="${imageSize}"`).replace(/height="\d+"/, `height="${imageSize}"`);
      });
      const newText = before + resizedText + after;
      setText(newText);
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(selectionStart, selectionEnd + resizedText.length - selectedText.length);
    }
  };

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${text.replace(/\n/g, '<br>')}</div>`, 'text/html');
    setFormattedText(doc.body.innerHTML);
  }, [text]);

  const handleSaveClick = () => {
    const filename = prompt("Enter the filename for the document:", "document.html");
    if (filename) {
      const blob = new Blob([formattedText], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div>
        <button onClick={Open} className="App--Icon">
          <img src={logo} alt="logo" />
        </button>
      </div>
      {isOpen && (
        <WindowManager title={info.name} description={info.version} onClose={handleClose}>
          <div className='Letter--Header'>
            <div className='second--container'>
              <button onClick={handleSaveClick}><Save /></button>
              <button onClick={() => document.getElementById('fileInput')?.click()}><Import /></button>
            </div>

            <div className='second--container'>
              <button onClick={handleBoldClick}><Bold /></button>
              <button onClick={handleItalicClick}><Italic /></button>
            </div>

            <div className='second--container'>
              <button onClick={handleHeadingClick}><Heading1 /></button>
              <button onClick={handleParagraphClick}><Pilcrow /></button>
              <button onClick={handleTabClick}><Space /></button>
            </div>

            <div className='second--container'>
              <button onClick={handleAlignLeftClick}><AlignLeft /></button>
              <button onClick={handleAlignCenterClick}><AlignCenter /></button>
              <button onClick={handleAlignRightClick}><AlignRight /></button>
            </div>

            <div className='second--container'>
              <button onClick={handleImageInsert}><ImageIcon /></button>
              <input
                type="number"
                value={imageSize}
                onChange={(e) => setImageSize(parseInt(e.target.value, 10))}
                style={{ width: '50px' }}
              />
              <button onClick={handleImageResize}><Maximize2 /></button>
            </div>

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