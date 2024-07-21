import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SystemInfo: React.FC = () => {
    const [memoryUsage, setMemoryUsage] = useState<number>(0);
    const [networkUsage, setNetworkUsage] = useState<number>(0);
    const [storageUsage, setStorageUsage] = useState<number>(0);
    const [progressBarColor, setProgressBarColor] = useState<string>('green');
    const navigate = useNavigate();

    useEffect(() => {
        const updateMemoryUsage = () => {
            const memory = (performance as any).memory;
            if (memory) {
                const usedMemoryMB = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
                setMemoryUsage(parseFloat(usedMemoryMB));

                if (parseFloat(usedMemoryMB) < 40) {
                    setProgressBarColor('green');
                } else if (parseFloat(usedMemoryMB) < 60) {
                    setProgressBarColor('yellow');
                } else {
                    setProgressBarColor('red');
                    navigate("/outOfMemory");
                }
            } else {
                setMemoryUsage(0);
            }
        };

        const updateNetworkUsage = () => {
            const resourceListEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
            const totalNetworkUsage = resourceListEntries.reduce((total, entry) => total + (entry.transferSize || 0), 0);
            setNetworkUsage(parseFloat((totalNetworkUsage / 1024).toFixed(2)));
        };

        const updateStorageUsage = async () => {
            const storageManager = navigator.storage;
            if (storageManager && storageManager.estimate) {
                const estimate = await storageManager.estimate();
                setStorageUsage(parseFloat((estimate.usage ? estimate.usage / 1024 : 0).toFixed(2)));
            } else {
                setStorageUsage(0);
            }
        };

        const intervalId = setInterval(() => {
            updateMemoryUsage();
            updateNetworkUsage();
            updateStorageUsage();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [navigate]);

    return (
        <div>
            <h2>System monitor</h2>
            <br />
            <div>Network Usage: {networkUsage} KB</div>
            <br />
            <div>Storage Usage: {storageUsage} KB</div>
            <div style={{ marginTop: '10px', height: '20px', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${storageUsage}%`, backgroundColor: progressBarColor }}></div>
            </div>
            <br />
            <div>Used JS Heap Size: {memoryUsage} MB</div>
            <div style={{ marginTop: '10px', height: '20px', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${memoryUsage}%`, backgroundColor: progressBarColor }}></div>
            </div>
        </div>
    );
};

export default SystemInfo;