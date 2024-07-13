Документаця к официальной библиотеке операционной системы EvaOS

Менеджеры систему нужны для упрощения и автоматизации работы приложений. Они представляют из себя шаблоны или готовые фреймы для создания приложений под систему.

Основые менеджеры:
- WindowManager - представляет из себя оконый менеджер, котороый слежит шаблоном для создания и запуска оконных приложений.

```jsx
const WindowManager = ({ title, children, onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleDrag = (e, ui) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const windowBounds = {
    left: 0,
    top: 0,
    right: window.innerWidth - (isFullScreen ? window.innerWidth * 0.9 : 600),
    bottom: window.innerHeight - (isFullScreen ? window.innerHeight * 0.9 : 400),
  };

  return (
    <Draggable
      handle=".window-header"
      defaultPosition={{ x: 0, y: 0 }}
      position={position}
      onDrag={handleDrag}
      bounds={windowBounds}
    >
      <ResizableBox
        width={isFullScreen ? window.innerWidth * 0.9 : 600}
        height={isFullScreen ? window.innerHeight * 0.9 : 400}
        minConstraints={[200, 100]}
        maxConstraints={[window.innerWidth * 0.9, window.innerHeight * 0.9]}
        className="window"
      >
        <div className="window-content">
          <div className="window-header">
            <span>{title}</span>
            <div className=" window-header-nav">
              <button className="fullscreen-button" onClick={toggleFullScreen}>
                {isFullScreen ? '◀' : '▶'}
              </button>
              <button className="close-button" onClick={onClose}>
                X
              </button>              
            </div>

          </div>
          <div className="window-body">{children}</div>
        </div>
      </ResizableBox>
    </Draggable>
  );
};

export default WindowManager;
```

Разберем его по частям.

```jsx
const WindowManager = ({ title, children, onClose }) 
```

В данном куске кода функция принимает в себя Заголовок, дочерний элемент и функцию закрытия окна