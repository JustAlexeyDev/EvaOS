# Документация по библиотеке Capp V0.1 Alpha
## Capp - расшифровывется как ConstructorApplication то есть конструктор приложений для облегчение написание обычных приложений под EvaOs

# Возможности на данный момент

## Сейчас возможность написать приложение под EvaOS можно через [WM] (WindowManager) и я заметил что написание кода с встроенной библиотеки [WM] очень долго, и я решил написать библиотеку что решит проблему написание кода с помошью библиотеки Capp которая позволит буквально собирать самые обычне приложение на EvaOS(если поддержка EvaOS продолжиться то потом возможность работы библиотеки Capp сможет и больше чем обычные), есть пример написание простого блокнота на Capp вот пример написание на [WM]:

```jsx
import React, { useState } from 'react';
import WindowManager from '../../Api/Libs/VioletClientManager/Core/Managers/WindowManager';

const Notepad = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const Open =() => {
    setIsOpen(true);
  }

  return (
    <div>
      <div>
        <button onClick={Open} className="App--Icon">
          <img src="https://imgs.search.brave.com/oNhYOkISi4Em-cGJGmNS0MR1GAqDeHTA5ABj2vkiqzU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvYXBwbGUtaW9z/Ny1pY29ucy8xMTgv/bm90ZXNfaW9zN19p/b3NfNy5wbmc" />
        </button>
      </div>
      {isOpen && (
        <WindowManager title="Блокнот" onClose={handleClose}>
          <textarea
            value={text}
            onChange={handleTextChange}
            className="notepad-textarea"
            placeholder="Введите ваш текст здесь..."
          />
        </WindowManager>
      )}
    </div>
  );
};

export default Notepad;
```
## И как теперь его можно написать с библиотекой Capp

```jsx
import React, { useState } from 'react';
import Capp from '../../Api/Libs/Capp/Core/Capp';
import { TextArea } from '../../Api/Libs/Capp/Core/Capp';

const Notepad = () => {
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

export default Notepad;
```

## Стало кораздо легче создать приложение на EvaOS так же Capp предостовляет возможность "собрать приложение по кусочкам", что имеется ввиду ? 

# Capp предостовляет так же набор разных кнопок текстов и тд
### правдо сейчас вариант скудный и сейчас идёт разработка компонентов

# ToDo

- Добавить больше вариантов компонентов
- Добавить возможность кастомизировать компоненты
- Добавить Правила написание проектов на Capp