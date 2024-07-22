import React, { useState, useRef, useEffect } from 'react';
import './VioPhotoApp.css';
import logo from './icon.svg';
import WindowManager from '../../Api/Libs/VioletClientKernel/Core/Managers/Windows/WindowManager';

const VioPhotoApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState('brush');
  const canvasRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = image;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [image]);

  const applyFilter = (filterFunction) => {
    if (image) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = image;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        filterFunction(imageData.data);
        ctx.putImageData(imageData, 0, 0);
        const newCanvas = canvasRef.current;
        const newCtx = newCanvas.getContext('2d');
        newCtx.drawImage(canvas, 0, 0);
      };
    }
  };

  const applyGrayScale = () => {
    applyFilter((data) => {
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
      }
    });
  };

  const applyInvert = () => {
    applyFilter((data) => {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]; // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
      }
    });
  };

  const applyBrightness = (value) => {
    applyFilter((data) => {
      for (let i = 0; i < data.length; i += 4) {
        data[i] += value; // red
        data[i + 1] += value; // green
        data[i + 2] += value; // blue
      }
    });
  };

  const applySepia = () => {
    applyFilter((data) => {
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        data[i] = Math.min(255, (red * 0.393) + (green * 0.769) + (blue * 0.189)); // red
        data[i + 1] = Math.min(255, (red * 0.349) + (green * 0.686) + (blue * 0.168)); // green
        data[i + 2] = Math.min(255, (red * 0.272) + (green * 0.534) + (blue * 0.131)); // blue
      }
    });
  };

  const startDrawing = (e) => {
    setDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setLastX(e.clientX - rect.left);
    setLastY(e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'brush' ? 'black' : 'white';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  return (
    <>
      <div>
        <button onClick={open} className="App--Icon">
          <img src={logo} alt="logo" />
        </button>
      </div>

      {isOpen && (
        <WindowManager title="VioPhoto" onClose={handleClose}>
          <div className="App--Container">
            <div>
              <div className='second--container'>
                <input type="file" accept="image/*" onChange={handleImageUpload}/>  
              </div>
            </div>
            <div className="App--Content">
              <div className='Main--Container'>
                <div className='ToolBar'>
                  <button onClick={applyGrayScale}>Apply GrayScale</button>
                  <button onClick={applyInvert}>Invert Colors</button>
                  <button onClick={() => applyBrightness(50)}>Brightness +</button>
                  <button onClick={() => applyBrightness(-50)}>Brightness -</button>
                  <button onClick={applySepia}>Apply Sepia</button>
                  <button onClick={() => setTool('brush')}>Brush</button>
                  <button onClick={() => setTool('eraser')}>Eraser</button>
                  <input type="range" min="1" max="50" value={brushSize} onChange={(e) => setBrushSize(e.target.value)} />
                </div>
                <div className='Canva--Image'>
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                  />
                </div>
              </div>
            </div>
          </div>
        </WindowManager>
      )}
    </>
  );
};

export default VioPhotoApp;