import React, { useEffect, useState } from 'react';
import { Check, X } from "lucide-react";
import "./Debug.css"

const CheckMonitorWidth: React.FC = () => {
    const [icon, setIcon] = useState<React.ReactNode>(<X color="red" />);
    const [result, setResult] = useState<string>("Loading...");

    useEffect(() => {
        const checkWidth = () => {
            const width = window.innerWidth;
            if (width < 600) { 
                setIcon(<X color="red" />);
                setResult("Monitor Width fail");
            } else {
                setIcon(<Check color="#1eff00" />);
                setResult("Monitor width Pass");
            }
        };

        const timer = setTimeout(() => {
            checkWidth();
        }, 12000); 

        return () => clearTimeout(timer); 
    }, []);

    return (
        <div className='CheckInfo'>
            <span className='CheckInfo--Param '>
                {icon}
                <p>{result}</p>
            </span>
        </div>
    );
}

export default CheckMonitorWidth;