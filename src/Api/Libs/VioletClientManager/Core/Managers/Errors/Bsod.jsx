import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Bsod = () => {
    const [error, setError] = useState("");
    const [deviceInfo, setDeviceInfo] = useState({});

    useEffect(() => {
        if (window.location.href.includes("*")) {
            setError("Not Found! 404");
        } else {
            setError("Unknown error!");
        }
    }, []);

    useEffect(() => {
        setDeviceInfo({
            "User Agent": navigator.userAgent,
            "Platform": navigator.platform,
            "User Language": navigator.language,
            "Hardware Parallelism": navigator.hardwareConcurrency,
            "Cookies allowed?": navigator.cookieEnabled ? 'Yes' : 'No',
            "Maximum number of contact points": navigator.maxTouchPoints,
        });
    }, []);

    return (
        <div className="Page Bsod">
            <h1>A problem has been detected and EvaOS has been shut down to pravent damage to your computer</h1>
            <br />
            <br />
            <p>Thr problem seems to be caused by the following file: DAMAGECODE.JSX</p>
            <br />
            <br />
            <p>If this problen continue, witch seems likely, disable or remove any newly installed hardware or reboot internet connection</p>
            <br />
            <br />
            <p>TECHNICAL INFORMATION:</p>
            <h2>STOP: 0x00000050</h2>
            <div>
                {Object.entries(deviceInfo).map(([key, value]) => (
                    <p key={key}>{key}: {value}</p>
                ))}
            </div>
        </div>
    );
}

export default Bsod;