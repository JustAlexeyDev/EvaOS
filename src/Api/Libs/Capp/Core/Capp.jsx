import React, { useState } from 'react';
import CappModule from './CappModule';

const Capp = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const Open =() => {
    setIsOpen(true);
  }

  return (
    <div>
      <div>
        <button onClick={Open} className="App--Icon">
          <img src={icon}/>
        </button>
      </div>
      {isOpen && (
        <CappModule title={title} onClose={handleClose}>
          {children}
        </CappModule>
      )}
    </div>
  );
};

export default Capp;

export function Button({ text }) {
  return <button>{text}</button>;
}

export function TextArea({ text, onChange, placeholder }) {
  return <textarea
  value={text}
  onChange={onChange}
  placeholder={placeholder}
   />;
}