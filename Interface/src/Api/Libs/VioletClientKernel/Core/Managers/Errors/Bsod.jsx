import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Bsod = () => {
    const location = useLocation();
    const [error, setError] = useState("");
    const [deviceInfo, setDeviceInfo] = useState({});

    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const errorFromUrl = pathParts[pathParts.length - 1];
        setError(errorFromUrl);

        setDeviceInfo({
            "User Agent": navigator.userAgent,
            "Platform": navigator.platform,
            "User Language": navigator.language,
            "Hardware Parallelism": navigator.hardwareConcurrency,
            "Cookies allowed?": navigator.cookieEnabled ? 'Yes' : 'No',
            "Maximum number of contact points": navigator.maxTouchPoints,
        });
    }, [location]);

    return (
        <div className="Page Bsod">
            <h1>A problem has been detected and EvaOS has been shut down to prevent damage to your system</h1>
            <br />
            <br />  
            <p>The problem seems to be caused by the following file: Core.jsx</p>
            <br />
            <br />
            <p>If this problem continues, which seems likely, disable or remove any newly installed hardware or reboot internet connection</p>
            <br />
            <br />
            <p>This error may have occurred due to a sitadnart behavior of the system or an unexpected error in VioletClientKernel.</p>
            <br />
            <br />
            <p>TECHNICAL INFORMATION:</p>
            <h2>STOP: {error}</h2>
            <div>
                {Object.entries(deviceInfo).map(([key, value]) => (
                    <p key={key}>{key}: {value}</p>
                ))}
            </div>
        </div>
    );
}

export default Bsod;