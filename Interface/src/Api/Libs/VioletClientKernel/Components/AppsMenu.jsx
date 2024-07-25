import React, { useState, useEffect } from "react";
import PowerManager from "../Core/Scripts/PowerManager";
import './AppsMenu.css';
import logo from "./Menu.svg";

const AppsMenu = () => {
    const [userdata, setUserData] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUserData(user);
        }
    }, []);

    const apps = [
        { name: "Edge", icon: "edge.svg" },
        { name: "Word", icon: "word.svg" },
        { name: "Excel", icon: "excel.svg" },
        { name: "PowerPoint", icon: "powerpoint.svg" },
    ];

    return (
        <div className="AppsMenu">
            <div className="AppsMenu--Container">
                <div className="AppsMenu--User">
                    {userdata}
                </div>

                <div className="AppsMenu--Apps">
                    {apps.map((app, index) => (
                        <div key={index} className="AppsMenu--App">
                            <img src={app.icon} alt={app.name} />
                            <span>{app.name}</span>
                        </div>
                    ))}
                </div>

                <div className="AppsMenu--Power">
                    <PowerManager />
                </div>
            </div>
        </div>
    );
}

export default AppsMenu;