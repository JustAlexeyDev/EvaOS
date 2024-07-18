# Как создать приложение?

## Шаг 1
Убедитесь что версия библиотеки VioletClientManager имеет флаг - Stable или Release.

Пример 

```md
Version of VioletClientManager0.0.1-Stable
```

## Шаг 2
Создайте директорию с названием приложения в директории Apps в 
```
./src/Apps
```

## Шаг 3
Создайте файл с названием приложения в директории Apps с расширением .jsx или .tsx. Для кастомизации приложения создате файл с одноименным названием с расширением .css.

Пример
```md
/Apps
- Calc.jsx
- Calc.css
```

## Шаг 4
Подключие оконный менеджер WindowManager.jsx из ./Api/Libs/VioletClientManager/Core/Managers/Windows.

Пример вашего приложения:
```jsx
import React, { useState } from 'react';
import WindowManager from '../../Api/Libs/VioletClientManager/Core/Managers/Windows/WindowManager';
import "./style.css"

const TodoApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const Open =() => {
    setIsOpen(true);
  }

  return (
    <>
    // ЗНАЧЕК НА РАБОЧЕМ СТОЛЕ
        <div>
            <button onClick={Open} className="App--Icon">
            <img src="ИКОНКА ПРИЛОЖЕНИЯ"/>
            </button>
        </div>

        // ОТКРЫТОЕ ПРИЛОЖЕНИЕ

      {isOpen && (
        <WindowManager title="НАЗВАНИЕ ПРИЛОЖЕНИЯ" onClose={handleClose}>
          <div className="">

            ВАШЕ ПРИЛОЖЕНИЕ

          </div>
        </WindowManager>
      )}
    </>
  );
};

export default TodoApp;
```