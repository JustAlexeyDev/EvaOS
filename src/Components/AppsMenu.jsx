import React, { useState, useEffect } from "react";

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
            </div>
        </div>
    );
}

export default AppsMenu;