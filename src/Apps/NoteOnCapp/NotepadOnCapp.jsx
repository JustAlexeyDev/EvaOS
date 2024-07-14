import React, { useState } from 'react';
import Capp from '../../Api/Libs/Capp/Core/Capp';
import { TextArea } from '../../Api/Libs/Capp/Core/Capp';

const NotepadOnCapp = () => {
  const [text, setText] = useState('');
  const icon = "https://imgs.search.brave.com/oNhYOkISi4Em-cGJGmNS0MR1GAqDeHTA5ABj2vkiqzU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvYXBwbGUtaW9z/Ny1pY29ucy8xMTgv/bm90ZXNfaW9zN19p/b3NfNy5wbmc"

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Capp title="Блокнот на конструкторе Capp" icon={icon}>
      <TextArea text={text} 
      onChange={handleTextChange} 
      placeholder={"Введите ваш текст здесь..."}/>
    </Capp>
  );
};

export default NotepadOnCapp;

