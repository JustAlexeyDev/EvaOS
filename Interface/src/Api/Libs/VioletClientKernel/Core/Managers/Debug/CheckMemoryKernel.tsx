import React, { useEffect, useState } from 'react';

const CheckMemoryKernel: React.FC = () => {
  const [memoryError, setMemoryError] = useState<string | null>(null);

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

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {memoryError ? (
          <p style={{ color: 'red' }}>{memoryError}</p>
        ) : (
          <p>Memory is sufficient.</p>
        )}
      </header>
    </div>
  );
};

export default CheckMemoryKernel;