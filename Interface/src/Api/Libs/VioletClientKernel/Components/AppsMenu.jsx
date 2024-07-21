import React, { useState, useEffect } from "react";
import PowerManager from "../Core/Scripts/PowerManager";
import logo from "./Menu.svg";

const AppsMenu = () => {
    const [userdata, setUserData] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUserData(user);
        }
    }, []);

    return (
        <div className="AppsMenu">
            <div className="AppsMenu--Container">
                <div className="AppsMenu--User">
                    {userdata}                
                </div>
                <div>
                    {/* Apps */}
                </div>
                <div>
                    <PowerManager />
                </div>
            </div>
        </div>
    );
}

export default AppsMenu;