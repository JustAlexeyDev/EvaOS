import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const SystemInfo = () => {
    const [memoryUsage, setMemoryUsage] = useState(0);
    const [networkUsage, setNetworkUsage] = useState(0);
    const [storageUsage, setStorageUsage] = useState(0);
    const [progressBarColor, setProgressBarColor] = useState('green');
    const navigate = useNavigate();

    useEffect(() => {
        const updateMemoryUsage = () => {
            if (performance.memory) {
                const memory = performance.memory;
                const usedMemoryMB = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
                setMemoryUsage(parseFloat(usedMemoryMB));

                if (usedMemoryMB < 40) {
                    setProgressBarColor('green');
                } else if (usedMemoryMB < 60) {
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
            const resourceListEntries = performance.getEntriesByType('resource');
            const totalNetworkUsage = resourceListEntries.reduce((total, entry) => total + (entry.transferSize || 0), 0);
            setNetworkUsage((totalNetworkUsage / 1024).toFixed(2));
        };

        const updateStorageUsage = async () => {
            const storageManager = navigator.storage;
            if (storageManager && storageManager.estimate) {
                const estimate = await storageManager.estimate();
                setStorageUsage((estimate.usage / 1024).toFixed(2));
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
    }, []);


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