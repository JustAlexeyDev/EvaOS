import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import './WindowManager.css';
import { X, Maximize, Minimize } from 'lucide-react';

const WindowManager = ({ title, children, onClose, description }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleDrag = (e, ui) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setPosition({ x: 0, y: 0 }); 
  };

  const windowBounds = {
    left: 0,
    top: 0,
    right: window.innerWidth - (isFullScreen ? window.innerWidth : 600),
    bottom: window.innerHeight - (isFullScreen ? window.innerHeight : 400),
  };

  return (
    <Draggable
      handle=".window-header"
      defaultPosition={{ x: 0, y: 0 }}
      position={isFullScreen ? { x: 0, y: 0 } : position}
      onDrag={handleDrag}
      // bounds={windowBounds}
      disabled={isFullScreen} 
    >
      <ResizableBox
        width={isFullScreen ? window.innerWidth : 600}
        height={isFullScreen ? window.innerHeight : 400}
        minConstraints={[200, 100]}
        maxConstraints={[window.innerWidth, window.innerHeight]}
        className={`window ${isFullScreen ? 'fullscreen' : ''}`}
      >
        <div className="window-content">
          <div className="window-header">
            <div className='window-header-info'>
              <span>{title}</span>
              <span>{description}</span>              
            </div>

            <div className="window-header-nav">
              <button className="fullscreen-button" onClick={toggleFullScreen}>
                {isFullScreen ? <Minimize color="#ffffff" /> : <Maximize color="#ffffff" />}
              </button>
              <button className="close-button" onClick={onClose}>
                <X color="#ffffff" />
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