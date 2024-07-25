import React, { useEffect, useState } from 'react';
import { Check, X } from "lucide-react";
import "./Debug.css"

const CheckMemoryKernel: React.FC = () => {
  const [memoryError, setMemoryError] = useState<string | null>(null);
  const [icon, setIcon] = useState<React.ReactNode>(<X color="red" />);

  useEffect(() => {
    const checkMemory = () => {
      if (!(window.performance as any).memory) {
        setMemoryError('Memory usage API is not supported in this browser.');
        return;
      }

      const memory = (window.performance as any).memory;
      const usedMemory = memory.usedJSHeapSize;
      const totalMemory = memory.jsHeapSizeLimit;
      const freeMemory = totalMemory - usedMemory;

      if (freeMemory < 30 * 1024 * 1024) {
        setMemoryError('Low memory! Less than 30 MB remaining.');
      } else {
        setMemoryError(null);
      }
    };

    const intervalId = setInterval(checkMemory, 1000);

    // Set timeout to change icon after 10 seconds
    const timeoutId = setTimeout(() => {
      setIcon(<Check color="#1eff00" />);
    }, 10000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {memoryError ? (
          <p style={{ color: 'red' }}>{memoryError}</p>
        ) : (
          <div className='CheckInfo'>
            <span className='CheckInfo--Param '>
              {icon}
              <p> Memory check completed.</p>
            </span>
          </div>
        )}
      </header>
    </div>
  );
};

export default CheckMemoryKernel;